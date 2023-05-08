import {configureStore} from '@reduxjs/toolkit';
import loginReducer from './loginSlice';
import productosReducer from './productosSlice'
import pedidoReducer from './pedidoSlice'
import modalReducer from "./modalSlice";
import opcionesAppReducer from "./opcionesAppSlice";
import vendedorReducer from "./vendedorSlice";
export const store = configureStore({
    reducer: {
       login: loginReducer,
        producto:productosReducer,
        pedido:pedidoReducer,
        modal:modalReducer,
        opcionesApp:opcionesAppReducer,
        vendedor:vendedorReducer



    },

});
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;