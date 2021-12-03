const initialState = {

}
type InitialStateType = typeof initialState

export const restorePassReducer = (state: InitialStateType = initialState, action: any): InitialStateType => {
    switch (action.type) {
        default:
            return state
    }
}