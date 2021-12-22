
import {GetPackType, packAPI} from "../api/api";
import {Dispatch} from "redux";


const initialState = {

}


export type InitialStateTypeProfile = typeof initialState

export const packReducer = (state: InitialStateTypeProfile = initialState, action: SetPackType): InitialStateTypeProfile => {
    switch (action.type) {
        case "PACK/SET-PACK":{
            return {...state, ...action.data}
        }
        default:
            return state
    }
}

type SetPackType = ReturnType<typeof setStatePack>
export const setStatePack = (data: GetPackType) => ({type:"PACK/SET-PACK", data} as const)

export const getPack = () => (dispatch:Dispatch) => {
    packAPI.getPack().then(res=>{
        dispatch(setStatePack(res.data))
    })
}
