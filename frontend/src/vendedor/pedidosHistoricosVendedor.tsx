import {Calendar, } from 'react-native-calendars';
import { StyleSheet, Text,  View} from "react-native";
import {
    coloresEmpresa,
} from "../constantes/constantesNegocio";
import * as React from "react";
import {getFechasPedidos, getPedidoPorFechas} from "../services/opcionesApp";
import {
    setPedidosHistoricos,
    fechaActual, setModalConfVisible, modalConfVisible
} from "../redux/opcionesAppSlice";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import VerPedidoConfigurado from "../configuracionPedidos/verPedidoConfigurado";
import {styles} from "../styles/stylesContainers";
import {market_dates, setMarketDates} from "../redux/pedidoSlice";

export default function PedidosHistoricosVendedor({nombreUsuario}) {
    const dispatch = useDispatch()
    const market_dates_=useSelector(market_dates)



    const modalConfVisible_ = useSelector(modalConfVisible)

    function onPressHandler(fecha) {

        getPedidoPorFechas(nombreUsuario, fecha).then((response) => {
            dispatch(setPedidosHistoricos({"fecha": fecha["dateString"], "data": response.data}))
            dispatch(setModalConfVisible(response.data[Object.keys(response.data)[0]]))


        })
    }





    return (
        <View style={[styles.container,]}>
            <Text style={styles.text_title}>Pedidos anteriores</Text>
            <View >
                <Calendar
                    markingType='custom'
                    markedDates={ market_dates_}
                    theme={{
                        calendarBackground:    'white',

                        selectedDayBackgroundColor: '#C0D6DF',
                        selectedDayTextColor: '#166088',
                        selectedDotColor: '#166088',

                        dayTextColor: coloresEmpresa[0],
                        textDayFontSize: 13,
                        textDisabledColor: '#E1E3E5',
                        dotColor: '#DBE9EE',
                        textDayFontWeight:'bold',
                        monthTextColor: coloresEmpresa[0],
                        textMonthFontWeight: 'bold',

                        arrowColor: coloresEmpresa[0],
                    }}
                    onDayPress={(day) => {
                        onPressHandler(day)
                    }}
                />

            </View>
            <View>
                {(modalConfVisible_ != null) ?
            <VerPedidoConfigurado pedido={modalConfVisible_}></VerPedidoConfigurado> :
                            <View></View>}



            </View>

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