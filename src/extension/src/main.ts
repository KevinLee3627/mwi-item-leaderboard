import { unsafeWindow } from '$';
import axios from 'axios';
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

      await parseItems(data);
      await parseAbilities(data);
    });

    // Only set the correct socket and skip the one Vite is using
    if (url.toString().includes('milkyway')) {
      unsafeWindow.customSocket = this;
    }
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
      itemName: item.itemHrid
        .replace('/items/', '')
        .split('_')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' '),
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
    (ability) => {
      return {
        abilityHrid: ability.abilityHrid,
        abilityName: ability.abilityHrid
          .replace('/abilities/', '')
          .split('_')
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' '),
        abilityXp: ability.abilityExperience,
        abilityLevel: ability.abilityLevel,
      };
    }
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
