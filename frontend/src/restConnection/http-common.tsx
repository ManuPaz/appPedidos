import {decode, encode} from 'base-64';
if (!global.btoa) {
    global.btoa = encode;
}

if (!global.atob) {
    global.atob = decode;
}
import axios from "axios";
import {properties} from "../properties";
//clean code: propiedades de archivo properties en vex de hardcoded
export default axios.create({
    baseURL: properties.baseUrl,
    headers: {
        "Content-type": "application/json",
        //"databaseName":"juegosolimpicos2050"
    }, auth: {
        username: properties.nombreUsuario,
        password: properties.password,

    },

});

