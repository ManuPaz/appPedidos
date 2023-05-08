let {describe,test,expect}=global
import ContainerProducto from "../src/pedidos/containerProducto"
import {guardarPedidoConfigurado} from "../src/services/opcionesApp"

describe('pr20', () => {
    test('cp01', () => {
        const pedido =  [{"familia":"la lechera","subfamilia":"Toppings","nombre":"Aerosol Nata Montada","unidadesPorCaja":10,"precio":20,"numeroUnidades":2},
            {"familia":"cocina de nestle","subfamilia":"Platos y tapas","nombre":"Alitas de pollo a la barbacoa","unidadesPorCaja":10,"precio":20,"numeroUnidades":2},
            {"familia":"la lechera","subfamilia":"Graneles especial heladerías","nombre":"Avellana 2,4L.","unidadesPorCaja":10,"precio":20,"numeroUnidades":2},
            {"familia":"la lechera","subfamilia":"Graneles especial heladerías","nombre":"Amarena 2,035L.","unidadesPorCaja":10,"precio":20,"numeroUnidades":2}
        ]


        return (guardarPedidoConfigurado(pedido,"","nombre")).then(data => {
            expect(data.data).toEqual(expect.any(Number))
        });

    });
    test('cp02', () => {
        const pedido =  []
        // Test code goes here
        return (guardarPedidoConfigurado(pedido,"","nombre")).then(data => {

        }).catch(error=>{ expect(error.response.status).toEqual(400)});

    });
});