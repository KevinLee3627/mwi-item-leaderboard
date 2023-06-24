export interface ServerMessage {
  type: ServerMessageType;
}

export enum ServerMessageType {
  ChatMessageReceived = 'chat_message_received',
}

export interface ChatMessageReceived extends ServerMessage {
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

export enum LinkType {
  Item = '/chat_link_types/item',
}

export interface LinkMetadata {
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
