import * as React from 'react';
import { View} from 'react-native';
import useCargarRestriccionesApp from "../myHooks/useCargarRestriccionesApp";

import SeleccionClientes from "./seleccionClientes";
import {useDispatch, useSelector} from "react-redux";
import PedidosHistoricosVendedor from "./pedidosHistoricosVendedor";
import {clienteTrabajo, setClienteTrabajo} from "../redux/vendedorSlice";
import {useEffect} from "react";
import {getFechasPedidos} from "../services/opcionesApp";
import {setMarketDates} from "../redux/pedidoSlice";




export default function PanelConfiguracionPedidosVendedor({navigation}) {
    const  dispatch=useDispatch()
    useCargarRestriccionesApp()
    useEffect(() => {
        // Update the document title using the browser API
        const unsuscribe=navigation.addListener("focus",()=>{
            dispatch(setClienteTrabajo(null))

        })
        return unsuscribe;



    },[navigation]);
    const clienteTrabajo_=useSelector(clienteTrabajo)
    useEffect(()=>{
        if (clienteTrabajo_!=null){
            getFechasPedidos(clienteTrabajo_.nombreUsuario).then((response) => {

                dispatch(setMarketDates(response.data))


            })
                .catch((error) => {

                })
        }

    },[clienteTrabajo_])



  return (
      <View style={{flex:1,backgroundColor: '#ffffff',}}>

              < SeleccionClientes numberOfItemsPerPage={2} tipo={"pedidos"}></SeleccionClientes>
          {clienteTrabajo_ ?
              <View >
              <PedidosHistoricosVendedor nombreUsuario={clienteTrabajo_.nombreUsuario}></PedidosHistoricosVendedor>
              </View>:
              <View></View>
          }
      </View>



  );
}
