export interface SocketDto {
    _id: string;
    text: string;
    sentAt: string;
    author: {
        id: string;
        name: string;
    };
}