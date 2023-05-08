import {createSlice} from '@reduxjs/toolkit';
import {RootState} from './store';
import Producto from "../entities/Producto";
import {getFullNameProducto} from "../utils/get_names";

const initialState = {
    familia: null,
    subfamilia: null,
    productos: {},
    familias: {},
    subfamilias: {},
    subfamiliaActiva: "",
    subfamiliasShow: {},
    listaProductosSearch:[],
    searchQuery:"",
    nombreProductoBuscado:"",
    ref:null,
    updateRef:false,
};
export const productosSlice = createSlice({
    name: 'productoSeleccionado',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        setFamilia(state, action) {
            if (Object.keys(state.familias).length > 0 && state.subfamiliaActiva in state.familias[state.familia]) {
                state.familias[state.familia][state.subfamiliaActiva]["activa"] = false
                state.subfamiliaActiva = ""

            }
            state.familia = action.payload


        },
        setUpdateRef(state,action){
            state.updateRef=action.payload
        },
        setRef(state,action){
            state.ref=action.payload
        },
        setNombreProductoBuscado(state,action){

                if ( state.familias.hasOwnProperty(state.familia) && Object.keys(state.familias).length > 0 && state.subfamiliaActiva in state.familias[state.familia]) {
                    state.familias[state.familia][state.subfamiliaActiva]["activa"] = false

                }
                const familia = action.payload.data[0]["familia"]
                const subfamilia = action.payload.data[0]["subfamilia"]
                state.familia = familia
                state.familias[familia] = {}
                if (Object.keys(state.familias[familia]).length==0) {
                    for (var i = 0; i < action.payload.subfamilias.length; i++) {
                        state.familias[familia][action.payload.subfamilias[i]] = {activa: false, productos: {}}
                    }
                }


                for (var i = 0; i < action.payload.data.length; i++) {
                    const full_name = getFullNameProducto(action.payload.data[i])

                    state.productos[full_name] = action.payload.data[i]

                    state.familias[familia][subfamilia]["productos"][full_name] = action.payload.data[i]
                }
                state.familias[familia][subfamilia]["activa"] = true
                state.subfamiliaActiva = subfamilia
                state.subfamiliasShow[familia]=[subfamilia]
                state.nombreProductoBuscado=action.payload.nombre
        },
        setSearchQuery(state,action){
            state.searchQuery=action.payload
        },
        setListaProductosSearch(state,action){
            state.listaProductosSearch=action.payload.data
        },
        desactivarSubFamilia(state, action) {
            state.subfamilias[action.payload.subfamilia]["activa"] = false
        },
        setProductos(state, action) {
            if (action.payload.data.length > 0) {
                const familia = action.payload.data[0]["familia"]
                const subfamilia = action.payload.data[0]["subfamilia"]
                for (var i = 0; i < action.payload.data.length; i++) {
                    const full_name = getFullNameProducto(action.payload.data[i])

                    state.productos[full_name] = action.payload.data[i]

                    state.familias[familia][subfamilia]["productos"][full_name] = action.payload.data[i]
                }
                const activa = state.familias[familia][subfamilia]["activa"]

                if (!activa && state.subfamiliaActiva in state.familias[familia]) {
                    state.familias[familia][state.subfamiliaActiva]["activa"] = false
                }
                state.familias[familia][subfamilia]["activa"] = !activa
                if (!activa) {
                    state.subfamiliaActiva = subfamilia
                    state.subfamiliasShow[familia]=[subfamilia]
                }

                if (activa) {
                    state.subfamiliaActiva = ""
                    state.subfamiliasShow[familia] = Object.keys(state.familias[familia]).sort()
                }
            }


        }, setSubfamilias(state, action) {


            state.familias[action.payload.familia] = {}
            for (var i = 0; i < action.payload.data.length; i++) {
                state.familias[action.payload.familia][action.payload.data[i]] = {activa: false, productos: {}}
            }
            state.subfamiliasShow[action.payload.familia] = Object.keys(state.familias[action.payload.familia]).sort()


        },


    },
});
export const {setFamilia, setProductos, setRef,setNombreProductoBuscado, setSubfamilias,setListaProductosSearch,setSearchQuery,} = productosSlice.actions;
export const familiaProductoSeleccionada = (state: RootState) => state.producto.familia;
export const productos = (state: RootState) => state.producto.productos;
export const familias = (state: RootState) => state.producto.familias;
export const subfamiliasShow = (state: RootState) => state.producto.subfamiliasShow;
export const listaProductosSearch = (state: RootState) => state.producto.listaProductosSearch;
export const searchQuery = (state: RootState) => state.producto.searchQuery;
export const nombreProductoBuscado = (state: RootState) => state.producto.nombreProductoBuscado;
export const  subfamiliaActiva=(state: RootState) => state.producto.subfamiliaActiva;
export const ref= (state: RootState) => state.producto.ref;
export default productosSlice.reducer;