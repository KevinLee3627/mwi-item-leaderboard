import { unsafeWindow } from '$';
import {
  ServerMessage,
  LinkMetadata,
  ServerMessageType,
  ChatMessageReceived,
  LinkType,
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
    this.addEventListener('message', (e) => {
      const data: ServerMessage = JSON.parse(e.data);

      if (!isChatMessageReceived(data)) return;
      const message = data.message;

      const linkMetadata: LinkMetadata[] = JSON.parse(message.linksMetadata);
      const linkedItems = linkMetadata.filter(
        (item) => item.linkType === LinkType.Item
      );

      if (linkedItems.length === 0) return;

      // Get the sender
      const sender = message.senderName;
      console.log(`Sent by: ${sender}`);
      // Get the linked items

      console.log(linkedItems);
      // Send the items to a database
      // profit
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
