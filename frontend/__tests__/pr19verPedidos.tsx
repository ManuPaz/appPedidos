import {getPedidoPorFechas} from "../src/services/opcionesApp";

let {describe,test,expect}=global
import {guardarUsuario} from "../src/services/loginServive";

describe('pr19', () => {
    test('cp01', () => {
        const  usuario=""
        const  fecha={"dateString":'2022-12-08'}
        return (getPedidoPorFechas(usuario,fecha)).then(data => {

            expect(Object.keys(data.data).length).toBe(0)
        });


    })
    test('cp02', () => {
        const  usuario=""
        const  fecha={"dateString":"2022-12-07"}
        return (getPedidoPorFechas(usuario,fecha)).then(data => {

            expect(Object.keys(data.data).length).toBe(1)
        });


    })
})