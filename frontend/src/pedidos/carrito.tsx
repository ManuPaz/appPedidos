import {Image, Modal, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View,Alert} from "react-native";
import Negrita from "../elementos/Negrita";
import {
    BAD_REQUEST,
    coloresEmpresa, dictWeekdays, errorDeRed, franjaHorariaGeneralBooleanOpcion,
    INTERNAL_SERVER_ERROR, mensajeErrorFranjasHorarias, mensajeErrorGuardarPedido,
    mensajeErrorPeticionPedido, mensajeErrorServidor,
    simboloMoneda
} from "../constantes/constantesNegocio";
import ButtonGradient from "../elementos/ButtonGradient";
import {
    borrarPedido, deleteProductoFromPedido,
    pedidoActual, setMarketDates,
} from "../redux/pedidoSlice";
import {styles} from "../styles/stylesContainers";
import {setModalVisible, modalVisible, setModalGuardarVisible} from "../redux/modalSlice";
import {useDispatch, useSelector} from "react-redux";
import {nombreUsuarioLogueado} from "../redux/loginSlice";
import {hacerPedidoService} from "../services/hacerPedidoService";
import * as React from "react";
import NumericInputProductos from "./numericInputProductos";
import {getFechasPedidos, getPedidosConfigurados, guardarPedidoConfigurado} from "../services/opcionesApp";
import {opcionesGeneralesCliente, setPedidosGuardados} from "../redux/opcionesAppSlice";
import {useState} from "react";
import ModalGuardarPedido from "./modalGuardarPedido";
import {franjasHorarias, opcionesGenerales} from "../redux/vendedorSlice";

