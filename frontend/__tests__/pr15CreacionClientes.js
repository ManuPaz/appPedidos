let {describe,test,expect}=global
import {guardarUsuario} from "../src/services/loginServive";

const loginServive=require("../src/services/loginServive")
describe('pr15', () => {
    test('cp01', () => {
        const usuario={"nombreUsuario":"1234567801","password":"j2J%aaaaa","passwordRepeat":"j2J%aaaaa","correoElectronico":"manuelpazpintor@gmail.com"}
        // Test code goes here
       return (guardarUsuario(usuario)).then(data => {
           expect(data).toBe(null);
       });

    });

    test('cp02', () => {
        const usuario={"nombreUsuario":"ma:nuel1","password":"j2J%aaaaa","passwordRepeat":"j2J%aaaaa","correoElectronico":"manuelpazpintor@gmail.com"}
        // Test code goes here
        return (guardarUsuario(usuario)).then(data => {
            expect(data).toBe(null)
        });

    });

    test('cp03', () => {
        const usuario={"nombreUsuario":"manuel_","password":"j2J%aaaaa","passwordRepeat":"j2J%aaaaa","correoElectronico":"manuelpazpintor@gmail.com"}
        // Test code goes here
        return (guardarUsuario(usuario)).then(data => {
            expect(Object.keys(data).length).toBeGreaterThan(0);
        });

    });
    test('cp04', () => {
        const usuario={"nombreUsuario":"manuel_","password":"j2J%aaaaa","passwordRepeat":"j2j%aaaaa","correoElectronico":"manuelpazpintor@gmail.com"}
        // Test code goes here
        return (guardarUsuario(usuario)).then(data => {
            expect(data).toBe(null)
        });

    });
    test('cp05', () => {
        const usuario={"nombreUsuario":"manuel1234512345aaaa","password":"j2J%aaaaa","passwordRepeat":"j2j%aaaaa","correoElectronico":"manuelpazpintor@gmail.com"}
        // Test code goes here
        return (guardarUsuario(usuario)).then(data => {
            expect(data).toBe(null)
        });

    });
    test('cp06', () => {
        const usuario={"nombreUsuario":" manuel1234512345","password":"j2J%aaaaa112345678901","passwordRepeat":"j2j%aaaaa","correoElectronico":"manuelpazpintor@gmail.com"}
        // Test code goes here
        return (guardarUsuario(usuario)).then(data => {
            expect(data).toBe(null)
        });

    });
});