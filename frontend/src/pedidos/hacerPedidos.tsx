import {ScrollView, Text, TouchableOpacity, View, StyleSheet, Image} from "react-native";
import * as React from "react";
import {useDispatch, useSelector} from "react-redux";
import {
    familiaProductoSeleccionada,
    setProductos,
    productos,
    setSubfamilias,
    familias,
    subfamiliasShow,
    nombreProductoBuscado, setNombreProductoBuscado, subfamiliaActiva,
} from "../redux/productosSlice";
import {useEffect, useState} from "react";
import {getProductosPorSubFamilia, getSubfamilias} from "../services/productosService";
import ContainerProducto from "../pedidos/containerProducto"


export default function HacerPedidos() {
    const [ref_,setRef]=useState(null);
    //const dataSourceCords_=useSelector(dataSourceCords)
    const [dataSourceCords,setDataSourceCords]=useState({})
    const nombreProductoBuscado_ = useSelector(nombreProductoBuscado)
    const dispatch = useDispatch();
    const familias_ = useSelector(familias);
    const subfamiliasShow_ = useSelector(subfamiliasShow)
    const familiaProductoSeleccionada_ = useSelector(familiaProductoSeleccionada);
    const [render,reRender]=useState(false)
    function setX(){
        if (nombreProductoBuscado_ != ""){

            if(dataSourceCords.hasOwnProperty(nombreProductoBuscado_)  && subfamiliasShow_.hasOwnProperty(familiaProductoSeleccionada_) && subfamiliasShow_[familiaProductoSeleccionada_].length == 1) {

                const full_name = familiaProductoSeleccionada_ + "_" + subfamiliasShow_[familiaProductoSeleccionada_][0] + "_" + nombreProductoBuscado_
                const prods = familias_[familiaProductoSeleccionada_][subfamiliasShow_[familiaProductoSeleccionada_][0]]["productos"]
                if (prods.hasOwnProperty(full_name) && ref_ != null) {
                    scrollHandler(familiaProductoSeleccionada_, subfamiliasShow_[familiaProductoSeleccionada_][0], nombreProductoBuscado_)
                    setNombreProductoBuscado("")

                }else{
                    reRender(false)
                }
            }else{
                reRender(false)
            }

        }


    }
    useEffect(() => {
        setX();
        return function (){setX()}


    },[render,nombreProductoBuscado_,])

    function scrollHandler(familia, subfamilia, producto) {


        const y=dataSourceCords[producto]
        {

            ref_.scrollTo({
                x: 0,
                y: y,
                animated: true
            })

        }

    }

    const handlePressSubFamilia = (subfamilia) => {

        getProductosPorSubFamilia(familiaProductoSeleccionada_, subfamilia).then((response) => {
            dispatch(setProductos({"data": response.data}))


        })
            .catch((error) => {

            })
    }




    if (familias_.hasOwnProperty(familiaProductoSeleccionada_) && Object.keys(familias_[familiaProductoSeleccionada_]).length > 0) {
        if (subfamiliasShow_[familiaProductoSeleccionada_].length>1) {
            return (<View style={{flex: 0.8}}>{subfamiliasShow_[familiaProductoSeleccionada_].map(
                item => <View key={item}>
                    <TouchableOpacity
                        style={[styles_.tituloView, familias_[familiaProductoSeleccionada_][item]["activa"] ? styles_.activa : styles_.inactiva]}
                        onPress={() => handlePressSubFamilia(item)}>
                        <View style={[styles_.imagenContainer]}><Text style={styles_.titulo} key={item}>{item}</Text>
                            <View style={[styles_.figure]}>
                                {familias_[familiaProductoSeleccionada_][item]["activa"] ?
                                    <Image
                                        resizeMode='contain'
                                        style={styles_.imagen}
                                        source={require('../../assets/desplegable_up.png')}
                                    /> :
                                    <Image
                                        resizeMode='contain'
                                        style={styles_.imagen}
                                        source={require('../../assets/desplegable.png')}
                                    />}
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
            )}

            </View>)
        }
        else{

                return (<View style={{flex: 0.8}}><View key={subfamiliasShow_[familiaProductoSeleccionada_][0]}>
                        <TouchableOpacity
                            style={[styles_.tituloView, familias_[familiaProductoSeleccionada_][subfamiliasShow_[familiaProductoSeleccionada_][0]]["activa"] ? styles_.activa : styles_.inactiva]}
                            onPress={() => handlePressSubFamilia(subfamiliasShow_[familiaProductoSeleccionada_][0])}>
                            <View style={[styles_.imagenContainer]}><Text style={styles_.titulo} key={subfamiliasShow_[familiaProductoSeleccionada_][0]}>{subfamiliasShow_[familiaProductoSeleccionada_][0]}</Text>
                                <View style={[styles_.figure]}>
                                    {familias_[familiaProductoSeleccionada_][subfamiliasShow_[familiaProductoSeleccionada_][0]]["activa"] ?
                                        <Image
                                            resizeMode='contain'
                                            style={styles_.imagen}
                                            source={require('../../assets/desplegable_up.png')}
                                        /> :
                                        <Image
                                            resizeMode='contain'
                                            style={styles_.imagen}
                                            source={require('../../assets/desplegable.png')}
                                        />}
                                </View>
                            </View>
                        </TouchableOpacity>

                        <ScrollView showsVerticalScrollIndicator={false} ref={(ref) => {

                            (setRef(ref));

                        }}>
                            {familias_[familiaProductoSeleccionada_][subfamiliasShow_[familiaProductoSeleccionada_][0]]["activa"] ?
                                <View>
                                    {Object.keys(familias_[familiaProductoSeleccionada_][subfamiliasShow_[familiaProductoSeleccionada_][0]]["productos"]).sort().map((item,i) =>
                                        <View key={item} onLayout={(event) => {
                                            const layout = event.nativeEvent.layout;
                                            dataSourceCords[item.split("_")[2]] = layout.y;
                                            setDataSourceCords(dataSourceCords);
                                            if (nombreProductoBuscado_!="" && item.split("_")[2]==nombreProductoBuscado_){
                                                reRender(true)
                                            }


                                        }}>
                                            <ContainerProducto key={item}
                                                               producto={item}></ContainerProducto></View>)}</View> :
                                <View></View>}</ScrollView>
                    </View>


                </View>)
            }
    } else {
        return (<View style={styles_.texto}><Text style={styles_.texto}></Text></View>)
    }
}

const styles_ = StyleSheet.create({
    texto: {
        fontSize: 18,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    },
    tituloView: {

        borderColor: 'black',

        width: '90%',
        borderTopColor: 'black',
        borderBottomColor: 'black',
        margin: 2,
        padding: 10,


    },
    activa: {},
    inactiva: {},
    titulo: {
        fontSize: 17,

    },
    imagen: {
        flex: 1,
        width: 15,
        height: 15,
        marginLeft: 'auto',


    },
    imagenContainer: {
        flexDirection: 'row',
        marginTop: '5%',

    },
    figure: {
        marginLeft: 'auto',

    }

})