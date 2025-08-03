export interface AddReservationDto {
    userId: string | null;
    hotelId: string;
    roomId: string;
    dateStart: string;
    dateEnd: string;
}

export interface SearchReservationsDto {
    userId: string;
}

export interface ReservationData {
    _id: string;
    userId: { _id: string, email: string };
    hotelId: { _id: string, title: string };
    roomId: { _id: string, title: string };
    dateStart: string,
    dateEnd: string,
}

export interface ReservationProps {
    list: ReservationData[];
    handleDelete: Function;
}