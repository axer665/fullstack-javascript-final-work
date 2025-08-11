import {Client} from "@socket/Client.ts";
import {useAppDispatch} from "@store/hooks.ts";
import API from "@api";
import {get} from "@helpers/localStorage.ts";
import {login, logout} from "@store/users/userSlice.ts";
import React, {PropsWithChildren, useEffect} from "react";

interface AuthLayerProps {
    children: React.ReactNode;
}

export const AuthLayer: React.FC<PropsWithChildren<AuthLayerProps>> = ({children}) => {
    Client();
    const dispatch = useAppDispatch();
    const {authUser} = API();

    const checkAuth = async () => {
        const token = get('token');

        try {
            if (token) {
                const base64Url = token.split('.')[1];
                const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
                const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
                    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
                }).join(''));
                const {email} = JSON.parse(jsonPayload);
                authUser.getInfo(email)
                    .then(result => {
                        dispatch(login({token, role: result.data.role, id: result.data.id}));
                    })
                    .catch(() => {
                        dispatch(logout());
                    })
            }
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        checkAuth().then(() => {});
    }, [])

    return (
        <>
            {children}
        </>
    )
}

export default AuthLayer;