import axios, {AxiosResponse} from 'axios'
import {ForgotType} from "../reducers/restoreReducer";
import {ChangePasswordType} from "../reducers/newPasswordReducer";

const instance = axios.create({
    baseURL: 'https://neko-back.herokuapp.com/2.0',
    withCredentials: true,
})
export const userAPI = {
    register(email: string, password: string) {
        return instance.post(`/auth/register/`, {email, password});
    },
    restorePassword(forgot: ForgotType){
        return instance.post<AxiosResponse<AuthResponseType>>(`/auth/forgot`, forgot)
    },
    changePassword(newPassword: ChangePasswordType){
        return instance.post<AxiosResponse<AuthResponseType>>(`/auth/set-new-password`, newPassword)
    },
    login(data: LoginParamsType) {
        return instance.post<ResponseType>('auth/login', data)
    },
    logOut(){
        return instance.delete('/auth/me')
    },
    me() {
        return instance.post('/auth/me')
    },
}



export const profileAPI ={
    setProfile(data:SetProfileType){
        return instance.put('/auth/me', data)
    }
}



export type SetProfileType = {
    name: string
    avatar: string | null
}

type AuthResponseType = {
    info: string
    error: string
}

export type ResponseType = {
    _id: string;
    email: string;
    name: string;
    avatar?: string;
    publicCardPacksCount: number; // количество колод
    created: Date;
    updated: Date;
    isAdmin: boolean;
    verified: boolean; // подтвердил ли почту
    rememberMe: boolean;
    error?: string;
}

export type LoginParamsType = {
    email: string;
    password: string;
    rememberMe: boolean;
}