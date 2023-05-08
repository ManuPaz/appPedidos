import {Image, StyleSheet, TouchableOpacity} from "react-native";
import * as React from "react";
import {coloresEmpresa} from "../constantes/constantesNegocio";

export default function IconEdit(){
    return (
        <TouchableOpacity  style={{marginLeft:'auto'}} key={"hora_fin"} >
            <Image
                resizeMode='contain'
                style={[styles_.imagen_peque,{marginLeft:'auto'}]}
                source={require('../../assets/editar.png')}
            />
        </TouchableOpacity>

    )


}
const styles_ = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 10,
        backgroundColor: 'white',

    }, wrapper: {flexDirection: 'row'},
    container2: {

        paddingTop: 1,
        backgroundColor: 'white'
        , alignContent: 'center',


    }, centeredView: {

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

    touch: {marginLeft: 'auto',},
    conteinerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 30,
        marginRight: 20,
        marginTop: 20,
        fontSize: 22


    },

    imagen_peque: {

        width: 20,
        height: 20,
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
    text: {fontSize: 12, textAlign: 'center', justifyContent: 'center'},
    textGrande: {fontSize: 16, textAlign: 'center', justifyContent: 'center', margin: 10},
    head: {height: 40, backgroundColor: coloresEmpresa[1]},

    imagen_peque2: {

        width: 30,
        height: 30,
    },


})