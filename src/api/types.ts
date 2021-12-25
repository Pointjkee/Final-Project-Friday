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

export type AuthResponseType = {
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