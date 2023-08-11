import { unsafeWindow } from '$';
import axios, { type AxiosResponse } from 'axios';
import {
  ServerMessage,
  LinkMetadata,
  ServerMessageType,
  ChatMessageReceived,
  LinkType,
  PayloadItem,
  Payload,
  AbilityPayloadItem,
  AbilityPayload,
} from './types';

declare global {
  interface Window {
    customSocket: CustomSocket;
    WebSocket: typeof CustomSocket;
  }
}

export class CustomSocket extends WebSocket {
  constructor(url: string | URL, protocols?: string | string[]) {
    super(url, protocols);

    console.log('running!');

    this.addEventListener('message', async (e) => {
      const data: ServerMessage = JSON.parse(e.data);

      if (!isChatMessageReceived(data)) return;

      // Ignore Trade channel
      if (data.message.channelTypeHrid === '/chat_channel_types/trade') return;

      if (data.message.channelTypeHrid === '/chat_channel_types/whisper') {
        await parseCommand(data.message);
      }
      if (data.message.linksMetadata.length > 0) {
        await parseItems(data);
        await parseAbilities(data);
      }
    });

    // Only set the correct socket and skip the one Vite is using
    if (url.toString().includes('milkyway')) {
      unsafeWindow.customSocket = this;
    }
  }
}

async function parseCommand(message: ChatMessageReceived['message']) {
  // TODO: Make this cleaner/more extensible?
  // probably won't add any more commands so this will do for now
  if (message.message === '/ignore') {
    console.log('Ignoring player');
    await axios.post(
      `${import.meta.env.VITE_API_BASE}/api/v1/player/${
        message.characterID
      }/ignore`,
      {},
      {
        headers: {
          'Content-Type': 'application/json',
          token: import.meta.env.VITE_API_TOKEN,
        },
      }
    );
  }
}

async function parseItems({ message }: ChatMessageReceived) {
  const linkMetadata: LinkMetadata[] = JSON.parse(message.linksMetadata);
  const linkedItems = linkMetadata.filter(
    (item) =>
      item.linkType === LinkType.Item && item.itemHrid !== '/items/cowbell'
  );

  if (linkedItems.length === 0) return;

  const payloadItems: PayloadItem[] = linkedItems.map((item) => {
    return {
      itemHrid: item.itemHrid,
      itemName: hridToDisplayName(item.itemHrid),
      count: item.itemCount,
      enhancementLevel: item.itemEnhancementLevel,
    };
  });

  console.log(payloadItems);

  try {
    const payload: Payload = {
      items: payloadItems,
      player: {
        id: message.characterID,
        name: message.senderName,
      },
      ts: new Date().toISOString(),
    };

    const res = await axios.post(
      `${import.meta.env.VITE_API_BASE}/api/v1/item`,
      payload,
      {
        headers: {
          'Content-Type': 'application/json',
          token: import.meta.env.VITE_API_TOKEN,
        },
      }
    );

    console.log(res);
  } catch (err) {
    console.error(err);
  }
}

async function parseAbilities({ message }: ChatMessageReceived) {
  const linkMetadata: LinkMetadata[] = JSON.parse(message.linksMetadata);

  const linkedAbilities = linkMetadata.filter(
    (item) => item.linkType === LinkType.Ability
  );

  if (linkedAbilities.length === 0) return;

  const payloadAbilities: AbilityPayloadItem[] = linkedAbilities.map(
    (ability) => ({
      abilityHrid: ability.abilityHrid,
      abilityName: hridToDisplayName(ability.abilityHrid),
      abilityXp: ability.abilityExperience,
      abilityLevel: ability.abilityLevel,
    })
  );

  console.log(`Abilities: ${payloadAbilities}`);
  console.log(payloadAbilities);

  try {
    const payload: AbilityPayload = {
      abilities: payloadAbilities,
      player: {
        id: message.characterID,
        name: message.senderName,
      },
      ts: new Date().toISOString(),
    };

    const res = await axios.post(
      `${import.meta.env.VITE_API_BASE}/api/v1/ability`,
      payload,
      {
        headers: {
          'Content-Type': 'application/json',
          token: import.meta.env.VITE_API_TOKEN,
        },
      }
    );

    console.log(res);
  } catch (err) {
    console.error(err);
  }
}

function isChatMessageReceived(msg: ServerMessage): msg is ChatMessageReceived {
  return msg.type === ServerMessageType.ChatMessageReceived;
}

unsafeWindow.WebSocket = CustomSocket;

function hridToDisplayName(str: string) {
  return str
    .replace('/items/', '')
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}
