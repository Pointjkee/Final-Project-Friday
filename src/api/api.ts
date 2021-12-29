import axios, {AxiosResponse} from 'axios'
import {ForgotType} from "../reducers/restoreReducer";
import {GetParamsType, PostPackType, UpdatePackType} from "../reducers/packReducer";
import {
    AuthResponseType,
    CardsParamsType,
    GetPackType,
    LoginParamsType,
    NewCardsType,
    ResponseType,
    SetProfileType,
    UpdateCardType
} from "./types";
import {ChangePasswordType} from "../reducers/newPasswordReducer";


const instance = axios.create({
    baseURL: 'https://neko-back.herokuapp.com/2.0',
    withCredentials: true,
})
export const userAPI = {
    register(email: string, password: string) {
        return instance.post(`/auth/register/`, {email, password});
    },
    restorePassword(forgot: ForgotType) {
        return instance.post<AxiosResponse<AuthResponseType>>(`/auth/forgot`, forgot)
    },
    changePassword(newPassword: ChangePasswordType) {
        return instance.post<AxiosResponse<AuthResponseType>>(`/auth/set-new-password`, newPassword)
    },
    login(data: LoginParamsType) {
        return instance.post<ResponseType>('auth/login', data)
    },
    logOut() {
        return instance.delete('/auth/me')
    },
    me() {
        return instance.post('/auth/me')
    },
}


export const profileAPI = {
    setProfile(data: SetProfileType) {
        return instance.put('/auth/me', data)
    }
}

export const packAPI = {
    getPack(config: GetParamsType | void) {
        return instance.get<GetPackType>(`/cards/pack?`, {params: config})
    },
    postPack(data?: PostPackType) {
        let dataOptions = data === undefined ? {cardsPack: {data}} : data
        return instance.post(`cards/pack`, dataOptions)
    },
    deletePack(id: string) {
        return instance.delete(`cards/pack/?id=${id}`)
    },
    updatePack(data: UpdatePackType) {
        let {_id, name} = data.cardsPack
        return instance.put(`cards/pack`, {cardsPack: {_id, name}})
    }

}

export const cardsAPI = {
    getCards(params: CardsParamsType) {
        const {min, max, sortCards, page, pageCount, cardsPack_id} = params
        return instance.get('/cards/card', {params: {min, max, sortCards, page, pageCount, cardsPack_id}})
    },
    setCards(cards: NewCardsType) {
        return instance.post('/cards/card', {card: {...cards}})
    },
    deleteCard(cardId: string) {
        return instance.delete('/cards/card', {params: {id: cardId}})
    },
    updateCard(updateCard: UpdateCardType) {
        return instance.put('/cards/card', {card: {...updateCard}})
    },
    gradeCard(grade:number,card_id:string){
        return instance.put('/cards/grade', {grade,card_id})
    }
}
