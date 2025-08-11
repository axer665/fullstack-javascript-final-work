import apiRequest from './apiRequest.ts';

import {SearchUsersDto} from '@interfaces/user.ts';
import {SearchRoomsDto, SearchHotelsDto} from "@interfaces/hotel.ts";
import {RegistrationData} from "@interfaces/auth.ts";
import {AddReservationDto, SearchReservationsDto} from "@interfaces/reservation.ts";
import {CreateSupportRequestDto} from "@interfaces/support.ts";
import {GetChatListParams, SendMessageDto} from "@interfaces/chat.ts";
import {AxiosResponse} from "axios";

export default function API() {
    const usersApi = {
        search(searchParams: Partial<SearchUsersDto>) {
            return apiRequest('users', {method: 'GET', params: searchParams});
        },
        updateRole(id: string, role: string) {
            return apiRequest(`users/${id}`, {method: 'PUT', data: {role}});
        },
    };

    const authUser = {
        login(email: string, password: string) {
            return apiRequest('auth/signin', {method: 'POST', data: {email, password}});
        },
        register(data: RegistrationData) {
            return apiRequest('auth/signup', {method: 'POST', data});
        },
        getInfo(email: string) {
            return apiRequest('auth/checkAuth', {method: 'GET', params: {email}});
        },
    }

    const hotelsAPI = {
        search(searchParams: SearchHotelsDto) {
            return apiRequest('hotels', {method: 'GET', params: searchParams});
        },
        findById(id: string) {
            return apiRequest(`hotels/findhotel/${id}`, {method: 'GET'});
        },
        addHotel(data: FormData) {
            return apiRequest('hotels', {method: 'POST', data}, true);
        },
        updateHotel(data: FormData, id: string) {
            return apiRequest(`hotels/${id}`, {method: 'PUT', data}, true);
        },
    };

    const roomsApi = {
        search(searchParams: SearchRoomsDto) {
            return apiRequest('rooms', {method: 'GET', params: searchParams});
        },
        addRoom(data: FormData) {
            return apiRequest('rooms', {method: 'POST', data}, true);
        },
        updateRoom(data: FormData, id: string) {
            return apiRequest(`rooms/${id}`, {method: 'PUT', data}, true);
        },
        findById(id: string): Promise<AxiosResponse> {
            return apiRequest(`rooms/${id}`, {method: 'GET'});
        }
    };

    const reservationsApi = {
        search(searchParams: SearchReservationsDto) {
            return apiRequest('reservations', {method: 'GET', params: searchParams});
        },
        addReservation(data: AddReservationDto) {
            return apiRequest('reservations', {method: 'POST', data});
        },
        removeReservation(reservationId: string, userId: string | null) {
            return apiRequest(`reservations/${reservationId}`, {method: 'DELETE', data: {userId}});
        },
    }

    const supportRequestApi = {
        createRequest(data: CreateSupportRequestDto) {
            return apiRequest('support', {method: 'POST', data});
        },
        findRequests(searchParams: GetChatListParams) {
            return apiRequest('support', {method: 'GET', params: searchParams});
        },
        sendMessage(data: SendMessageDto) {
            return apiRequest('support/sendmessage', {method: 'POST', data});
        },
        getMessages(supportRequestId: string, userId: string | null) {
            return apiRequest(`support/getmessages/${supportRequestId}`, {method: 'GET', params: {userId}});
        },
        readMessages(data: { supportRequestId: string; createdBefore: Date; userId: string | null }) {
            return apiRequest('support/readmessages', {method: 'POST', data});
        },
        closeRequest(supportRequestId: string) {
            return apiRequest(`support/closerequest/${supportRequestId}`, {method: 'POST'});
        },
    }

    return {
        usersApi, authUser, hotelsAPI, roomsApi, reservationsApi, supportRequestApi
    };
}
