import {
    Alert,
    Image,
    Modal,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View
} from "react-native";
import {modalGuardarVisible, setModalGuardarVisible,} from "../redux/modalSlice";
import {
    BAD_REQUEST, errorDeRed,
    INTERNAL_SERVER_ERROR, maxCaracters, mensajeErrorDemasiadosCaracteres, mensajeErrorServidor,
} from "../constantes/constantesNegocio";
import ButtonGradient from "../elementos/ButtonGradient";
import * as React from "react";
import {getPedidosConfigurados, guardarPedidoConfigurado} from "../services/opcionesApp";
import {setPedidosGuardados} from "../redux/opcionesAppSlice";
import {useDispatch, useSelector} from "react-redux";
import {pedidoActual} from "../redux/pedidoSlice";
import {nombreUsuarioLogueado} from "../redux/loginSlice";
import {useEffect, useState} from "react";


export default function ModalGuardarPedido() {
    const dispatch = useDispatch()
    const pedidoActual_ = useSelector(pedidoActual);
    const nombreUsuarioLogueado_ = useSelector(nombreUsuarioLogueado)
    const modalVisible = useSelector(modalGuardarVisible)
    const [nombre, setNombre] = useState("")

function guardarPedidoHandler() {
    setNombre("")
    dispatch(setModalGuardarVisible(false))
    const array = []
    for (const key of Object.keys(pedidoActual_)) {
        array.push(pedidoActual_[key])
    }
    if (nombre.length < maxCaracters) {
        guardarPedidoConfigurado(array, nombreUsuarioLogueado_, nombre).then((response) => {

            //no se cancela el pedido pero en el frontent si para eliminarlo del frontent
            getPedidosConfigurados(nombreUsuarioLogueado_).then((response) => {
                //no se cancela el pedido pero en el frontent si para eliminarlo del frontent
                dispatch(setPedidosGuardados(response.data))
                dispatch(setModalGuardarVisible(false))
            })
                .catch((error) => {

                })


            Alert.alert("Pedido guardado", "Código de pedido " + response.data)


        })
            .catch((error) => {

                if (error.response.status == BAD_REQUEST)
                    Alert.alert(error.response.data, "")
                else if (error.response.status == INTERNAL_SERVER_ERROR)
                    Alert.alert(mensajeErrorServidor, "")
                else{
                    Alert.alert(errorDeRed)
                }
            })
    } else {
        Alert.alert(mensajeErrorDemasiadosCaracteres)
    }


}

return (
    <View>

        <Modal
            animationType="slide"

            transparent={true}
            visible={modalVisible}
        >
            <View style={[styles_.centeredView, {flex: 1}]}>


                <View style={styles_.modalView}>
                    <Pressable style={{justifyContent: 'center', marginTop: 10}}
                               onPress={() => {
                                   dispatch(setModalGuardarVisible(false));
                                   setNombre("");
                               }}><Text
                        style={{fontSize: 14, position: 'relative', right: '50%'}}><Image
                        resizeMode='contain'
                        style={styles_.imagen}
                        source={require('../../assets/back_arrow.png')}
                    /></Text></Pressable>
                    <View style={{margin: 20, alignItems: 'center', alignContent: 'center'}}>
                        <Text style={styles_.texto}>Introduce un nombre para el pedido</Text>
                        <TextInput onChangeText={(value) => {
                            setNombre(value)
                        }} style={[styles_.textInput, {marginTop: 20}]}
                                   value={nombre}
                        >
                        </TextInput>
                        <ButtonGradient Press={guardarPedidoHandler} Name={'Guardar'}
                                        width={110}></ButtonGradient>
                    </View>
                </View>
            </View>
        </Modal>
    </View>

)

}

const styles_ = StyleSheet.create({
    texto: {
        fontSize: 15,
        margin: 10
    },
    centeredView: {

        paddingTop: 20,
        marginTop: 20
    },
    imagen: {

        width: 30,
        height: 30,
        marginLeft: 'auto',


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
    }, textInput: {
        borderWidth: 1,
        borderColor: 'gray',
        width: 150,
        borderRadius: 5,
        fontSize: 14,
        padding: 5
    }


})
