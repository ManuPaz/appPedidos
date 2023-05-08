import NumericInput from "react-native-numeric-input";
import * as React from "react";
import {useSelector,useDispatch} from "react-redux";
import {pedidoActual,addPedido,deleteProductoFromPedido,} from "../redux/pedidoSlice";
import {productos} from  "../redux/productosSlice";
import {setModalVisible} from "../redux/modalSlice";
import Producto from "../entities/Producto";
import {Alert} from "react-native";
import {mensajeErrorMaximoCajas} from "../constantes/constantesNegocio";


export default function NumericInputProductos({producto,width,height,editable}){
    const dispatch=useDispatch()
    const pedidoActual_=useSelector(pedidoActual);
    const productos_=useSelector(productos)
    function onChangeNumericForm(value){
        if(value>0 && value<=1000){
            var producto_object:Producto={ nombre: productos_[producto]["nombre"],
                familia: productos_[producto]["familia"],
                subfamilia: productos_[producto]["subfamilia"],
                precio: productos_[producto]["precio"],
                unidadesPorCaja: productos_[producto]["unidadesPorCaja"],
                numeroUnidades:value,}
            producto_object.numeroUnidades=value
            dispatch(addPedido({"name":producto, "data": producto_object}))
        }
        else if (value==0){

            if (pedidoActual_.hasOwnProperty(producto) ){
                if(Object.keys(pedidoActual_).length==1)
                    dispatch(setModalVisible(false));
                dispatch(deleteProductoFromPedido({"name":producto}))


            }
        }else if (value>1000){
            var producto_object:Producto={ nombre: productos_[producto]["nombre"],
                familia: productos_[producto]["familia"],
                subfamilia: productos_[producto]["subfamilia"],
                precio: productos_[producto]["precio"],
                unidadesPorCaja: productos_[producto]["unidadesPorCaja"],
                numeroUnidades:0,}
            producto_object.numeroUnidades=0
            dispatch(addPedido({"name":producto, "data": producto_object}))
            if(Object.keys(pedidoActual_).length==1)
                dispatch(setModalVisible(false));
            dispatch(deleteProductoFromPedido({"name":producto}))
            Alert.alert(mensajeErrorMaximoCajas)
        }

    }

    return ( <NumericInput totalWidth={width}
                           totalHeight={height}
                           rounded
                           editable={editable}
                           initValue={pedidoActual_.hasOwnProperty(producto) ? pedidoActual_[producto].numeroUnidades : 0}
                           value={pedidoActual_.hasOwnProperty(producto) ? pedidoActual_[producto].numeroUnidades : 0}
                           onChange={onChangeNumericForm}/>)
}