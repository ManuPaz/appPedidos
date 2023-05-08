import {createSlice} from '@reduxjs/toolkit';
import {RootState} from './store';

const initialState = {nombreUsuario: null,usuario:null};
export const loginSlice = createSlice({
    name: 'log',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        loginToApp(state,action) {
            state.nombreUsuario = action.payload.nombreUsuario
            state.usuario = action.payload
        },
        logoutToApp(state) {
            state.nombreUsuario=null
        },

    },
});
export const {loginToApp,logoutToApp} = loginSlice.actions;
// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const nombreUsuarioLogueado = (state: RootState) => state.login.nombreUsuario;
export const usuario = (state: RootState) => state.login.usuario;
// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.
export default loginSlice.reducer;