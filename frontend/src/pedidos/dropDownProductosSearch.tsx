import {TouchableOpacity, View, Text, SafeAreaView, FlatList} from "react-native";
import {useEffect, useState} from "react";
import Negrita from "../elementos/Negrita";
import * as React from "react";
import {Keyboard} from 'react-native'
import {getProductosPorSubFamilia, getSubfamilias} from "../services/productosService";
import {
    familiaProductoSeleccionada,
    familias,
    setSearchQuery,
    setFamilia, setListaProductosSearch, setProductos,
    setSubfamilias,
    subfamiliasShow,
    setNombreProductoBuscado,
    ref,
    setRef
} from "../redux/productosSlice";
import {useDispatch, useSelector} from "react-redux";


export default function DropDownProductosSearch({listaProductos}) {
    const familiaProductoSeleccionada_ = useSelector(familiaProductoSeleccionada);
    const familias_ = useSelector(familias)
    const dispatch = useDispatch();
    const ref_ = useSelector(ref)


    function onPress(item) {
        Keyboard.dismiss();

        dispatch(setSearchQuery(""))
        dispatch(setListaProductosSearch({"data": []}))
        dispatch(setFamilia(""))
        getSubfamilias(item.familia).then((response1) => {
            getProductosPorSubFamilia(item.familia, item.subfamilia).then((response) => {

                dispatch(setNombreProductoBuscado({"data": response.data,"nombre":item.nombre,"subfamilias":response1.data}))


            })
                .catch((error) => {

                })


        })


    }



    const Item = ({item,}) => (
        <TouchableOpacity onPress={() => onPress(item)}>
            <Text style={{
                margin: 10,
                padding: 10,
                backgroundColor: '#F0F2F2',
            }}><Negrita>{item.nombre}</Negrita>{" (" + item.familia + ", " + item.subfamilia + ")"}</Text>
        </TouchableOpacity>
    );


    const [selectedId, setSelectedId] = useState(null);

    const renderItem = ({item}) => {
        return (
            <Item
                item={item}
            />
        );
    };

    return (
        <SafeAreaView>
            <FlatList
                data={listaProductos}
                renderItem={renderItem}
                keyExtractor={(item) => item.familia + "_" + item.subfamilia + "_" + item.nombre}
            />
        </SafeAreaView>
    );


}