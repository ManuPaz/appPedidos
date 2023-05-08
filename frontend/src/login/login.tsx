import {StatusBar} from 'expo-status-bar';
import {Alert, StyleSheet, Text, TextInput, View} from 'react-native';
import LogoJelfimar from "../elementos/LogoJelfimar";
import ButtonGradient from "../elementos/ButtonGradient";
import {login} from "../services/loginServive";
import {useEffect, useState} from "react";
import {loginToApp, nombreUsuarioLogueado, usuario} from "../redux/loginSlice"
import {useDispatch, useSelector} from "react-redux";
import Navegacion from "../pedidos/navegacion";
import * as React from "react";
import {
    tipoUsuarioVendedor,
    tipoUsuarioCliente,
    badLogin
} from "../constantes/constantesNegocio"
import NavegacionVendedor from "../vendedor/navegacionVendedor";

export default function Login() {
    const [nombreUsuarioForm, setNombreUsuarioForm,] = useState("");
    const [paswordForm, setPasswordForm,] = useState("");
    const dispatch = useDispatch();


    function onPress() {

        const user = {nombreUsuario: nombreUsuarioForm, password: paswordForm, correoElectronico: null}

        login(user).then((response) => {
            if (response.data["nombreUsuario"]==null)
                Alert.alert( badLogin)

            dispatch(loginToApp(response.data))

        })
            .catch((error) => {


            })
    }


    const nombreUsuario = useSelector(nombreUsuarioLogueado);
    const usuario_=useSelector(usuario)

    useEffect(() => {

        setNombreUsuarioForm("");
        setPasswordForm("");

    }, [nombreUsuario]);
    if (nombreUsuario == null || usuario_==null) {
        return (

            <View style={stylesLocales.containerPrincipalGlobal}>

                <LogoJelfimar></LogoJelfimar>
                <Text style={stylesLocales.subtitulo}>Log in </Text>
                <TextInput placeholder={"Nombre de usuario"} style={stylesLocales.textInput}
                           onChangeText={setNombreUsuarioForm}></TextInput>
                <TextInput secureTextEntry={true} placeholder={"Contraseña"} onChangeText={setPasswordForm}
                           style={stylesLocales.textInput}></TextInput>
                <ButtonGradient Press={onPress} Name={"LOG IN"} width={90}></ButtonGradient>

            </View>


        )
    } else if(usuario_.tipo==tipoUsuarioCliente) {
        return (
            <Navegacion></Navegacion>

        )

    }else if(usuario_.tipo==tipoUsuarioVendedor) {
        return (
            <NavegacionVendedor></NavegacionVendedor>

        )

    }
}
const stylesLocales = StyleSheet.create({
    containerPrincipalGlobal: {
        flex: 1,
        backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'center'
    }, containerSecundarioGlobal: {
        flex: 0.1,
        width: '100%',
        backgroundColor: "#99c343",
        position: 'relative',
        bottom: '20%'
    },
    subtitulo: {
        fontSize: 20,
        color: 'grey',
        marginTop: '1%'
    },
    textInput: {
        borderWidth: 1,
        borderColor: 'gray',
        padding: 10,
        width: '80%',
        marginTop: '5%',
        borderRadius: 30
    }


})