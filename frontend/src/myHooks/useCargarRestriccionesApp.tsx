import {useDispatch, useSelector} from "react-redux";
import * as React from "react";
import {getSubfamilias} from "../services/productosService";
import {setSubfamilias} from "../redux/productosSlice";
import {useEffect} from "react";
import {nombreUsuarioLogueado } from "../redux/loginSlice";
import {
    getFranjasHorarias,
    getOpcionesCliente,
    getOpcionesGenerales,
    getPedidosConfigurados
} from "../services/opcionesApp";
import {setOpcionesGeneralesCliente, setPedidosGuardados} from "../redux/opcionesAppSlice";
import {setFranjasHorarias, setOpcionesGenerales} from "../redux/vendedorSlice";
import {setModalGuardarVisible} from "../redux/modalSlice";


export default function useCargarRestriccionesApp(){

    const dispatch = useDispatch();
    const nombreUsuarioLogueado_=useSelector(nombreUsuarioLogueado)

    const fetchData = React.useCallback(() => {

        getOpcionesCliente(nombreUsuarioLogueado_).then((response) => {
            dispatch(setOpcionesGeneralesCliente(response.data))


        })
            .catch((error) => {

            })

        getPedidosConfigurados(nombreUsuarioLogueado_).then((response) => {
            //no se cancela el pedido pero en el frontent si para eliminarlo del frontent
            dispatch(setPedidosGuardados(response.data))
            dispatch(setModalGuardarVisible(false))
        })
            .catch((error) => {

            })
        getOpcionesGenerales().then((response) => {

            dispatch(setOpcionesGenerales(response.data))
        })
            .catch((error) => {

            })
        getFranjasHorarias().then((response) => {

            dispatch(setFranjasHorarias(response.data))
        })
            .catch((error) => {

            })
    }, [nombreUsuarioLogueado_])
    useEffect(() => {

        fetchData();

    },[] )
}