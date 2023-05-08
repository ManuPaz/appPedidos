import {StyleSheet, Text, View} from "react-native";
import Negrita from "../elementos/Negrita";
import ButtonGradient from "../elementos/ButtonGradient";
import VerPedidoConfigurado from "./verPedidoConfigurado";
import * as React from "react";
import {modalConfVisible, setModalConfVisible} from "../redux/opcionesAppSlice";
import {useDispatch, useSelector} from "react-redux";


export default function VerEditarPedido({pedido} ){
    const modalConfVisible_ = useSelector(modalConfVisible)
    return (
    <View>
        {(pedido != null) ?

            <View style={{margin: 2, justifyContent: 'center', alignItems: 'center'}}>
                {modalConfVisible_!=null ? <VerPedidoConfigurado pedido={modalConfVisible_}></VerPedidoConfigurado> :
                    <View></View>}

            </View> :

            <View>

            </View>

        }

    </View>)


}

const styles_ = StyleSheet.create({
    container: {

        paddingTop: 10,

    },
    textTitle: {
        fontSize: 16,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        fontWeight: "bold",
        margin: 10,
        textDecorationLine: 'underline',

    }, textTitle2: {
        fontSize: 16,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        margin: 5,

    },
    item: {
        padding: 10,
        fontSize: 13,
    }, textoListaCarrito: {
        margin: 10,
        fontSize: 13,
        fontStyle: 'italic'
    },

})