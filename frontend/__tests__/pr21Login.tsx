let {describe,test,expect}=global
import ContainerProducto from "../src/pedidos/containerProducto"
import {login} from "../src/services/loginServive"

describe('pr21', () => {
    test('cp01', () => {
        const usuario= {nombreUsuario:"A", password: "", correoElectronico:""}


        return (login(usuario).then(data => {
            expect(data.data.nombreUsuario).toBeNull()
        }));

    });
    test('cp02', () => {
        const usuario= {nombreUsuario:"", password: "", correoElectronico:""}


        return (login(usuario).then(data => {
            expect(data.data.nombreUsuario).not.toBeNull()
        }));

    });
});