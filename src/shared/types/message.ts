export type TChatMessageStatus = 'sending' | 'sent' | 'read' | 'failed';

export interface IChatMessage {
  id: string;
  message: string;
  status: TChatMessageStatus;
  sentAt: string;
  isOwnMessage?: boolean;
}
