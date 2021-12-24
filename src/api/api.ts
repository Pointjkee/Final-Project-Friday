import axios, {AxiosResponse} from 'axios'
import {ForgotType} from "../reducers/restoreReducer";
import {ChangePasswordType} from "../reducers/newPasswordReducer";
import {GetParamsType, PostPackType, UpdatePackType} from "../reducers/packReducer";


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
    getPack(config?: GetParamsType) {
        return instance.get<GetPackType>(`/cards/pack?pageCount=${16}`, {params: config})
    },
    postPack(data: PostPackType | void) {
        let dataOptions = data === undefined ? {cardsPack: {data}} : data
        return instance.post(`cards/pack`, dataOptions)
    },
    deletePack(id: string) {
        return instance.delete(`cards/pack/?id=${id}`)
    },
    updatePack(data: UpdatePackType) {
        const {_id, name = "OLOLOLOLOLLOL :D"} = data.cardsPack
        return instance.put(`cards/pack`, {cardsPack: {_id, name}})
    }

}

export const cardsAPI = {
    getCards(params: CardsParamsType) {
        const {min, max, sortCards, page, pageCount,cardsPack_id} = params
        return instance.get('/cards/card', {params: {min, max, sortCards, page, pageCount,cardsPack_id}})
    },
    setCards(cards: NewCardsType) {
        return instance.post('/cards/card', {card: {...cards}})
    },
    deleteCard(cardId: string) {
        return instance.delete('/cards/card', {params: {id: cardId}})
    },
    updateCard(updateCard:UpdateCardType) {
        return instance.put('/cards/card',{card:{...updateCard}})
    },

}

export type GetPackType = {
    cardPacks: [
        {
            _id: string
            user_id: string
            name: string
            path: string
            cardsCount: number
            grade: number
            shots: number
            rating: number
            type: string
            created: string
            updated: string
            __v: number
        },
    ]
    cardPacksTotalCount: number
    maxCardsCount: number
    minCardsCount: number
    page: number
    pageCount: number

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
    publicCardPacksCount: number;
    created: Date;
    updated: Date;
    isAdmin: boolean;
    verified: boolean;
    rememberMe: boolean;
    error?: string;
}

export type LoginParamsType = {
    email: string;
    password: string;
    rememberMe: boolean;
}

export type CardsParamsType = {
    cardsPack_id: string|undefined
    min?: number
    max?: number
    sortCards?: number
    page?: number
    pageCount?: number
}

export type NewCardsType = {
    cardsPack_id: string
    question: string
    answer: string
    grade?: number
    shots?: number
    rating?: number
    answerImg?: string
    questionImg?: string
    questionVideo?: string
    answerVideo?: string
    type: string
}

export type UpdateCardType = {
    _id: string
    question?: string
    answer?: string
    grade?: number
    shots?: number
    rating?: number
    answerImg?: string
    questionImg?: string
    questionVideo?: string
    answerVideo?: string
    type?: string
    comments?: string
}