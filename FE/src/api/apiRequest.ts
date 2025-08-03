import axios, {AxiosResponse} from "axios";
import {get} from "@helpers/localStorage.ts";

async function apiRequest(url: string, options: object, isFormData = false, callback = (): void => {}): Promise<AxiosResponse> {
    return new Promise((resolve, reject) => {
        axios({
            baseURL: `${import.meta.env.VITE_MAIN_URL}`,
            url,
            headers: {
                Authorization: 'Bearer ' + (get('token') || ''),
                'Content-Type': isFormData ? 'multipart/form-data' : 'application/json',
            },
            ...options,
        })
            .then(result => {
                resolve(result);
            })
            .catch(error => {
                if (axios.isAxiosError(error)) {
                    reject(error.response);
                } else {
                    reject(error);
                }
            })
            .finally(callback);
    });
}

export default apiRequest;