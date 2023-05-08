import * as React from "react";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {findClientes} from "../services/loginServive";
import {setClientes, setFranjasHorarias, setOpcionesGenerales} from "../redux/vendedorSlice";
import {getFranjasHorarias, getOpcionesGenerales} from "../services/opcionesApp";
import {setSearchQuery} from "../redux/productosSlice";

export default function UseCargarVendedor() {
    const dispatch = useDispatch();
    const fetchData = React.useCallback(() => {
        findClientes().then((response) => {
           dispatch(setClientes(response.data))
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


    }, [])

    useEffect(() => {

        fetchData()


    }, [fetchData]);
}