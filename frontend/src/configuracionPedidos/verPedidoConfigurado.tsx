import {Image, Modal, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View, Alert} from "react-native";
import Negrita from "../elementos/Negrita";
import {coloresEmpresa, mensajePedidoCargado, simboloMoneda} from "../constantes/constantesNegocio";
import {useDispatch} from "react-redux";
import {productos,} from "../redux/productosSlice";
import * as React from "react";
import { setModalConfVisible} from "../redux/opcionesAppSlice";
import ButtonGradient from "../elementos/ButtonGradient";
import {addPedido, borrarPedido} from "../redux/pedidoSlice";
import {getFullNameProducto} from "../utils/get_names";

export default function VerPedidoConfigurado({ pedido}) {
    const dispatch = useDispatch();





    function onPressCargar(key) {
        dispatch(borrarPedido())
        for (const producto of pedido["productos"]) {
            dispatch(addPedido({"name": getFullNameProducto(producto), "data": producto}))
        }
        Alert.alert(mensajePedidoCargado)

    }

    //calcula la suma de los precios en conjunto para todos los prodcutos
    function sumaPrecios() {
        var suma = 0
        pedido["productos"].map((key, index) => {
            suma += key.numeroUnidades * key.precio
        })
        if (suma != 0)

            return "Precio total: " + suma + simboloMoneda
        return ""

    }

    if (Object.keys(pedido).length > 0)
        return (
            <View>

                <Modal
                    animationType="slide"

                    transparent={true}
                    visible={pedido!=null}
                    onRequestClose={() => {

                        dispatch(setModalConfVisible(null));
                    }}
                >
                    {/*Empieza el contenido del primer modal que se renderiza cuando hay prodcutos para pedir*/}
                    <View style={[styles_.centeredView, {flex: 1}]}>

                        <View style={styles_.modalView}>

                            {/*Texto de titulo que cambia en funcion de si solo se ve el pedido o se va a enviar*/}
                            <Pressable style={{justifyContent: 'center', marginTop: 10}}
                                       onPress={() => {
                                           dispatch(setModalConfVisible(null));
                                       }}><Text
                                style={{fontSize: 14, position: 'relative', right: '50%'}}><Image
                                resizeMode='contain'
                                style={styles_.imagen}
                                source={require('../../assets/back_arrow.png')}
                            /></Text></Pressable>
                            <View>
                                <Text
                                    style={[styles_.textPedido, {margin: 10}]}>{"Código de pedido: "}{pedido["codigo"]}</Text>
                                <Text
                                    style={[styles_.textPedido]}>{"Fecha del pedido: "}{new Date(pedido["fecha"]).toLocaleDateString("sv-SE")}</Text></View>

                            {/*Lista de productos del pedido*/}
                            <ScrollView  showsVerticalScrollIndicator={false}  style={[{
                                marginTop: 20,

                            }, styles_.ScrollPedido]}>
                                {pedido["productos"].map((key, index) => (
                                    <View key={key.nombre} style={{alignItems: 'center', marginBottom: 20}}>

                                        <Text style={[styles_.textoListaCarrito, {marginTop: 10}]} key={key}>
                                            <Negrita> x{key.numeroUnidades} {key.nombre}  </Negrita> ({key.numeroUnidades*key.precioAnterior}{simboloMoneda})
                                        </Text>


                                    </View>
                                ))}


                            </ScrollView>

                            <Text style={[styles_.textoSumaPrecios, {marginTop: 10}]}> {sumaPrecios()}</Text>

                            <ButtonGradient Press={(key)=>{onPressCargar(key)}} Name="Cargar pedido"
                                            width={'100%'}></ButtonGradient>
                        </View>
                    </View>
                </Modal>
            </View>
        )
    else if (pedido) {

        Alert.alert("Error", "No has seleccionado ningún producto.")
        dispatch(setModalConfVisible(null))

    }
}

const styles_ = StyleSheet.create({
    button: {
        width: '50%',

        margin: 1,
        padding: 2,
        borderRadius: 10,
        flexDirection: 'column',
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderBottomColor: coloresEmpresa[0],
        height: 40


    },
    imagen: {

        width: 30,
        height: 30,
        marginLeft: 'auto',


    },
    imagen_peque: {

        width: 25,
        height: 25,


    },
    centeredView: {

        paddingTop: 20,
        marginTop: 20
    },
    modalView: {


        margin: 10,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 15,
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
        height: '55%',
        backgroundColor: '#fff',
        marginTop: 40,
        marginBottom: 40,


    },
    textoListaCarrito: {

        fontSize: 13
    },
    textPedido: {
        alignItems: 'center',
        fontSize: 16,

        fontWeight: 'bold',
        justifyContent: 'center',
        maringTop: 80,
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