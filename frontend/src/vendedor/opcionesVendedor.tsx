import {StyleSheet, View, Text, TouchableOpacity,} from "react-native";
import {
    coloresEmpresa,
    franjaHorariaGeneralBooleanOpcion, franjasHorariasString, opcionesGlobalesVendedorString, productosSinStockBoolean,
} from "../constantes/constantesNegocio";
import {Checkbox} from 'react-native-paper'
import {
    setModalConfVisible,
    ultimoPedido
} from "../redux/opcionesAppSlice";
import {useDispatch, useSelector} from "react-redux";

import {guardarOpcionesGenerales} from "../services/opcionesApp";
import {styles} from "../styles/stylesContainers";
import * as React from "react";
import {
    opcionesGenerales,
    setClienteTrabajo,
    setFranjaHorarioTrabajo,
    setOpcionesGenerales
} from "../redux/vendedorSlice";
import SeleccionFranjas from "./seleccionFranjas";
import {useEffect, useState} from "react";

export default function OpcionesGlobalesVendedor({navigation}) {
    const dispatch = useDispatch();

    const [esVisibleConfiguracion, setEsVisibleConfiguracion] = useState(opcionesGlobalesVendedorString)

    function opcionesGlobalesHandler() {
        setEsVisibleConfiguracion(opcionesGlobalesVendedorString)
    }

    function historicoPedidosHandler() {
        setEsVisibleConfiguracion(franjasHorariasString)

    }

    useEffect(() => {
        // Update the document title using the browser API
        const unsuscribe = navigation.addListener("focus", () => {
            dispatch(setFranjaHorarioTrabajo(null))

        })
        return unsuscribe;


    }, [navigation]);
    const opcionesGenerales_ = useSelector(opcionesGenerales)

    function onPress(opcion) {
        guardarOpcionesGenerales(opcion, !(opcionesGenerales_[opcion] == "1")).then((response) => {
            dispatch(setOpcionesGenerales(response.data))


        })
            .catch((error) => {

            })
    }

    return (
        <View style={[styles_.container,]}>
            {esVisibleConfiguracion == opcionesGlobalesVendedorString ?
                <View style={{flex: 0.9}}>
                    <Text style={styles.text_title}>Opciones generales</Text>
                    <View style={styles_.conteinerRowLeft}>
                        <View style={{borderWidth:1,marginRight:10}}>
                            <Checkbox
                                status={opcionesGenerales_[franjaHorariaGeneralBooleanOpcion] == "1" ? 'checked' : 'unchecked'}

                                color={coloresEmpresa[1]}
                                onPress={() => {
                                    onPress(franjaHorariaGeneralBooleanOpcion)
                                }}
                            />
                        </View>
                        <Text style={{fontSize: 14}}>Limitar horas de pedidos con franjas horarias</Text>

                    </View>
                    <View style={styles_.conteinerRowLeft}>
                        <View style={{borderWidth:1,marginRight:10}}>
                            <Checkbox
                                status={opcionesGenerales_[productosSinStockBoolean] == "1" ? 'checked' : 'unchecked'}
                                color={coloresEmpresa[1]}
                                onPress={() => {
                                    onPress(productosSinStockBoolean)
                                }}
                            />
                        </View>
                        <Text style={{fontSize: 14}}>Permitir productos sin stock en los pedidos</Text>

                    </View>
                    <View>
                    </View>
                </View> :

                <View style={{flex: 0.9}}>
                    <SeleccionFranjas numberOfItemsPerPage={4}></SeleccionFranjas>
                </View>

            }
            <View style={styles_.conteinerRow}>
                <TouchableOpacity style={styles_.button} onPress={opcionesGlobalesHandler}><Text
                    style={styles_.texto2}>{"Opciones generales"}</Text></TouchableOpacity>
                <TouchableOpacity onPress={historicoPedidosHandler} style={styles_.button}><Text
                    style={styles_.texto2}>{"Franjas Horarias"}</Text></TouchableOpacity>


            </View>


        </View>


    );
}

const styles_ = StyleSheet.create({
    button: {
        width: 110,
        margin: 10,
        marginBottom: 2,
        paddingBottom: 2,
        borderRadius: 10,
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderBottomColor: coloresEmpresa[0],


    },
    container: {
        flex: 1,
        paddingTop: 10,
        backgroundColor: 'white',

    }, wrapper: {flexDirection: 'row'},
    container2: {

        paddingTop: 1,
        backgroundColor: 'white'
        , alignContent: 'center',

    },
    touch: {marginLeft: 'auto',},
    conteinerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        marginTop: 20,
        fontSize: 22


    },conteinerRowLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
        fontSize: 22,
        marginLeft:10


    }
    , centeredView: {

        paddingTop: 20,
        marginTop: 20
    }, modalView: {


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

    imagen_peque: {

        width: 20,
        height: 20,
    },
    imagen_peque2: {

        width: 30,
        height: 30,
    },
    textEdit: {fontSize: 15},
    textInput: {
        borderWidth: 1,
        borderColor: 'gray',
        padding: 2,
        width: 170,
        borderRadius: 25,
        fontSize: 14,
        marginLeft: 'auto'
    },
    text: {margin: 10, fontSize: 12, textAlign: 'center', justifyContent: 'center'},
    texto2: {
        alignItems: 'center',
        fontSize: 14,
        fontWeight: 'bold',
        justifyContent: 'center',
        padding: 2,
        textAlign: 'center',
        color: coloresEmpresa[0]
    },
    head: {height: 40, backgroundColor: coloresEmpresa[1]},


})