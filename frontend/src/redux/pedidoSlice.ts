import {createSlice} from '@reduxjs/toolkit';
import {RootState} from './store';
import {coloresEmpresa} from "../constantes/constantesNegocio";

const initialState = {pedidoActual: {}, esPedidoFinalizado: false, market_dates: {}};
export const pedidoSlice = createSlice({
    name: 'pedidoActual',
    initialState,
    reducers: {
        addPedido(state, action) {
            state.pedidoActual[action.payload.name] = action.payload.data
        },
        deleteProductoFromPedido(state, action) {

            delete state.pedidoActual[action.payload.name];
        },

        borrarPedido(state) {
            state.pedidoActual = {}
        },
        setEsPedidoFinalizado(state, action) {
            state.esPedidoFinalizado = action.payload;
        },
        setMarketDates(state, action) {
            const market_dates_aux = {}
            for (const fechaString of action.payload) {
                const fecha = new Date(fechaString)
                market_dates_aux[fecha.toLocaleDateString("sv-SE")] = {

                    selected: true, customStyles: {
                        container: {
                            backgroundColor: coloresEmpresa[1]
                        }
                    }

                }


            }
            state.market_dates = market_dates_aux
        }


    },


});
export const {addPedido, deleteProductoFromPedido, borrarPedido, setMarketDates} = pedidoSlice.actions;
export const pedidoActual = (state: RootState) => state.pedido.pedidoActual;
export const market_dates = (state: RootState) => state.pedido.market_dates;
export default pedidoSlice.reducer;