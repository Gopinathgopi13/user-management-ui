import { instance } from "../index";

export const loginService = (data: { email: string, password: string }) => {
    return instance.post('/auth/login', data);
}

export const logoutService = (refresh_token: string) => {
    return instance.post('/auth/logout', { refresh_token });
}