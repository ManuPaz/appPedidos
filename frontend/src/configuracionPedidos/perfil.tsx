import {useDispatch, useSelector} from "react-redux";
import {usuario,} from "../redux/loginSlice";
import {StyleSheet, View, Text, TextInput, TouchableOpacity, Image, Alert} from "react-native";
import * as React from "react";
import {useEffect, useState} from "react";
import ButtonGradient from "../elementos/ButtonGradient";
import {findClientes, guardarUsuario} from "../services/loginServive";
import {franjasHorarias, opcionesGenerales, setClientes, setClienteTrabajoInicial} from "../redux/vendedorSlice";
import {
    BAD_REQUEST, coloresEmpresa, franjaHorariaGeneralBooleanOpcion,
    mensajeErrorClienteBadRequest,
    mensajeGuardadoCliente,
    mensajePasswordGuardadoCorrectamente
} from "../constantes/constantesNegocio";
import Negrita from "../elementos/Negrita";
import {styles} from "../styles/stylesContainers";
import {DataTable} from "react-native-paper";
import {validatePassword} from "../utils/validacion";
import {validacionPasswordError, validacionPasswordFormato} from "../constantes/constantesValidacion";

export default function Perfil({navigation}) {
    const dispacth = useDispatch()
    const usuario_ = useSelector(usuario)
    const [passwordRepeat, setPasswordRepeat] = useState("")
    const [password, setPassword] = useState("")
    const [passwordEditable, setPasswordEditable] = useState(false)
    const [page, setPage] = React.useState(0);
    const [currentPageData, setCurrentPageData] = React.useState({})
    const franjasHorarias_=useSelector(franjasHorarias)
    const numberOfItemsPerPage=5
    const numberOfPages = Math.ceil(Object.keys(franjasHorarias_).length / numberOfItemsPerPage)
    const opcionesGenerales_ = useSelector(opcionesGenerales)

    function onPrees() {
        setPasswordEditable(true)

    }
    const setCurrentPageDataHandler = () => {

        const franjasHorariasAux={}
        for (const key of Object.keys(franjasHorarias_)){
            if (franjasHorarias_[key].activa){
                franjasHorariasAux[key]=franjasHorarias_[key]
            }
        }

        if (franjasHorariasAux != null) {


            const startIndex = page * numberOfItemsPerPage;
            let endIndex = startIndex + numberOfItemsPerPage;
            if (endIndex > Object.keys(franjasHorarias_).length) {
                endIndex = Object.keys(franjasHorarias_).length;
            }
            if (Object.keys(franjasHorariasAux).length > 0) {
                if (Object.keys(franjasHorariasAux).length > 1)
                    var franjasHorariassArray = Object.keys(franjasHorariasAux).sort().slice(startIndex, endIndex);
                else if (Object.keys(franjasHorariasAux).length == 1)
                    var franjasHorariassArray = [Object.keys(franjasHorariasAux)[0]]
                const currentPageData = {}
                for (const franja of franjasHorariassArray) {
                    const aux = {}
                    for (const key of Object.keys(franjasHorariasAux[franja])) {

                        aux[key] = franjasHorariasAux[franja][key]
                    }
                    currentPageData[franja] = aux
                }
                setCurrentPageData(currentPageData)

            }
            else{
                setCurrentPageData({})
            }
        }
        else{
            setCurrentPageData({})
        }
    }
    useEffect(() => {
        setCurrentPageDataHandler();
    }, [page, franjasHorarias_]);
    useEffect(() => {
        // Update the document title using the browser API
        const unsuscribe = navigation.addListener("focus", () => {
            setPassword("")
            setPasswordRepeat("")
            setPasswordEditable(false)

        })
        return unsuscribe;


    }, [navigation]);

    function cancelar() {
        setPassword("")
        setPasswordRepeat("")
        setPasswordEditable(false)

    }

    function guardar() {
        const usuario = {
            "nombreUsuario": usuario_.nombreUsuario, "passwordRepeat": passwordRepeat,
            "password": password, "correoElectronico": usuario_.correoElectronico, "tipo": usuario_.tipo,
            "nombreUsuarioAntiguo": usuario_.nombreUsuario
        }
        if (validatePassword(password)){
            guardarUsuario(usuario).then((response) => {

            Alert.alert(mensajePasswordGuardadoCorrectamente)
            setPassword("")
            setPasswordRepeat("")
            setPasswordEditable(false)
            }).catch((error) => {
            if (error.response.status = BAD_REQUEST)
                Alert.alert(mensajeErrorClienteBadRequest)})
        }else {
            Alert.alert(validacionPasswordFormato,validacionPasswordError)
        }


    }

    return (
        <View style={{flex: 1, backgroundColor: '#ffffff',}}>
            <Text style={styles_.texto}>Nombre de usuario: <Negrita>{usuario_.nombreUsuario}</Negrita></Text>
            <Text style={styles_.texto}>Correo electrónico: <Negrita>{usuario_.correoElectronico}</Negrita></Text>
            <View style={styles_.conteinerRow}>

                <Text style={styles_.texto}>Contraseña: </Text>
                <TextInput secureTextEntry={true} onChangeText={(value) => {
                    setPassword(value)
                }} style={styles_.textInput}
                           value={password}
                           editable={passwordEditable}>
                </TextInput>
                {passwordEditable ?
                    <View></View>


                    :
                    <TouchableOpacity style={{marginLeft: 10}} onPress={() => {
                        onPrees()
                    }}>
                        <Image
                            resizeMode='contain'
                            style={styles_.imagen_peque}
                            source={require('../../assets/editar.png')}
                        />
                    </TouchableOpacity>
                }


            </View>
            {passwordEditable ?

                <View style={styles_.conteinerRow}>
                    <Text style={styles_.texto}>{"Repite \ncontraseña"}: </Text>
                    <TextInput secureTextEntry={true} onChangeText={(value) => {
                        setPasswordRepeat(value)
                    }} style={styles_.textInput}
                               value={passwordRepeat}
                               editable={passwordEditable}>
                    </TextInput>

                </View> :
                <View></View>
            }
            {passwordEditable ?
                <View style={[styles_.conteinerRow, {alignItems: 'center', justifyContent: 'center'}]}>
                    <TouchableOpacity
                        style={{marginLeft: 10, borderWidth: 1, padding: 2, borderRadius: 5, backgroundColor: 'black'}}
                        onPress={guardar}>
                        <Text style={{color: 'white'}}>Guardar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{marginLeft: 10, borderWidth: 1, padding: 2, borderRadius: 5, backgroundColor: 'black'}}
                        onPress={cancelar}>
                        <Text style={{color: 'white'}}>Cancelar</Text>
                    </TouchableOpacity>
                </View> :
                <View></View>}

            {opcionesGenerales_[franjaHorariaGeneralBooleanOpcion]=="1"?
                <View>
                    <Text style={styles.text_title}>Horas de realización de pedidos</Text>
                    <View style={[styles_.container2,]}>
                        <DataTable>
                            <DataTable.Header
                                style={{alignContent: 'center', alignItems: 'center', justifyContent: 'center'}}>


                                <DataTable.Title style={{flex: 1}} key={"hora_ini"}>{"Hora inicio"}</DataTable.Title>
                                <DataTable.Title style={{flex: 1}} key={"hora_fin"}>{"Hora fin"}</DataTable.Title>
                                <DataTable.Title style={{flex: 1}}
                                                 key={"Dia de la semana"}>{"Día"}</DataTable.Title>


                            </DataTable.Header>
                            {
                                Object.keys(currentPageData).map((key) => (
                                    <DataTable.Row style={{borderWidth: 0}} key={key}>

                                        <DataTable.Cell style={{flex: 1, borderRightWidth: 0., borderLeftWidth: 0}}
                                                        key={key + "_horaini"}>{currentPageData[key]["hora_ini"].split(":")[0] + ":" + currentPageData[key]["hora_ini"].split(":")[1]}</DataTable.Cell>
                                        <DataTable.Cell style={{flex: 1, borderRightWidth: 0., borderLeftWidth: 0.}}
                                                        key={key + "_horafin"}>{currentPageData[key]["hora_fin"].split(":")[0] + ":" + currentPageData[key]["hora_fin"].split(":")[1]}</DataTable.Cell>
                                        <DataTable.Cell style={{flex: 1, borderRightWidth: 0., borderLeftWidth: 0.}}
                                                        key={key + "_dia"}>{currentPageData[key]["dia"]}</DataTable.Cell>



                                    </DataTable.Row>
                                ))
                            }
                            <DataTable.Pagination
                                page={page}
                                numberOfPages={numberOfPages}
                                onPageChange={(page) => setPage(page)}
                                label={`Page ${page + 1} of ${numberOfPages}`}

                            />
                        </DataTable>

                    </View>
                </View> :
                <View></View>}
        </View>

    )


}
const styles_ = StyleSheet.create({
    texto: {
        margin: 20,
        fontSize: 14,

    }, conteinerRow: {
        flexDirection: 'row',
        alignItems: 'center'


    }, textInput: {
        borderWidth: 1,
        borderColor: 'gray',
        width: 100,
        borderRadius: 5,
        fontSize: 14,
    }, imagen_peque: {

        width: 20,
        height: 20,
    }, container2: {

        paddingTop: 1,
        backgroundColor: 'white'
        , alignContent: 'center',


    }

})