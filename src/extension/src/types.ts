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
  Ability = '/chat_link_types/ability',
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

export interface PayloadItem {
  itemHrid: string;
  itemName: string;
  count: number;
  enhancementLevel: number;
}

export interface Payload {
  items: PayloadItem[];
  player: {
    id: number;
    name: string;
  };
  ts: string; // ISO8601 string
}

export interface AbilityPayloadItem {
  abilityHrid: string;
  abilityName: string;
  abilityLevel: number;
  abilityXp: number;
}

export interface AbilityPayload {
  abilities: AbilityPayloadItem[];
  player: {
    id: number;
    name: string;
  };
  ts: string;
}
