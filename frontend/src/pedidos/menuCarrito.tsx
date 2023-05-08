import {TouchableOpacity, Text, View, StyleSheet, Modal, Pressable, ScrollView, Alert} from "react-native";
import {styles} from "../styles/stylesContainers";
import {
    coloresEmpresa,
    mensajeErrorGuardarPedido,
    mensajePedidoBorrado,
    simboloMoneda
} from "../constantes/constantesNegocio"
import ButtonGradient from "../elementos/ButtonGradient";
import {useState} from "react";
import Carrito from "./carrito";
import {useDispatch, useSelector} from "react-redux";
import {
    borrarPedido, pedidoActual,
} from "../redux/pedidoSlice";

import {hacerPedidoService} from "../services/hacerPedidoService";
import {setModalVisible, modalVisible, setModalGuardarVisible} from "../redux/modalSlice";
import * as React from "react";
import {nombreUsuarioLogueado} from "../redux/loginSlice";
import {getPedidosConfigurados, guardarPedidoConfigurado} from "../services/opcionesApp";
import {
    mensajeErrorServidor,
    mensajeErrorPeticionPedido,
    BAD_REQUEST,
    INTERNAL_SERVER_ERROR
} from "../constantes/constantesNegocio"
import {setPedidosGuardados} from "../redux/opcionesAppSlice";
import ModalGuardarPedido from "./modalGuardarPedido";

export default function MenuCarrito() {

    const dispatch = useDispatch();
    const pedidoActual_ = useSelector(pedidoActual)
    const nombreUsuarioLogueado_ = useSelector(nombreUsuarioLogueado);

    //funcion que borrar el pedido en el front
    function borrarPedidoHandler() {
        Alert.alert(mensajePedidoBorrado)
        dispatch(borrarPedido())

    }

    function onPressGuardar() {
        if (Object.keys(pedidoActual_).length > 0)
            dispatch(setModalGuardarVisible(true))
        else {
            Alert.alert(mensajeErrorGuardarPedido)
        }
    }

    //maneja la apertura del primer modal para confirmar que se quiere enviar el pedido
    function finalizarPedidoPrimerModalHandler() {
        dispatch(setModalVisible(true));

    }

    return (
        <View>
            {/*panel de navegacion de abajo para ver, enviar y borrar el pedido*/}
            <View style={styles_.conteinerRow}>
                <View style={{margin: 4}}>
                    <ButtonGradient Press={finalizarPedidoPrimerModalHandler} Name={'Ver / Enviar \n pedido'}
                                    width={110}></ButtonGradient>
                </View>
                <View style={{margin: 4}}>
                    <ButtonGradient Press={onPressGuardar} Name={'Guardar pedido'}
                                    width={110}></ButtonGradient>
                </View>
                <View style={{margin: 4}}>
                    <ButtonGradient Press={borrarPedidoHandler} Name={'Borrar pedido'}
                                    width={110}></ButtonGradient>
                </View>

                <ModalGuardarPedido></ModalGuardarPedido>


            </View>
            <Carrito></Carrito>
        </View>


    );


}
const styles_ = StyleSheet.create({
    button: {

        margin: 10,
        marginBottom: 2,
        paddingBottom: 2,
        borderRadius: 10,
        borderBottomWidth: 1,
        borderBottomColor: coloresEmpresa[0],


    }, conteinerRow: {
        marginBottom: 10,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: 'row',


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
    textoSumaPrecios: {
        fontWeight: 'bold',
        color: coloresEmpresa[0],
        fontSize: 13,
        marginRight: 40
    }


});

