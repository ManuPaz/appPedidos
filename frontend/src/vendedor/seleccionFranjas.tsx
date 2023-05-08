import {DataTable, Searchbar} from "react-native-paper";
import {Alert, Image, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import {styles} from "../styles/stylesContainers";
import {Checkbox} from "react-native-paper";
import DatePicker from 'react-native-modern-datepicker';
import SelectDropdown from 'react-native-select-dropdown';
import {
    BAD_REQUEST,
    coloresEmpresa,
    franjaHorariaGeneralOpcion,
    mensajeEliminadoFranjaHoraria,
    mensajeErrorCampoErroneo,
    mensajeErrorEliminadoFranjaHoraria,
    mensajeGuardadoFranjaHoraria,
    productosSinStockBoolean,
    weekdays
} from "../constantes/constantesNegocio";
import * as React from "react";
import {
    franjaHorarioTrabajo,
    franjasHorarias, opcionesGenerales, searchQueryFranjas, setFranjaHorarioTrabajo, setFranjasHorarias, setOpcionesGenerales, setSearchQueryFranjas
} from "../redux/vendedorSlice";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import useDebounce from "../utils/useDebounce";
import ButtonGradient from "../elementos/ButtonGradient";
import {borrarFranjaHoraria, guardarFranjaHoraria, guardarOpcionesGenerales} from "../services/opcionesApp";


export default function SeleccionFranjas({numberOfItemsPerPage}) {

    const franjasHorarias_ = useSelector(franjasHorarias)
    const franjaHorarioTrabajo_ = useSelector(franjaHorarioTrabajo)
    const opcionesGenerales_ = useSelector(opcionesGenerales)
    const [esModalTimeVisble, setModalTimeVisible] = useState(false);
    const [horaIniEditable, setHoraIniEditable] = React.useState(false);
    const [horaFinEditable, setHoraFinEditable] = React.useState(true);
    const [diaEditable, setDiaEditable] = React.useState(true);
    const [campoTrabajo, setCampoTrabajo] = React.useState(null);
    const dispatch = useDispatch()
    const [saveNew, setSaveNew] = React.useState(false);
    const [page, setPage] = React.useState(0);
    const [currentPageData, setCurrentPageData] = React.useState({})
    const numberOfPages = Math.ceil(Object.keys(franjasHorarias_).length / numberOfItemsPerPage)
    const searchQueryFranjas_ = useSelector(searchQueryFranjas)


    const debouncedSearch = useDebounce(searchQueryFranjas_, 500);
    useEffect(() => {

        if (debouncedSearch && searchQueryFranjas_ != "" && searchQueryFranjas_) {
            var regex = new RegExp(".*" + searchQueryFranjas_.toUpperCase() + ".*");
            const match = Object.keys(franjasHorarias_).sort().find(value => regex.test(value.toUpperCase()));
            if (match) {

                const index = Object.keys(franjasHorarias_).sort().indexOf(match)
                const pageAux = Math.floor(index / numberOfItemsPerPage)
                setPage(pageAux)
            }


        }
    }, [debouncedSearch])
    const setCurrentPageDataHandler = () => {

        if (franjasHorarias_ != null) {


            const startIndex = page * numberOfItemsPerPage;
            let endIndex = startIndex + numberOfItemsPerPage;
            if (endIndex > Object.keys(franjasHorarias_).length) {
                endIndex = Object.keys(franjasHorarias_).length;
            }
            if (Object.keys(franjasHorarias_).length > 0) {
                if (Object.keys(franjasHorarias_).length > 1)
                    var franjasHorariassArray = Object.keys(franjasHorarias_).sort().slice(startIndex, endIndex);
                else if (Object.keys(franjasHorarias_).length == 1)
                    var franjasHorariassArray = [Object.keys(franjasHorarias_)[0]]
                const currentPageData = {}
                for (const franja of franjasHorariassArray) {
                    const aux = {}
                    for (const key of Object.keys(franjasHorarias_[franja])) {

                        aux[key] = franjasHorarias_[franja][key]
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

    function setValue(key, nombre) {

        const aux = {}
        for (const key of Object.keys(franjaHorarioTrabajo_))
            aux[key] = franjaHorarioTrabajo_[key]
        aux[key] = nombre
        dispatch(setFranjaHorarioTrabajo(aux))

    }

    function onPressAdd() {
        setSaveNew(true)
        const aux = {"hora_ini": "00:00", "hora_fin": "23:59", "dia": "todos"}
        dispatch(setFranjaHorarioTrabajo(aux))
    }

    function cancel() {
        setSaveNew(false)
        dispatch(setFranjaHorarioTrabajo(null))
    }


    function saveChanges() {
        guardarFranjaHoraria(franjaHorarioTrabajo_).then((response) => {
            if (franjaHorarioTrabajo_ != null) {
                dispatch(setFranjaHorarioTrabajo(null))
                Alert.alert(mensajeGuardadoFranjaHoraria)
                dispatch(setFranjasHorarias(response.data))
            }
            setSaveNew(false)
        }).catch((error) => {
            if (error.response.status = BAD_REQUEST)
                Alert.alert(mensajeErrorCampoErroneo)
        })


    }

    function eliminarFranjaHoraria(key) {
        borrarFranjaHoraria(franjasHorarias_[key]).then((response) => {

            dispatch(setFranjaHorarioTrabajo(null))

            dispatch(setFranjasHorarias(response.data))
            Alert.alert(mensajeEliminadoFranjaHoraria)
            setModalTimeVisible(false)
            setSaveNew(false)
        }).catch((error) => {
            if (error.response.status = BAD_REQUEST)
                Alert.alert(mensajeErrorEliminadoFranjaHoraria)
        })

    }

    function seleccionarFranjaHoraria(key) {
        const aux={}
        for (const elem of Object.keys(franjasHorarias_[key]))
            aux[elem]=franjasHorarias_[key][elem]
        aux["activa"]=  !aux["activa"]

        guardarFranjaHoraria(aux).then((response) => {
                dispatch(setFranjasHorarias(response.data))

        }).catch((error) => {
            if (error.response.status = BAD_REQUEST)
                Alert.alert(mensajeErrorCampoErroneo)
        })

    }

    useEffect(() => {
        setCurrentPageDataHandler();
    }, [page, franjasHorarias_]);



    function onEdit(key) {
        dispatch(setFranjaHorarioTrabajo(franjasHorarias_[key]))
    }

    function onSelect(selectedTime){
        const aux={}
        for (const key of Object.keys(franjaHorarioTrabajo_))
            aux[key]=franjaHorarioTrabajo_[key]
        aux[campoTrabajo]=selectedTime
        dispatch(setFranjaHorarioTrabajo(aux))
        setCampoTrabajo(null)
        setModalTimeVisible(false)
    }
    function onSelectDia(dia){
        const aux={}
        for (const key of Object.keys(franjaHorarioTrabajo_))
            aux[key]=franjaHorarioTrabajo_[key]
        aux["dia"]=dia
        dispatch(setFranjaHorarioTrabajo(aux))
        setCampoTrabajo(null)
        setModalTimeVisible(false)
    }

    const onChangeSearch = query => {

        dispatch(setSearchQueryFranjas(query));
    };

    return (

        <View>
            <Text style={styles.text_title}>Selecciona franja horaria</Text>
            <View style={[styles_.container2,]}>
                <DataTable>
                    <DataTable.Header style={{alignContent: 'center', alignItems: 'center', justifyContent: 'center'}}>


                        <DataTable.Title style={{flex: 1}} key={"hora_ini"}>{"Start"}</DataTable.Title>
                        <DataTable.Title style={{flex: 1}} key={"hora_fin"}>{"End"}</DataTable.Title>
                        <DataTable.Title style={{flex: 1}} key={"Dia de la semana"}>{"WeekDay"}</DataTable.Title>
                        <DataTable.Title style={{flex: 1}} key={"seleccionar"}>{""}</DataTable.Title>
                        <DataTable.Title style={{flex: 0.5}} key={"eliminar"}>{""}</DataTable.Title>
                        <DataTable.Title style={{flex: 0.5}} key={"editar"}>{""}</DataTable.Title>


                    </DataTable.Header>
                    {
                        Object.keys(currentPageData).map((key) => (
                            <DataTable.Row style={{borderWidth: 0}} key={key}>

                                <DataTable.Cell style={{flex: 1, borderRightWidth: 0., borderLeftWidth: 0}}
                                                key={key + "_horaini"}>{currentPageData[key]["hora_ini"].split(":")[0]+":"+currentPageData[key]["hora_ini"].split(":")[1]}</DataTable.Cell>
                                <DataTable.Cell style={{flex: 1, borderRightWidth: 0., borderLeftWidth: 0.}}
                                                key={key + "_horafin"}>{currentPageData[key]["hora_fin"].split(":")[0]+":"+currentPageData[key]["hora_fin"].split(":")[1]}</DataTable.Cell>
                                <DataTable.Cell style={{flex: 1, borderRightWidth: 0., borderLeftWidth: 0.}}
                                                key={key + "_dia"}>{currentPageData[key]["dia"]}</DataTable.Cell>
                                <DataTable.Cell style={{flex: 1, borderRightWidth: 0., borderLeftWidth: 0.}}
                                                key={key + "select"}>
                                    <View style={{borderWidth:1,justifyContent:'center',alignItems:'center'}}>
                                    <Checkbox
                                        status={currentPageData[key]["activa"] ? 'checked' : 'unchecked'}
                                        color={coloresEmpresa[1]}
                                        onPress={() => {
                                            seleccionarFranjaHoraria(key)
                                        }}
                                    /></View>

                                </DataTable.Cell>
                                <DataTable.Cell style={{flex: 0.5}} key={key + "edit"}>
                                    <TouchableOpacity key={key} onPress={() => {
                                        onEdit(key)
                                    }}>
                                        <Image
                                            resizeMode='contain'
                                            style={styles_.imagen_peque}
                                            source={require('../../assets/editar.png')}
                                        />
                                    </TouchableOpacity>
                                </DataTable.Cell>
                                <DataTable.Cell style={{flex: 0.5}} key={key + "delete"}>
                                    <TouchableOpacity key={key} onPress={() => {
                                        eliminarFranjaHoraria(key)
                                    }}>
                                        <Image
                                            resizeMode='contain'
                                            style={styles_.imagen_peque2}
                                            source={require('../../assets/papelera.jpg')}
                                        />
                                    </TouchableOpacity>
                                </DataTable.Cell>


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
            {franjaHorarioTrabajo_ == null ?
                <ButtonGradient Press={onPressAdd} Name={"Nueva franja horaria"}
                                width={'30%'}></ButtonGradient> :
                <View></View>

            }
            <View>
                {(franjaHorarioTrabajo_ != null  && (franjasHorarias_.hasOwnProperty(franjaHorarioTrabajo_.codigo) || saveNew)) ?
                    <View>
                        <View style={styles_.conteinerRow}>

                            <Text style={styles_.textGrande}>Hora de inicio: </Text>
                            <TouchableOpacity style={{marginLeft:'auto'}} key={"hora_ini"} onPress={() => {
                                setCampoTrabajo("hora_ini")
                                setModalTimeVisible(true)

                            }}>
                                <Text style={styles_.textGrande}>{franjaHorarioTrabajo_["hora_ini"].split(":")[0]+":"+franjaHorarioTrabajo_["hora_ini"].split(":")[1]}</Text>
                            </TouchableOpacity>





                        </View>
                        <View style={styles_.conteinerRow}>

                            <Text style={styles_.textGrande}>Hora de fin: </Text>
                            <TouchableOpacity  style={{marginLeft:'auto'}} key={"hora_fin"} onPress={() => {
                                setCampoTrabajo("hora_fin")
                                setModalTimeVisible(true)

                            }}>
                                <Text style={styles_.textGrande}>{franjaHorarioTrabajo_["hora_fin"].split(":")[0]+":"+franjaHorarioTrabajo_["hora_fin"].split(":")[1]}</Text>
                            </TouchableOpacity>



                        </View>
                        <View style={styles_.conteinerRow}>

                            <Text style={styles_.textGrande}>Dia de la semana: </Text>
                            <SelectDropdown
                                data={weekdays}
                                buttonStyle={{backgroundColor:'white'}}
                                onSelect={(selectedItem, index) => {
                                    onSelectDia(selectedItem)
                                }}

                                dropdownStyle={{borderRadius:20,borderWidth:0,}}
                                defaultValue={franjaHorarioTrabajo_.dia}
                                buttonTextAfterSelection={(selectedItem, index) => {
                                    // text represented after item is selected
                                    // if data array is an array of objects then return selectedItem.property to render after item is selected
                                    return selectedItem
                                }}
                                rowTextForSelection={(item, index) => {
                                    // text represented for each item in dropdown
                                    // if data array is an array of objects then return item.property to represent item in dropdown
                                    return item
                                }}

                            />

                        </View>


                        <View style={styles_.conteinerRow}>
                            <View style={{margin: 4}}>
                                <ButtonGradient Press={saveChanges} Name={"Guardar cambios"}
                                                width={100}></ButtonGradient>
                            </View>
                            <View style={{margin: 4}}>
                                <ButtonGradient Press={cancel} Name={"Cancelar"}
                                                width={100}></ButtonGradient>
                            </View>


                        </View>
                        {campoTrabajo!=null ?
                        <Modal
                            animationType="slide"

                            transparent={true}
                            visible={esModalTimeVisble}
                            onRequestClose={() => {

                            (setModalTimeVisible(false));
                            }}
                        >

                            <View style={[styles_.centeredView, {flex: 1}]}>

                                <View style={styles_.modalView}>
                                    {campoTrabajo!="dia" ?
                                    <DatePicker
                                        mode="time"
                                        minuteInterval={3}
                                        onTimeChange={selectedTime => onSelect(selectedTime)}

                                        options={{
                                            backgroundColor: 'white',
                                            textHeaderColor: coloresEmpresa[0],
                                            textDefaultColor: coloresEmpresa[0],
                                            selectedTextColor: 'black',
                                            mainColor: coloresEmpresa[1],
                                            textSecondaryColor: coloresEmpresa[1],
                                            borderColor: 'rgba(122, 146, 165, 0.1)',
                                            fontSize: 12
                                        }}
                                        style={{height: '10%', flex: 0.3,}}

                                    />:
                                        <View>


                                        </View>}
                                </View>
                            </View>

                        </Modal>:
                            <View>
                            </View>}


                    </View> :

                    <View>
                    </View>}

            </View>
        </View>

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
        justifyContent: 'center',
        marginLeft: 30,
        marginRight: 50,
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