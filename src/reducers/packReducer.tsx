import {packAPI} from "../api/api";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AppRootStateType} from "../store/store";
import {setErrorMessage, setPackStatus} from "./appReducer";

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
    maxCardsCount: 103,
    minCardsCount: 0,
    page: 1,
    pageCount: 10,
}


export const getPack = createAsyncThunk('pack/getPack', async (params: GetParamsType | void,{dispatch}) => {
    dispatch(setPackStatus('loading'));
    const res = await packAPI.getPack(params);
    dispatch(setPackStatus('success'));
    return res.data;
})


export const addPack = createAsyncThunk('pack/addPack',
    async (data: PostPackType|void, {dispatch, getState}) => {
        const value = getState() as AppRootStateType
        let user_id = value.profile.profile._id !== null && value.app.isMePack? value.profile.profile._id: "";
        dispatch(setPackStatus('loading'));
        await packAPI.postPack(data);
        dispatch(getPack({pageCount: value.pack.pageCount,user_id}));
        dispatch(setPackStatus('success'));
    })

export const deletePack = createAsyncThunk('pack/deletePack',
    async (param: { id: string, packName: string }, {dispatch, getState}) => {
        dispatch(setPackStatus('loading'))
        const value = getState() as AppRootStateType
        let user_id = value.profile.profile._id !== null && value.app.isMePack? value.profile.profile._id: "";
        await packAPI.deletePack(param.id)
        dispatch(getPack({packName: param.packName,user_id, pageCount: value.pack.pageCount, page: value.pack.page}));
        dispatch(setPackStatus('success'));
    })

export const updatePack = createAsyncThunk('pack/updatePack', async (data: UpdatePackType, {dispatch, getState}) => {
    dispatch(setPackStatus('loading'))
    packAPI.updatePack(data).then(() => {
        const value = getState() as AppRootStateType
        let user_id = value.profile.profile._id !== null && value.app.isMePack? value.profile.profile._id: "";
        dispatch(getPack({pageCount: value.pack.pageCount,user_id}))
        dispatch(setPackStatus('success'))
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
        },
        setMaxCardsCount: (state, action: PayloadAction<{ maxCardsCount: number }>) => {
            state.maxCardsCount = action.payload.maxCardsCount
        },
        setMinCardsCount: (state, action: PayloadAction<{ minCardsCount: number }>) => {
            state.minCardsCount = action.payload.minCardsCount
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getPack.fulfilled, (state, action) => {
                state.cardPacks =  action.payload.cardPacks
                state.cardPacksTotalCount =  action.payload.cardPacksTotalCount
                state.page =  action.payload.page
                state.pageCount =  action.payload.pageCount
            })
    }
});

export const {setPageCount,setMaxCardsCount,setMinCardsCount} = slice.actions

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