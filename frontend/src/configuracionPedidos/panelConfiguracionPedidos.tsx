import * as React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import useCargarRestriccionesApp from "../myHooks/useCargarRestriccionesApp";

import PedidosHistoricos from "./pedidosHistoricos";
import PedidosGuardados from "./pedidosGuardados";
import {coloresEmpresa} from "../constantes/constantesNegocio";
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {nombreUsuarioLogueado} from "../redux/loginSlice";




export default function PanelConfiguracionPedidos({navigation}) {
    useCargarRestriccionesApp()
    const nombreUsuarioLogueado_=useSelector(nombreUsuarioLogueado)

    const [esVisibleConfiguracion,setEsVisibleConfiguracion]=useState("pedidosGuardados")
    function pedidosGuardadosHandler(){
        setEsVisibleConfiguracion("pedidosGuardados")
    }
    function historicoPedidosHandler(){
        setEsVisibleConfiguracion("pedidosHistoricos")

    }
    useEffect(() => {
        // Update the document title using the browser API
        const unsuscribe=navigation.addListener("focus",()=>{
            setEsVisibleConfiguracion("pedidosGuardados")

        })
        return unsuscribe;



    },[navigation]);
  return (
      <View style={{flex:1,backgroundColor: '#ffffff',}}>

              <View style={{flex:0.95}}>
                  {esVisibleConfiguracion=="pedidosGuardados"?
              <PedidosGuardados></PedidosGuardados>:
              <View >
              <PedidosHistoricos nombreUsuario={nombreUsuarioLogueado_}></PedidosHistoricos>
              </View>}
              </View>

          <View style={styles_.conteinerRow}>
              <TouchableOpacity style={styles_.button} onPress={() => pedidosGuardadosHandler()}><Text
                  style={styles_.text}>{"Pedidos \n guardados"}</Text></TouchableOpacity>
              <TouchableOpacity onPress={historicoPedidosHandler} style={styles_.button}><Text
                  style={styles_.text}>{"Histórico \n de pedidos"}</Text></TouchableOpacity>


          </View>
      </View>



  );
}
const styles_ = StyleSheet.create({
    button: {
        width: 110,
        margin:10,
        marginBottom: 2,
        paddingBottom: 2,
        borderRadius: 10,
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderBottomColor: coloresEmpresa[0],



    }, conteinerRow:{
        flexDirection: 'row',
        margin:10,
        marginBottom:10,
        paddingBottom:15,
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',

    },
    centeredView: {

        justifyContent: "center",
        alignItems: "center",
        marginBottom: 20
    },
    modalView: {


        margin: 10,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    ScrollPedido: {

        backgroundColor: '#fff',


    },
    textoListaCarrito: {
        marginBottom: 10,
        fontSize: 13
    },
    textPedido: {
        alignItems: 'center',
        fontSize: 16,

        fontWeight: 'bold',
        justifyContent: 'center',
        maringTop: 10,
        textAlign: 'center',
        color: coloresEmpresa[0]
    },
    text: {
        alignItems: 'center',
        fontSize: 14,
        fontWeight: 'bold',
        justifyContent: 'center',
        padding: 2,
        textAlign: 'center',
        color: coloresEmpresa[0]
    },
    modalHeaderCloseText: {
        textAlign: "center",
        paddingLeft: 5,
        paddingRight: 5
    },
    textoSumaPrecios:{
        fontWeight: 'bold',
        color: coloresEmpresa[0],
        fontSize: 13,
        marginRight: 40
    }


});
