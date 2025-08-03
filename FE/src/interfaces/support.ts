import  { Message } from "@interfaces/chat.ts";
import { User } from "@interfaces/user.ts";

export interface SupportRequest {
    _id: string;
    userId: User;
    messages: Message;
    isActive: boolean;
    createdAt: Date;
}

export interface SupportProps {
    list: SupportRequest[];
}

export interface CreateSupportRequestDto {
    userId: string | null;
    message: string;
}
