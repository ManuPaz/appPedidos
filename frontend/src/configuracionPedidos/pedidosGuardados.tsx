import {Alert, Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import { mensajePedidoCargado
} from "../constantes/constantesNegocio";
import {useDispatch, useSelector} from "react-redux";
import {
    modalConfVisible,
    pedidoGuardadoEnTrabajo,
    pedidosGuardados, setModalConfVisible,
    setPedidosGuardados
} from "../redux/opcionesAppSlice";
import {styles} from "../styles/stylesContainers";
import Negrita from "../elementos/Negrita";
import * as React from "react";
import VerEditarPedido from "./verEditarPedido";
import ButtonGradient from "../elementos/ButtonGradient";
import {borrarPedidoService} from "../services/hacerPedidoService";
import {DataTable} from "react-native-paper";
import {useEffect} from "react";
import {addPedido, borrarPedido} from "../redux/pedidoSlice";
import {getFullNameProducto} from "../utils/get_names";

export default function PedidosGuardados() {
    const pedidosGuardados_ = useSelector(pedidosGuardados)
    const dispatch = useDispatch()
    const numberOfItemsPerPage = 5;
    const pedidoGuardadoEnTrabajo_ = useSelector(pedidoGuardadoEnTrabajo)
    const [page, setPage] = React.useState(0);
    const [currentPageData, setCurrentPageData] = React.useState({})
    const numberOfPages = Math.ceil(Object.keys(pedidosGuardados_).length / numberOfItemsPerPage)
    const modalConfVisible_=useSelector(modalConfVisible)
    const setCurrentPageDataHandler = () => {

        if (pedidosGuardados_ != null) {

            const startIndex = page * numberOfItemsPerPage;
            let endIndex = startIndex + numberOfItemsPerPage;
            if (endIndex > Object.keys(pedidosGuardados_).length) {
                endIndex = Object.keys(pedidosGuardados_).length;
            }
            if (Object.keys(pedidosGuardados_).length > 0) {
                const clientesArray = Object.keys(pedidosGuardados_).sort().slice(startIndex, endIndex)
                const currentPageData = {}
                for (const cliente of clientesArray) {
                    const aux = {}

                    for (const key of Object.keys(pedidosGuardados_[cliente])) {
                        aux[key] = pedidosGuardados_[cliente][key]
                    }
                    currentPageData[cliente] = aux

                }

                setCurrentPageData(currentPageData)

            }
            else{
                setCurrentPageData({})
            }
        }
    }

    useEffect(() => {
        setCurrentPageDataHandler();
    }, [page, pedidosGuardados_]);

    function onPressDelete(key) {
        borrarPedidoService(pedidosGuardados_[key]).then((response) => {
            //no se cancela el pedido pero en el frontent si para eliminarlo del frontent
            dispatch(setPedidosGuardados(response.data))
        })
            .catch((error) => {

            })

    }

    function onPressCargar(key) {
        dispatch(borrarPedido())
        for (const producto of pedidosGuardados_[key]["productos"]) {
            dispatch(addPedido({"name": getFullNameProducto(producto), "data": producto}))
        }
        Alert.alert(mensajePedidoCargado)

    }

    function onPressVer(key) {
        dispatch(setModalConfVisible( pedidosGuardados_[key]))
    }

    return (
        <View style={[styles_.container,]}>
            <Text style={styles.text_title}>Mis pedidos guardados</Text>


                    <DataTable>
                        <DataTable.Header>


                            <DataTable.Title style={{flex: 2}} key={"nombre"}>{"Nombre"}</DataTable.Title>
                            <DataTable.Title style={{flex: 0.5}} key={"view"}>{""}</DataTable.Title>
                            <DataTable.Title style={{flex: 1}} key={"edit"}>{""}</DataTable.Title>
                            <DataTable.Title style={{flex: 0.5}} key={"delete"}>{""}</DataTable.Title>

                        </DataTable.Header>
                        {
                            Object.keys(currentPageData).map((key) => (
                                <DataTable.Row style={{borderWidth: 0,justifyContent:'center',marginTop:3}} key={key}>
                                    <DataTable.Cell style={{flex: 2, borderWidth: 0}}
                                                    key={key + "_nombre"}><Text key={"texto"} style={styles_.texto}>
                                        <Negrita>{currentPageData[key].nombrePedido}</Negrita></Text></DataTable.Cell>
                                    <DataTable.Cell style={{flex: 1}}
                                                    key={key + "_mail"}> <TouchableOpacity key={"ojos"}
                                                                                           onPress={() => {
                                                                                               onPressVer(key)
                                                                                           }}>
                                        <Image
                                            resizeMode='contain'
                                            style={styles_.imagen_grande}
                                            source={require('../../assets/ojos.jpg')}
                                        />
                                    </TouchableOpacity></DataTable.Cell>
                                    <DataTable.Cell style={{flex: 1}} key={key + "edit"}>
                                        <View key={"view"} >
                                            <ButtonGradient Press={() => {
                                                onPressCargar(key)
                                            }} Name="Cargar pedido"
                                                            width={'100%'}></ButtonGradient>

                                        </View>

                                    </DataTable.Cell>

                                    <DataTable.Cell>
                                        <TouchableOpacity key={"papelera"} onPress={() => {
                                            onPressDelete(key)
                                        }}>
                                            <Image
                                                resizeMode='contain'
                                                style={styles_.imagen_peque}
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
            <VerEditarPedido pedido={modalConfVisible_} ></VerEditarPedido>





        </View>)


}


const styles_ = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 10,

    },
    item: {
        padding: 10,
        fontSize: 13,
    }, imagen_grande: {

        width: 50,
        height: 50,
    },

    imagen_peque: {

        width: 50,
        height: 30,
    }, conteinerRow: {
        flexDirection: 'row',
        margin: 15,
        alignItems: 'center'

    }, texto: {
        fontSize: 11,
        marginLeft: 15,
    }


})