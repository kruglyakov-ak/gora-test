export type TChatMessageStatus = "sending" | "sent" | "read" | "failed";

export interface IChatMessage {
  message: string;
  status: TChatMessageStatus;
  sentAt: string;
  isOwnMessage?: boolean;
}
