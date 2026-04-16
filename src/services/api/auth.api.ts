import { instance } from "../index";

export const loginService = (data: { email: string, password: string }) => {
    return instance.post('/auth/login', data);
}

export const logoutService = (refresh_token: string) => {
    return instance.post('/auth/logout', { refresh_token });
}

export const changePasswordService = (data: { currentPassword: string; newPassword: string }) => {
    return instance.post('/users/change-password', data);
}

export const forgotPasswordService = (data: { email: string }) => {
    return instance.post('/auth/forgot-password', data);
}

export const verifyOtpService = (data: { email: string; otp: string }) => {
    return instance.post('/auth/verify-otp', data);
}