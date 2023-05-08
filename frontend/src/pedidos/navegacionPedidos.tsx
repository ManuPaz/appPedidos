import * as React from 'react';

import {View, Text, ScrollView, StyleSheet, TouchableOpacity,} from 'react-native';
import {buscarProductos, getFamiliasProductos, getSubfamilias} from "../services/productosService";
import {useEffect, useState} from "react";

import {useDispatch, useSelector} from "react-redux";
import {
    familiaProductoSeleccionada,
    listaProductosSearch,
    setFamilia,
    setListaProductosSearch,
    searchQuery,
    setSearchQuery, setSubfamilias, subfamiliaActiva
} from "../redux/productosSlice";
import HacerPedidos from './hacerPedidos'
import MenuCarrito from "./menuCarrito";
import {coloresEmpresa} from "../constantes/constantesNegocio";
import {Searchbar} from "react-native-paper";
import useDebounce from "../utils/useDebounce";
import DropDownProductosSearch from "./dropDownProductosSearch";


export default function NavegacionPedidos() {

    const [familias, setFamilias] = useState([]);
    const dispatch = useDispatch();
    const familiaProductoSeleccionada_ = useSelector(familiaProductoSeleccionada);
    const listaProductosSearch_ = useSelector(listaProductosSearch);
    const searchQuery_ = useSelector(searchQuery)
    const subfamiliaActiva_=useSelector(subfamiliaActiva)
    const onChangeSearch = query => {

        dispatch(setSearchQuery(query));
    };

    const debouncedSearch = useDebounce(searchQuery_, 500);
    const fetchData = React.useCallback(() => {

        getFamiliasProductos().then((response) => {

            (setFamilias(response.data))

            onPress(response.data[0]);
        })
            .catch((error) => {

            })
    }, [])
    useEffect(() => {

        if (debouncedSearch && searchQuery_ != "") {

            buscarProductos(searchQuery_).then((response) =>
                dispatch(setListaProductosSearch({"data": response.data}))
            )
        } else if (searchQuery_ == "") {
            dispatch(setListaProductosSearch({"data": []}))
        }


    }, [debouncedSearch])

    useEffect(() => {

        fetchData();

    }, [fetchData])

    function onPress(id) {
        dispatch((setFamilia(id)));
        getSubfamilias(id).then((response) => {

            dispatch(setSubfamilias({"familia": id, "data": response.data}))


        })
            .catch((error) => {

            })

    }

    if (familias.length > 0) {
        return (
            <View style={styles.ContainerPrincipal}>

                <View style={{flex: 0.2}}>

                    <ScrollView    horizontal={true} showsHorizontalScrollIndicator={false} style={styles.ScrollView}>

                        {familias.sort().map(item => (


                            <TouchableOpacity activeOpacity={1}
                                              style={[item == familiaProductoSeleccionada_ ? styles.ScrollContainerSelected : styles.ScrollContainer]}
                                              key={item} onPress={() => onPress(item)}>
                                <Text style={styles.buttonTitleStyle}>{item.toUpperCase()}</Text>
                            </TouchableOpacity>


                        ))}


                    </ScrollView>
                    <Searchbar
                        placeholder="Buscar"
                        onChangeText={onChangeSearch}

                        value={searchQuery_}
                    />
                </View>
                {subfamiliaActiva_==""?
                <ScrollView style={{flex: 0.8}}>
                    {listaProductosSearch_.length > 0 ?
                        <DropDownProductosSearch listaProductos={listaProductosSearch_}></DropDownProductosSearch> :
                        <HacerPedidos></HacerPedidos>


                    }</ScrollView>:
                    <View style={{flex: 0.8}}>
                        {listaProductosSearch_.length > 0 ?
                            <DropDownProductosSearch listaProductos={listaProductosSearch_}></DropDownProductosSearch> :
                            <HacerPedidos></HacerPedidos>


                        }</View>

                    }


                <MenuCarrito></MenuCarrito>


            </View>


        );
    }
}
const styles = StyleSheet.create({
    ContainerPrincipal: {flex: 1, backgroundColor: '#ffffff'},
    ScrollView: {backgroundColor: 'white'},

    MainContainer: {
        backgroundColor: coloresEmpresa[0],
        justifyContent: 'center',
        alignItems: 'center'

    },
    buttonTitleStyle: {
        color: 'black',
        fontWeight: 'normal',
        fontSize: 15
    },
    ScrollContainer: {
        backgroundColor: 'white',
        margin: 0,

        color: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        fontWeight: 'bold',
        marginLeft: 10,
        marginRight: 10,

    },
    ScrollContainerSelected: {
        backgroundColor: 'white',
        margin: 0,
        marginLeft: 10,
        marginRight: 10,
        borderBottomWidth: 3,
        borderBottomColor: coloresEmpresa[1],
        color: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        fontWeight: 'bold'
    },
    ScrollTextContainer: {

        color: '#fff',
        textAlign: 'center'
    },

});
