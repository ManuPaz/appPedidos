import {createSlice} from '@reduxjs/toolkit';
import {RootState} from './store';
import {pedidoBaseOpcion,pedidoBase_pedidoSeleccionado} from "../constantes/constantesNegocio";
const initialState = {
    opcionesGenerealesCliente:{},
    pedidoHistoricoFijado:null,
    pedidoBase:null,
    ultimoPedido:null,
    pedidoGuardadoEnTrabajo:null,
    fechasPedidos:[],
    pedidosHistoricos:{},
    fechaActual:null,
    modalConfVisible:null,
    pedidosGuardados:{}
};
export const opcionesAppSlice = createSlice({
    name: 'opcionesApp',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        setOpcionesGeneralesCliente(state,action){
            const opcionesGenerales={}

            for (const dic of action.payload){
                opcionesGenerales[dic["nombre"]]=dic["valor"]


            }
            state. opcionesGenerealesCliente=opcionesGenerales
        },
        setPedidosGuardados(state,action){
          state.pedidosGuardados=action.payload
        },
        setModalConfVisible(state,action){
            state.modalConfVisible=action.payload
        },

        setPedidosHistoricos(state,action){
            if(Object.keys(action.payload.data).length>0) {
                state.pedidosHistoricos[action.payload.fecha] = action.payload.data
                state. modalConfVisible= action.payload.data[Object.keys(action.payload.data)[0]]
                state.fechaActual = action.payload.fecha
            }else{
                state.fechaActual=null,
                    state. pedidoHistoricoFijado=null
            }
        },
        setFechaActual(state,action){
            state.fechaActual=action.payload.fecha
        },
        setPedidoHistoricoFijado(state,action){

            state.  pedidoHistoricoFijado=action.payload
        },
        setFechasPedidos(state,action){
            for (const  e of action.payload){
                state.fechasPedidos.push(e)
            }

        }
    }
})
export const {setOpcionesGeneralesCliente,setPedidosHistoricos,setModalConfVisible,setPedidosGuardados} = opcionesAppSlice.actions;
export const opcionesGeneralesCliente= (state: RootState) => state.opcionesApp.opcionesGenerealesCliente;
export const fechaActual=(state: RootState) => state.opcionesApp.fechaActual;
export const modalConfVisible=(state: RootState) => state.opcionesApp.modalConfVisible;
export const ultimoPedido=(state: RootState) => state.opcionesApp.ultimoPedido
export const pedidosGuardados=(state: RootState) => state.opcionesApp.pedidosGuardados;
export const pedidoGuardadoEnTrabajo=(state: RootState) => state.opcionesApp.pedidoGuardadoEnTrabajo;
export default opcionesAppSlice.reducer;