export default function Carrito() {
    const dispatch = useDispatch();

    const modalVisible_ = useSelector(modalVisible);
    //conjunto de productos con sus cantidades que integran el pedido
    const pedidoActual_ = useSelector(pedidoActual);
    const nombreUsuarioLogueado_=useSelector(nombreUsuarioLogueado)
    const franjasHorarias_=useSelector(franjasHorarias)
    const opcionesGenerales_=useSelector(opcionesGenerales)
    function checkFranjasHorarias(){
            var guardar=true
            const fecha=new Date()
            const dayOfWeekName = fecha.toLocaleString(
                'default', {weekday: 'long'}
            );
            if (opcionesGenerales_[franjaHorariaGeneralBooleanOpcion]=="1"){
                guardar=false

                for(const  key of Object.keys(franjasHorarias_)){
                    const  franja=franjasHorarias_[key]
                    if(franja.dia=="todos" || franja.dia==dayOfWeekName){
                        var hora_ini = new Date(fecha.toLocaleDateString("sv-SE") +" "+ franja.hora_ini);
                        var hora_fin = new Date(fecha.toLocaleDateString("sv-SE")  +" "+ franja.hora_fin);
                        if (franja.activa && fecha.getTime()<hora_fin.getTime() && fecha.getTime()>hora_ini.getTime()){
                            guardar=true
                            break
                        }

                    }

                }

            }
            if (!guardar){
                Alert.alert(mensajeErrorFranjasHorarias)
                return false
            }
            return true

    }


    //maneja el envio del pedido
    function finalizarPedidoHandler() {
        dispatch(setModalVisible(false));
        const array = []
        for (const key of Object.keys(pedidoActual_)) {
            array.push(pedidoActual_[key])
        }
        const hacerPedido = checkFranjasHorarias()
        if (hacerPedido){
            hacerPedidoService(array, nombreUsuarioLogueado_).then((response) => {
                //no se cancela el pedido pero en el frontent si para eliminarlo del frontent


                dispatch(borrarPedido())

                Alert.alert("Pedido enviado", "Código de pedido " + response.data)

                getFechasPedidos(nombreUsuarioLogueado_).then((response) => {


                    dispatch(setMarketDates(response.data))


                })
                    .catch((error) => {

                    })


            })
                .catch((error) => {
                    Alert.alert(errorDeRed)
                    dispatch(setModalVisible(false));

                })
    }


    }

    function onPressGuardar(){
        if (Object.keys(pedidoActual_).length>0)
            dispatch(setModalGuardarVisible(true))
        else{
            Alert.alert(mensajeErrorGuardarPedido)
        }

    }
    //calcula la sema del precio para cada prodcuto
    function sumaprecio(key) {
        return pedidoActual_[key].numeroUnidades * pedidoActual_[key].precio
    }

    //calcula la suma de los precios en conjunto para todos los prodcutos
    function sumaPrecios() {
        var suma = 0
        Object.keys(pedidoActual_).map((key) => {
            suma += pedidoActual_[key].numeroUnidades * pedidoActual_[key].precio
        })
        if (suma != 0)

            return "Precio total: " + suma + simboloMoneda
        return ""

    }
    function onPressDelete(item){
        if (Object.keys(pedidoActual_).length==1)
            dispatch(setModalVisible(false));
        dispatch(deleteProductoFromPedido({"name":item}))
    }
    if(Object.keys(pedidoActual_).length > 0 )
    return (
        <View>

            <Modal
                animationType="slide"

                transparent={true}
                visible={modalVisible_}
                onRequestClose={() => {

                    dispatch(setModalVisible(false));
                }}
            >
                {/*Empieza el contenido del primer modal que se renderiza cuando hay prodcutos para pedir*/}
                <View style={[styles_.centeredView, {flex: 1}]}>

                    <View style={styles_.modalView}>

                        {/*Texto de titulo que cambia en funcion de si solo se ve el pedido o se va a enviar*/}
                        <Pressable style={{justifyContent:'center',marginTop:10}}
                                   onPress={() => {
                                       dispatch(setModalVisible(false));
                                   }}><Text
                            style={{fontSize: 14,position:'relative',right:'50%'}}><Image
                            resizeMode='contain'
                            style={styles_.imagen}
                            source={require('../../assets/back_arrow.png')}
                        /></Text></Pressable>
                        <View >
                        <Text
                            style={[styles_.textPedido]}>{"Este es tu pedido:"}</Text></View>

                        {/*Lista de productos del pedido*/}
                        <ScrollView showsVerticalScrollIndicator={false} style={[styles_.ScrollPedido,]}>
                            {Object.keys(pedidoActual_).map((key) => (
                                <View  key={key} style={{alignItems:'center',marginBottom:20}}>


                                <Text style={[styles_.textoListaCarrito,]} >
                                    <Negrita> x{pedidoActual_[key].numeroUnidades} {key.split("_")[2].substring(0,40)}</Negrita> ({pedidoActual_[key].numeroUnidades*pedidoActual_[key].precio}{simboloMoneda})</Text>
                                    <View  style={styles.conteinerRowGlobal}>
                                <View ><NumericInputProductos producto={key} width={140} height={30} editable={false}></NumericInputProductos></View>
                                        <TouchableOpacity style={{marginLeft:30}} onPress={()=>{onPressDelete(key)}}>
                                            <Image
                                                resizeMode='contain'
                                                style={styles_.imagen_peque}
                                                source={require('../../assets/papelera.jpg')}
                                            />
                                        </TouchableOpacity>
                                </View>
                                </View>
                            ))}


                        </ScrollView>

                        <Text style={[styles_.textoSumaPrecios,{marginTop:10}]}> {sumaPrecios()}</Text>

                                <View style={[styles_.conteinerRow,{marginTop: 10,marginBottom:50,alignItems:'center',justifyContent:'center'}]}>
                                    <View style={{marginRight:40}}>
                                    <ButtonGradient Press={finalizarPedidoHandler} Name="Enviar pedido"
                                                    width={'100%'}></ButtonGradient>
                                    </View>
                                    <View>
                                    <ButtonGradient Press={onPressGuardar} Name="Guardar pedido"
                                                    width={'100%'}></ButtonGradient>
                                    </View>



                            </View>
                    </View>
                </View>
                <ModalGuardarPedido ></ModalGuardarPedido>
            </Modal>


        </View>
    )
    else if(modalVisible_){

        Alert.alert("No has seleccionado ningún producto","")
        dispatch(setModalVisible(false))

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

        paddingTop:20,
        marginTop: 20
    },
    modalView: {


        margin: 10,
        backgroundColor: "white",
        borderRadius: 20,
        padding:   15,
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
        height:'65%',
        backgroundColor: '#fff',
        marginTop: 40,
        marginBottom: 40,



    }, conteinerRow:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'center',
        margin:20

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