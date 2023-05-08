import http from "../restConnection/http-common";
import {Alert} from "react-native";
import {mensajeErrorCampoErroneo, mensajeErrorPasswordsNoCoincide} from "../constantes/constantesNegocio";
import {validateEmail, validatePassword, validateUsername} from "../utils/validacion";
import {
    validacionCorreoError, validacionNombre,
    validacionPasswordError,
    validacionPasswordFormato
} from "../constantes/constantesValidacion";

var sha256 = require('js-sha256');

export function login(user) {
    user.password = sha256(user.password);
    return http.post<{}>("login", user);

}

export function findClientes() {

    return http.get<{}>("getClientes");

}

export function guardarUsuario(usuario) {

    var seguir = true
    if (validateEmail(usuario.correoElectronico) == false && seguir) {
        Alert.alert(validacionCorreoError)
        seguir = false
    }
    if (validatePassword(usuario.password) == false && seguir) {
        Alert.alert(validacionPasswordFormato,validacionPasswordError)
        seguir = false
    }
    if (validateUsername(usuario.nombreUsuario) == false && seguir) {
        Alert.alert(validacionNombre)
        seguir = false
    }
    if (usuario["password"] != usuario["passwordRepeat"]) {
        Alert.alert(mensajeErrorCampoErroneo, mensajeErrorPasswordsNoCoincide)
        seguir = false
    }

    if (seguir) {
        const aux = {}
        for (const key of Object.keys(usuario))
            aux[key] = usuario[key]
            aux["password"] = sha256(usuario["password"]);
            return http.post<{}>("guardarUsuario", aux);

    }else{
        return Promise.resolve(null)
    }

}

export function borrarUsuario(usuario) {
    const aux = {}
    for (const key of Object.keys(usuario))
        aux[key] = usuario[key]
    return http.post<{}>("borrarUsuario", aux);


}
