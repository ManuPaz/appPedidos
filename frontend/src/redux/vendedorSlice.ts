import {createSlice} from '@reduxjs/toolkit';
import {RootState} from './store';

const initialState = {clientes: {},opcionesGenerales:null,clienteTrabajo:null,franjasHorarias:null,franjaHorarioTrabajo:null,
    searchQueryFranjas:"",};
export const vendedorSlice= createSlice({
    name: 'vendedor',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        setClientes(state,action) {
            state.clientes= action.payload
        },
        setOpcionesGenerales(state,action) {
            const opcionesGenerales={}

            for (const dic of action.payload){
                if (dic["valor"]!="true" && dic["valor"]!="false")
                    opcionesGenerales[dic["nombre"]]=dic["valor"]
                else{
                    const aux=dic["valor"]=="true" ? true : false
                    opcionesGenerales[dic["nombre"]]=aux

                }

            }
            state.opcionesGenerales=opcionesGenerales
        },
        setSearchQueryFranjas(state,action){
            state.searchQueryFranjas=action.payload
        },
        setFranjasHorarias(state,action) {
            state.franjasHorarias=action.payload
        },
        setClienteTrabajoInicial(state,action){
            if (action.payload!=null) {
                state.clienteTrabajo = {}
                state.clienteTrabajo["tipo"]=action.payload["tipo"]
                state.clienteTrabajo["nombreUsuario"] = action.payload["nombreUsuario"]
                state.clienteTrabajo["password"] = ""
                state.clienteTrabajo["correoElectronico"] = action.payload["correoElectronico"]
                state.clienteTrabajo["passwordRepeat"] = ""
                state.clienteTrabajo["nombreUsuarioAntiguo"] = action.payload["nombreUsuario"]
            }
            else{
                state.clienteTrabajo=action.payload
            }
        },
        setClienteTrabajo(state,action){

                state.clienteTrabajo=action.payload

        },
        setFranjaHorarioTrabajo(state,action){

            state.franjaHorarioTrabajo=action.payload

        },


    },
});
export const {setClientes,setOpcionesGenerales,setClienteTrabajo,setFranjasHorarias,setClienteTrabajoInicial,setFranjaHorarioTrabajo,setSearchQueryFranjas} = vendedorSlice.actions;
// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const clientes = (state: RootState) => state.vendedor.clientes;
export const opcionesGenerales = (state: RootState) => state.vendedor.opcionesGenerales;
export const clienteTrabajo = (state: RootState) => state.vendedor.clienteTrabajo;
export const franjaHorarioTrabajo = (state: RootState) => state.vendedor.franjaHorarioTrabajo;
export const franjasHorarias= (state: RootState) => state.vendedor.franjasHorarias;
export const searchQueryFranjas= (state: RootState) => state.vendedor.searchQueryFranjas;
// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.
export default vendedorSlice.reducer;