

import http from "../restConnection/http-common";
import OpcionCliente from "../entities/OpcionCliente";
var sha256 = require('js-sha256');



export function getOpcionesCliente(usuario){

    return http.post<OpcionCliente>("getOpcionesCliente",usuario);

}

export function setOpcionesCliente(opcionesCliente){

    return http.post<OpcionCliente>("setOpcionesCliente", opcionesCliente);

}

export function getFechasPedidos(usuario){

    return http.post<Array<Date>>("getFechasPedidos", usuario);

}

export function getPedidoPorFechas(usuario,fecha){
    const fechaString=fecha["dateString"].toString()
    return http.post<{}>("getPedidoPorFecha", {"usuario":usuario,"fecha":fechaString});

}

export function getPedidoBase(usuario){


    return http.post<{}>("getPedidoBase", usuario);

}

export function guardarPedidoBase(usuario,codigo,seleccionado){


    return http.post<{}>("guardarPedidoBase",{"usuario":usuario,"codigo":codigo,"seleccionado":seleccionado});

}

export function guardarPedidoConfigurado(pedido, usuario,nombre){
    const pedidoCompleto={"productos":pedido,"usuario":usuario,"fecha": new Date(),"nombrePedido":nombre }
    return http.post<String>("guardarPedidoConfigurado",pedidoCompleto);
}

export function getPedidosConfigurados(usuario){
    return http.post<String>("getPedidosConfigurados",usuario);
}

export function getUltimoPedido(usuario){
    return http.post<{}>("getUltimoPedido",usuario);
}
export function getOpcionesGenerales(){

    return http.get<{}>("getRestriccionesGenerales");

}

export function guardarOpcionesGenerales(opcion,value){

    return http.post<{}>("setRestriccionesGenerales",{"nombre":opcion,"valor":value});

}

export function getFranjasHorarias(){

    return http.get<{}>("getFranjasHorarias");

}


export function guardarFranjaHoraria(franja){


    const aux={}
    for (const key of Object.keys(franja)){
        aux[key]=franja[key]
    }
    if (aux["hora_ini"].toString().split(":").length<3){
        aux["hora_ini"]=aux["hora_ini"].toString()+":00"

    }
    if (aux["hora_fin"].toString().split(":").length<3){
        aux["hora_fin"]=aux["hora_fin"].toString()+":00"

    }

    return http.post<{}>("guardarFranjaHoraria",aux);

}

export function borrarFranjaHoraria(franja){
    return http.post<{}>("borrarFranjaHoraria",franja);

}