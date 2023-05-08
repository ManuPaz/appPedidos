import http from "../restConnection/http-common";
import Producto from "../entities/Producto";
var sha256 = require('js-sha256');

export  function getProductosPorSubFamilia(familia,subfamilia){

    return http.post<Array<Producto>>("getProductosSubfamilia",{"familia":familia,"subfamilia":subfamilia});

}
export function getSubfamilias(familia){

    return http.post<Array<string>>("getSubfamilias",{"familia":familia});

}
export function getFamiliasProductos(){

    return http.get<Array<string>>("getFamilias",);

}

export function buscarProductos(nombre){
    return http.post<Array<string>>("buscarProductos",nombre);

}