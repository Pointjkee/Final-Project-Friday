import {packAPI} from "../api/api";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AppRootStateType} from "../store/store";

const initialState = {
    cardPacks: [{
        _id: "",
        user_id: "",
        name: "",
        path: "",
        cardsCount: 0,
        grade: 0,
        shots: 0,
        rating: 0,
        type: "",
        created: "",
        updated: "",
        __v: 0,
        user_name: "",
    }],
    cardPacksTotalCount: 0,
    maxCardsCount: 0,
    minCardsCount: 0,
    page: 1,
    pageCount: 10,
}


export const getPack = createAsyncThunk('pack/getPack', async (params: GetParamsType | void, {dispatch}) => {
    const res = await packAPI.getPack(params)
    return res.data
})


export const addPack = createAsyncThunk('pack/addPack',
    async (param: { data?: PostPackType, packName: string }, {dispatch, getState}) => {
        const value = getState() as AppRootStateType
        await packAPI.postPack(param.data)
        dispatch(getPack({packName: param.packName, pageCount: value.pack.pageCount, page: value.pack.page}))
    })

export const deletePack = createAsyncThunk('pack/deletePack',
    async (param: { id: string, packName: string}, {dispatch, getState}) => {
        const value = getState() as AppRootStateType
        await packAPI.deletePack(param.id)
        dispatch(getPack({packName: param.packName, pageCount: value.pack.pageCount, page: value.pack.page}))
    })

export const updatePack = createAsyncThunk('pack/updatePack', async (data: UpdatePackType, {dispatch}) => {
    packAPI.updatePack(data).then(() => {
        dispatch(getPack())
    })
})

export const slice = createSlice({
    name: "task",
    initialState,
    reducers: {
        setPageCount: (state, action: PayloadAction<{ pageSize: number }>) => {
            state.pageCount = action.payload.pageSize
        },
        setCurrentPage: (state, action: PayloadAction<{ page: number }>) => {
            state.page = action.payload.page
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getPack.fulfilled, (state, action) => {
                return action.payload
            })
    }
});

export const {setPageCount,setCurrentPage} = slice.actions

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
        user_name: string;
    }[]

export type GetParamsType = {
    packName?: string
    min?: number
    max?: number
    sortPacks?: number| string
    page?: number
    pageCount?: number
    user_id?: string
    user_name?: string
}