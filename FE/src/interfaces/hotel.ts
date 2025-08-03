export interface HotelData {
    _id: string;
    title: string;
    description: string;
    images: string[],
}

export interface SearchHotelsDto {
    limit?: number;
    offset?: number;
    title?: string;
}

export interface SearchRoomsDto {
    hotel: string;
    limit?: number;
    offset?: number;
    title?: string;
    isEnabled?: boolean;
}

export interface RoomData {
    _id: string,
    hotel: string;
    title: string;
    description: string;
    images: string[];
    isEnabled: boolean;
}

export interface RoomItemsProps {
    list: RoomData[],
}

export interface HotelsState {
    offset: number,
    limit: number,
    titleSearch: string,
    loading: boolean,
    list: HotelData[],
    currentHotel: HotelData,
}