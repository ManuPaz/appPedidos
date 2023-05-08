import * as React from 'react';
import {Image, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import useCargarRestriccionesApp from "../myHooks/useCargarRestriccionesApp";
import { useState} from "react";



export default function PanelConfiguracionPedidos() {
    useCargarRestriccionesApp()

    const preguntas = {
        "question1": "¿Qué es el la opción Guardar  pedido?",
        "question2": "¿Qué es el la opción de Cargar  pedido?",
        "question3": "¿Para que usar Guardar y Cargar Pedido?",
        "question4": "¿Qué hace la opción Borrar pedido?"
    }
    const respuestas = {
        "question1": "Guardar un pedido te permite guardar un pedido antes de enviarlo para seguir con él posteriormente. ",
        "question2": "Cargar un pedido te permite meter todos los productos del pedido que vas a cargar en el pedido que vas a realizar (se eliminan los que ya había). Después de cargarlo puedes seguir añadiendo productos en la pantalla de \"Hacer pedido\"",
        "question3": "Lo puedes usar por ejemplo para guardar un pedido con los productos que siempre pides y cargarlo cada vez que empieces un nuevo pedido. Así tendrás esos productos en él pedido y podrás añadir más, eliminar algun producto o modificar el número de cajas de cada uno, pero no tendrás que añadir todos de nuevo.",
        "question4": "Borrar pedido permite borrar todos los productos del pedido que se está haciendo,siempre antes de haberlo enviado."
    }
    const [activas, setActivas] = useState({
        "question1": false,
        "question2": false, "question3": false, "question4": false, "question5": false,
    })

    function onPress(key) {
        const newDict={"question1": false,
            "question2": false, "question3": false, "question4": false, "question5": false,}
        for (const e of Object.keys(activas)){
            newDict[e]=activas[e]
        }
        newDict[key] = !newDict[key]
        setActivas(newDict)
    }
    return (
        <ScrollView style={[styles_.container, {flex: 1, backgroundColor: '#ffffff',}]}>
            {Object.keys(preguntas).map(key=><TouchableOpacity key={key} onPress={() => {
                onPress(key)
            }} >
                {activas[key] ?
                    <View style={{shadowColor: "#000",shadowOffset: {
                              width: 0,
                              height: 1
                          },shadowOpacity:0.25,shadowRadius: 8.30,
                        elevation: 5,borderWidth:0.2}}>
                <View style={[styles_.containerRow,]}>
                <Text style={styles_.text}>{preguntas[key]}</Text>

                    <Image
                        resizeMode='contain'
                        style={styles_.imagen}
                        source={require('../../assets/desplegable_up.png')}
                    />
                    </View>
                        <Text style={styles_.textRespuesta}>{respuestas[key]}</Text>
                    </View>:

                    <View style={styles_.containerRow}>
                        <Text style={styles_.text}>{preguntas[key]}</Text>

                        <Image
                            resizeMode='contain'
                            style={styles_.imagen}
                            source={require('../../assets/desplegable.png')}
                        />
                    </View>}

            </TouchableOpacity>)}






        </ScrollView>
    )
}
const styles_ = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 10,

    },
    text: {
        fontSize: 14,
        marginLeft: 2,
        fontWeight: "bold",
    },
    textRespuesta: {
        fontSize: 14,
        margin:20,
        textAlign: 'justify'
    },
    containerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 10

    },
    item: {
        padding: 10,
        fontSize: 13,

    }, imagen: {
        width: 12,
        height: 12,
        marginLeft: 'auto'
    },

})