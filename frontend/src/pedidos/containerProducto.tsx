import Producto from "../entities/Producto";
import {View, Text, StyleSheet, ScrollView, Button, TouchableOpacity,Image} from "react-native";
import NumericInput from 'react-native-numeric-input'
import { styles,} from "../styles/stylesContainers";
import {nombreUnidadesTrabajo} from "../constantes/constantesNegocio"
import {useState} from "react";
import {useSelector,useDispatch} from "react-redux";

import {productos, ref} from "../redux/productosSlice";
import Negrita from "../elementos/Negrita";
import * as React from "react";
import {imagePath} from "../constantes/constantesNegocio";
import NumericInputProductos from "./numericInputProductos";

export default function containerProducto({producto}){
    const productos_=useSelector(productos)
    if (productos_.hasOwnProperty(producto)) {
        return (<View key={producto} style={styles_.Container}>

            <View ><Text style={{fontSize:17}}> <Negrita>{productos_[producto].nombre}</Negrita></Text><Text> ({productos_[producto].unidadesPorCaja} ud/caja) </Text></View>
            <View style={styles.conteinerRowGlobalNoMarginTop}>
                <Text style={styles_.textoPequeno}></Text>

            </View>
            <Image
                resizeMode='contain'
                style={styles_.imagen}
                source={(imagePath[producto])}

            />

            <View key={"vista2"} style={styles.conteinerRowGlobal}>

                <Text style={styles_.TextoExplicativo}>Número de {nombreUnidadesTrabajo}:</Text>

                <View key={"vista1"} style={styles_.Contador}>
                    <NumericInputProductos producto={producto} width={130} height={30} editable={true}></NumericInputProductos>




                </View>
            </View>


        </View>)
    }else{
        return (
            <Text>Cargando ...</Text>
        )
    }

}
const styles_=StyleSheet.create({


    Container:{
        borderColor: 'black',

        width: '90%',
        margin:20,
        padding:10,
        backgroundColor: 'white',
        borderRadius: 20,
        alignItems:'center'


    },textoPequeno:{
      color:'grey',
      fontSize:13,
        marginTop:1,

    },

    Contador:{
      position:'relative',
        left:'60%'

    },
    TextoExplicativo:{
      color:'grey',
      fontSize:15,
        margin:1
    },
    ButtonAdd:{
        position: "relative",
        padding: 2,
        width: '20%',
        borderRadius: 50,
        alignItems: 'center',



    },
    ImageAdd:{
        width:'100%',
        height:'100%',

        flex: 1,

    },
    imagen: {
        flex: 1,
        width: 180,
        height: 150,



    },

})