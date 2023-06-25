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

    console.log('asdfasdf');

    console.log('asda');

    this.addEventListener('message', async (e) => {
      const data: ServerMessage = JSON.parse(e.data);

      if (!isChatMessageReceived(data)) return;
      const message = data.message;

      const linkMetadata: LinkMetadata[] = JSON.parse(message.linksMetadata);
      const linkedItems = linkMetadata.filter(
        (item) => item.linkType === LinkType.Item
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

        const res = await axios.post('http://localhost:8443', payload, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        console.log(res);
      } catch (err) {
        console.error(err);
      }
    });

    // Only set the correct socket and skip the one Vite is using
    if (url.toString().includes('milkyway')) {
      unsafeWindow.customSocket = this;
    }
  }
}

function isChatMessageReceived(msg: ServerMessage): msg is ChatMessageReceived {
  return msg.type === ServerMessageType.ChatMessageReceived;
}

unsafeWindow.WebSocket = CustomSocket;
