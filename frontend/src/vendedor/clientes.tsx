
import {
    Alert,
    LogBox,
    Modal,
    StyleSheet,
    Text,
    TextInput,
    View
} from "react-native";

import {
    coloresEmpresa,
    BAD_REQUEST,
    mensajeErrorClienteBadRequest,
    mensajeGuardadoCliente,
} from "../constantes/constantesNegocio";
import {useDispatch, useSelector} from "react-redux";
import {styles} from "../styles/stylesContainers";
import * as React from "react";
import {
    clientes,
    clienteTrabajo,
    setClientes,
    setClienteTrabajo,
    setClienteTrabajoInicial
} from "../redux/vendedorSlice";

import ButtonGradient from "../elementos/ButtonGradient";

import SeleccionClientes from "./seleccionClientes";
import {setModalVisible} from "../redux/modalSlice";
import { findClientes, guardarUsuario} from "../services/loginServive";
import {useEffect} from "react";
import {validateEmail, validatePassword, validateUsername} from "../utils/validacion";
import {
    validacionCorreoError, validacionNombre,
    validacionPasswordError,
    validacionPasswordFormato
} from "../constantes/constantesValidacion";


export default function Clientes({navigation}) {
    const clientes_ = useSelector(clientes)
    const dispatch = useDispatch()
    const clienteTrabajo_ = useSelector(clienteTrabajo)
    const [saveNew, setSaveNew] = React.useState(false);
    const [nombreEditable, ] = React.useState(true);
    const [mailEditable, ] = React.useState(true);
    const [passWordEditable,] = React.useState(true);;
    const [numberOfItemsPerPage, ] = React.useState(4)
    useEffect(() => {
        // Update the document title using the browser API
        const unsuscribe=navigation.addListener("focus",()=>{
            dispatch(setClienteTrabajo(null))

        })
        return unsuscribe;



    },[navigation]);

    function setValue(key, nombre) {

        const aux = {}
        for (const key of Object.keys(clienteTrabajo_))
            aux[key] = clienteTrabajo_[key]
        aux[key] = nombre
        dispatch(setClienteTrabajo(aux))

    }

    function onPressAdd() {
        setSaveNew(true)
        const aux = {"nombreUsuario": "", "correoElectronico": "","tipo":"cliente"}
        dispatch(setClienteTrabajoInicial(aux))
    }

    function cancel() {
        setSaveNew(false)
        dispatch(setClienteTrabajoInicial(null))
    }


    function saveChanges(cliente) {

            guardarUsuario(cliente).then((response)=>{

            if (cliente!=null && response!=null) {


                    dispatch(setClienteTrabajoInicial(null))
                    findClientes().then((response) => {

                        dispatch(setClientes(response.data))
                    })
                        .catch((error) => {

                        })
                    Alert.alert(mensajeGuardadoCliente)

                setSaveNew(false)
            }else{}
        }).catch((error)=>{
            if (error.response.status=BAD_REQUEST)
                Alert.alert(mensajeErrorClienteBadRequest)
        })

    }




    return (
        <View style={[styles_.container,]}>
            <SeleccionClientes numberOfItemsPerPage={4} tipo={"seleccion"}></SeleccionClientes>
            {clienteTrabajo_ == null ?
                <ButtonGradient Press={onPressAdd} Name={"Nuevo cliente"}
                                width={'30%'}></ButtonGradient> :
                <View></View>

            }
            <View>
                {(clienteTrabajo_ != null &&(clientes_.hasOwnProperty( clienteTrabajo_.nombreUsuarioAntiguo)||saveNew)) ?
                    <Modal
                        animationType="slide"

                        transparent={true}
                        visible={true}
                        onRequestClose={() => {

                            dispatch(setModalVisible(false));
                        }}
                    >
                        <View style={[styles_.centeredView, {flex: 1}]}>

                            <View style={styles_.modalView}>
                                <View style={{marginTop: 10}}>
                                    <Text style={styles.text_title}>Edita
                                        cliente: {clienteTrabajo_.nombreUsuarioAntiguo}</Text>
                                    <View style={styles_.conteinerRow}>

                                        <Text style={styles_.textEdit}>Nombre: </Text>
                                        <TextInput onChangeText={(value) => {
                                            setValue("nombreUsuario", value)
                                        }} style={styles_.textInput} value={clienteTrabajo_.nombreUsuario}
                                                   editable={nombreEditable}>
                                        </TextInput>

                                    </View>

                                    <View style={styles_.conteinerRow}>
                                        {/*{mailEditable?
                                            <TouchableOpacity onPress={()=>{setMailEditable(false)}}>
                                                <Image
                                                    resizeMode='contain'
                                                    style={styles_.imagen_peque2}
                                                    source={require('../../assets/done.png')}
                                                />
                                            </TouchableOpacity>:
                                            <TouchableOpacity onPress={()=>{setMailEditable(true)}}>
                                                <Image
                                                    resizeMode='contain'
                                                    style={styles_.imagen_peque}
                                                    source={require('../../assets/editar.png')}
                                                />
                                            </TouchableOpacity>}*/}
                                        <Text style={styles_.textEdit}>Mail: </Text>
                                        <TextInput onChangeText={(value) => {
                                            setValue("correoElectronico", value)
                                        }} style={[styles_.textInput,]} value={clienteTrabajo_.correoElectronico}
                                                   editable={mailEditable}>
                                        </TextInput>

                                    </View>
                                    <View style={styles_.conteinerRow}>

                                        <Text style={styles_.textEdit}>Contraseña: </Text>
                                        <TextInput onChangeText={(value) => {
                                            setValue("password", value)
                                        }} style={styles_.textInput} secureTextEntry={passWordEditable}
                                                   value={clienteTrabajo_.password}
                                                   editable={passWordEditable}>
                                        </TextInput>




                                    </View>
                                    <View style={styles_.conteinerRow}>
                                        <Text style={styles_.textEdit}>{"Repite \ncontraseña"}: </Text>
                                        <TextInput onChangeText={(value) => {
                                            setValue("passwordRepeat", value)
                                        }} style={styles_.textInput} secureTextEntry={true}
                                                   value={clienteTrabajo_.passwordRepeat}
                                                   editable={passWordEditable}>
                                        </TextInput>

                                    </View>
                                    <View style={styles_.conteinerRow}>
                                        <View style={{margin: 4}}>
                                            <ButtonGradient Press={()=>saveChanges(clienteTrabajo_)} Name={"Guardar cambios"}
                                                            width={100}></ButtonGradient>
                                        </View>
                                        <View style={{margin: 4}}>
                                            <ButtonGradient Press={cancel} Name={"Cancelar"}
                                                            width={100}></ButtonGradient>
                                        </View>

                                    </View>

                                </View>
                            </View>
                        </View>
                    </Modal>
                    : <View></View>
                }


            </View>


        </View>)


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

    },
    touch: {marginLeft: 'auto',},
    conteinerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        marginTop: 20,
        fontSize: 22


    },centeredView: {

        paddingTop:20,
        marginTop: 20
    },modalView: {


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
    head: {height: 40, backgroundColor: coloresEmpresa[1]},


})