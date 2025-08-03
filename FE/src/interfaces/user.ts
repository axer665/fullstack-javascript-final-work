export interface User {
    _id: string;
    name: string;
    email: string;
    role: string,
    contactPhone?: string;
}

export interface UserProps {
    list: User[],
}

export interface SearchUsersDto {
    limit: number;
    offset: number;
    email: string;
    name: string;
    contactPhone: string;
}