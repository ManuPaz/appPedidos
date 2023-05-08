import Producto from "../entities/Producto";


export function getFullNameProducto(producto:Producto){

    return producto.familia+"_"+producto.subfamilia+"_"+producto.nombre
}