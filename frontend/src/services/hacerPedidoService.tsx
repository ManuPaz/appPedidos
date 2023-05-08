
import http from "../restConnection/http-common";
import Producto from "../entities/Producto";
export function hacerPedidoService(pedido, usuario){
    const pedidoCompleto={"productos":pedido,"usuario":usuario,"fecha": new Date() }
    return http.post<String>("hacerPedido",pedidoCompleto);
}

export function borrarPedidoService(pedido){
    return http.post<String>("borrarPedidoConfigurado",pedido);
}