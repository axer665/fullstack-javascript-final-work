export interface Message {
    _id: string;
    authorId: string;
    text: string;
    sentAt: Date | string;
    readAt: Date | null;
}

export interface MessageProps {
    messages: Message[],
}

export interface MessageItemProps {
    message: Message,
}

export interface formProps {
    sendMessage: Function;
}

export interface SendMessageDto {
    authorId: string | null;
    supportRequestId: string | null;
    text: string;
}

export interface MarkMessagesAsReadDto {
    userId: string;
    supportRequestId: string;
    createdBefore: Date;
}

export interface GetChatListParams {
    userId: string | null;
    isActive: boolean;
}