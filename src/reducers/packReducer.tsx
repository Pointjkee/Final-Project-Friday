import {packAPI} from "../api/api";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

const initialState = {
    cardPacks: [
        {
            _id: '',
            user_id: '',
            name: '',
            path: '',
            cardsCount: 0,
            grade: 0,
            shots: 0,
            rating: 0,
            type: '',
            created: '',
            updated: '',
            __v: 0,
        },
    ],
    cardPacksTotalCount: 0,
    maxCardsCount: 0,
    minCardsCount: 0,
    page: 0,
    pageCount: 0,
}


export const getPack = createAsyncThunk('pack/getPack', async (params?: GetParamsType) => {
    const res = await packAPI.getPack(params)
    return res.data
})


export const addPack = createAsyncThunk('pack/addPack', async (data: PostPackType | void, thunkAPI) => {
    await packAPI.postPack(data)
    thunkAPI.dispatch(getPack())
})

export const deletePack = createAsyncThunk('pack/deletePack', async (id:string, thunkAPI) => {
   await packAPI.deletePack(id)
        thunkAPI.dispatch(getPack())
})

export const updatePack = createAsyncThunk('pack/updatePack', async (data: UpdatePackType, thunkAPI) => {
    packAPI.updatePack(data).then(() => {
        thunkAPI.dispatch(getPack())
    })
})

export const slice = createSlice({
    name: "task",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getPack.fulfilled, (state, action) => {
                return action.payload
            })
    }
});

export const packReducer = slice.reducer

export type InitialStateTypeProfile = typeof initialState

export type UpdatePackType = {
    cardsPack: {
        _id: string
        name?: string
    }
}

export type PostPackType = {
    cardsPack: {
        name?: string
        path?: string
        grade?: number
        shots?: number
        rating?: number
        deckCover?: string
        private?: boolean
        type?: string
    }
}

export type cardPacksType =
    {
        _id: string;
        user_id: string;
        name: string;
        path: string;
        cardsCount: number;
        grade: number;
        shots: number;
        rating: number;
        type: string;
        created: string;
        updated: string;
        __v: number;
    }[]

export type GetParamsType = {
    packName?: string
    min?: number
    max?: number
    sortPacks?: number
    page?: number
    pageCount?: number
    user_id?: string
}