import { unsafeWindow } from '$';

declare global {
  interface Window {
    customSocket: CustomSocket;
    WebSocket: typeof CustomSocket;
  }
}

interface ServerMessage {
  type: ServerMessageType;
}

enum ServerMessageType {
  ChatMessageReceived = 'chat_message_received',
}

interface ChatMessageReceived extends ServerMessage {
  message: {
    cannotBlock: boolean;
    channelTypeHrid: string; // turn to enum
    characterID: number;
    chatIconHrid: string;
    id: number;
    isDeleted: boolean;
    isModMessage: boolean;
    isSystemMessage: boolean;
    linksMetadata: string; // Will be an array, need to parse it
    message: string;
    receiverCharacterID: number;
    receiverName: string;
    senderName: string;
    specialChatIconHrid: string;
    timestamp: string; // ISO String
  };
}

enum LinkType {
  Item = '/chat_link_types/item',
}

interface LinkMetadata {
  linkType: LinkType;
  insertIndex: number;
  itemHrid: string;
  itemEnhancementLevel: number;
  itemCount: number;
  skillHrid: string; // will be "" if not applicable
  skillLevel: number;
  skillExperience: number;
  abilityHrid: string;
  abilityLevel: number;
  abilityExperience: number;
}

class CustomSocket extends WebSocket {
  constructor(url: string | URL, protocols?: string | string[]) {
    super(url, protocols);
    this.addEventListener('message', (e) => {
      const data: ServerMessage = JSON.parse(e.data);

      if (!isChatMessageReceived(data)) return;
      const message = data.message;

      const linkMetadata: LinkMetadata[] = JSON.parse(message.linksMetadata);
      const linkedItems = linkMetadata.filter(
        (item) => item.itemHrid.length > 0
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
