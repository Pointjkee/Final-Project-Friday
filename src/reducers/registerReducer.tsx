const initialState = {

}
type InitialStateType = typeof initialState

export const registerReducer = (state: InitialStateType = initialState, action: any): InitialStateType => {
    switch (action.type) {
        default:
            return state
    }
}