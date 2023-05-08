import {DataTable, Searchbar} from "react-native-paper";
import {Alert, Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {styles} from "../styles/stylesContainers";
import {
    BAD_REQUEST,
    coloresEmpresa,
    mensajeEliminadoCliente,
    mensajeErrorEliminadoCliente
} from "../constantes/constantesNegocio";
import * as React from "react";
import {searchQuery, setSearchQuery} from "../redux/productosSlice";
import {clientes, clienteTrabajo, franjasHorarias, setClientes, setClienteTrabajoInicial} from "../redux/vendedorSlice";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import useDebounce from "../utils/useDebounce";
import {borrarUsuario, findClientes} from "../services/loginServive";


export default function SeleccionClientes({numberOfItemsPerPage,tipo}){

    const clientes_ = useSelector(clientes)
    const dispatch = useDispatch()
    const clienteTrabajo_ = useSelector(clienteTrabajo)
    const [page, setPage] = React.useState(0);
    const [currentPageData, setCurrentPageData] = React.useState({})
    const numberOfPages = Math.ceil(Object.keys(clientes_).length / numberOfItemsPerPage)
    const searchQuery_ = useSelector(searchQuery)


    const debouncedSearch = useDebounce(searchQuery_, 500);
    useEffect(() => {

        if (debouncedSearch && searchQuery_ != "" && searchQuery_) {
            var regex = new RegExp(".*" + searchQuery_.toUpperCase() + ".*");
            const match = Object.keys(clientes_).sort().find(value => regex.test(value.toUpperCase()));
            if (match) {

                const index = Object.keys(clientes_).sort().indexOf(match)
                const pageAux = Math.floor(index / numberOfItemsPerPage)
                setPage(pageAux)
            }



        }
    }, [debouncedSearch])
    const setCurrentPageDataHandler = () => {

        if (clientes_ != null) {

            const startIndex = page * numberOfItemsPerPage;
            let endIndex = startIndex + numberOfItemsPerPage;
            if (endIndex > Object.keys(clientes_).length) {
                endIndex = Object.keys(clientes_).length;
            }
            if (Object.keys(clientes_).length > 0) {
                const clientesArray = Object.keys(clientes_).sort().slice(startIndex, endIndex)
                const currentPageData = {}
                for (const cliente of clientesArray) {
                    const aux={}

                    for (const key of Object.keys(clientes_[cliente])){
                        aux[key]=clientes_[cliente][key]
                    }
                    currentPageData[cliente] = aux

                }

                setCurrentPageData(currentPageData)

            }else{
                const currentPageData = {}
                setCurrentPageData(currentPageData)
            }
        }else{
            const currentPageData = {}
            setCurrentPageData(currentPageData)
        }
    }
    function eliminarCliente(key) {

        borrarUsuario(clientes_[key] ).then((response)=>{



                dispatch(setClienteTrabajoInicial(null))
                findClientes().then((response) => {

                    if (Object.keys(response.data).length==0) {
                        const aux={}
                        dispatch(setClientes(aux))
                    }
                    else
                        dispatch(setClientes(response.data))
                })
                    .catch((error) => {

                    })
                Alert.alert(mensajeEliminadoCliente)
        }).catch((error)=>{
            if (error.response.status=BAD_REQUEST)
                Alert.alert(mensajeErrorEliminadoCliente)
        })

    }

    useEffect(() => {
        setCurrentPageDataHandler();
    }, [page, clientes_]);
    function onPressCheckBox(key) {
        if (clienteTrabajo_ != null && clienteTrabajo_.nombreUsuario == key)
            dispatch(setClienteTrabajoInicial(null))
        else
            dispatch(setClienteTrabajoInicial(clientes_ [key]))
    }

    const onChangeSearch = query => {

        dispatch(setSearchQuery(query));
    };

    return (

        <View>
            <Searchbar
                placeholder="Buscar cliente"
                onChangeText={onChangeSearch}

                value={searchQuery_}
            />
            <Text style={styles.text_title}>Selecciona cliente</Text>
            <View style={[styles_.container2,]}>
                <DataTable>
                    <DataTable.Header>


                        <DataTable.Title style={{flex: 1}} key={"nombre"}>{"Nombre"}</DataTable.Title>
                        <DataTable.Title style={{flex: 2}} key={"mail"}>{"Mail"}</DataTable.Title>
                        <DataTable.Title style={{flex: 0.5}} key={"select"}>{""}</DataTable.Title>
                        <DataTable.Title style={{flex: 0.5}} key={"delete"}>{""}</DataTable.Title>

                    </DataTable.Header>
                    {
                        Object.keys(currentPageData).map((key) => (
                            <DataTable.Row style={{borderWidth: 0}} key={key}>
                                <DataTable.Cell style={{flex: 1, borderWidth: 0}}
                                                key={key + "_nombre"}><Text style={styles_.textoTabla}>{key}</Text></DataTable.Cell>
                                <DataTable.Cell style={{flex: 2}}
                                                key={key + "_mail"}><Text style={styles_.textoTabla}>{currentPageData[key].correoElectronico}</Text></DataTable.Cell>
                                <DataTable.Cell style={{flex: 0.5}} key={key + "edit"}>
                                    {tipo=="seleccion" ?
                                    <TouchableOpacity key={key} onPress={() => {
                                        onPressCheckBox(key)
                                    }}>
                                        <Image
                                            resizeMode='contain'
                                            style={styles_.imagen_peque}
                                            source={require('../../assets/editar.png')}
                                        />
                                    </TouchableOpacity>:
                                        <View>
                                            {(clienteTrabajo_!=null && clienteTrabajo_.nombreUsuario) != key ?
                                                <TouchableOpacity key={key} onPress={() => {
                                                    onPressCheckBox(key)
                                                }}>
                                                    <Image
                                                        resizeMode='contain'
                                                        style={styles_.imagen_peque2}
                                                        source={require('../../assets/ojos.jpg')}
                                                    />
                                                </TouchableOpacity> :
                                                <TouchableOpacity key={key} onPress={() => {
                                                    onPressCheckBox(key)
                                                }}>
                                                    <Image
                                                        resizeMode='contain'
                                                        style={styles_.imagen_peque}
                                                        source={require('../../assets/desplegable_up.png')}
                                                    />
                                                </TouchableOpacity>

                                            }
                                        </View>}
                                </DataTable.Cell>

                                <DataTable.Cell style={{flex: 0.5}} key={key + "delete"}>
                                    {tipo=="seleccion" ?
                                    <TouchableOpacity key={key} onPress={() => {
                                        eliminarCliente(key)
                                    }}>
                                        <Image
                                            resizeMode='contain'
                                            style={styles_.imagen_peque2}
                                            source={require('../../assets/papelera.jpg')}
                                        />
                                    </TouchableOpacity>:
                                    <View></View>}
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

    },textoTabla:{
        fontSize:11
    },
    touch: {marginLeft: 'auto',},
    conteinerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 30,
        marginRight: 10,
        marginTop: 20,
        fontSize: 22


    },

    imagen_peque: {

        width: 20,
        height: 20,
    }, imagen_peque2: {

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