import * as React from 'react';
import {coloresEmpresa,} from "../constantes/constantesNegocio";
import { NavigationContainer } from '@react-navigation/native';
import {
    createDrawerNavigator,
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem,
} from '@react-navigation/drawer';
import NavegacionPedidos from "./navegacionPedidos";
import PanelConfiguracionPedidos from "../configuracionPedidos/panelConfiguracionPedidos"
import Ayuda from "../configuracionPedidos/Ayuda"
import { borrarPedido} from "../redux/pedidoSlice";
import {useDispatch, } from "react-redux";
import {loginToApp, } from "../redux/loginSlice";
import useCargarRestriccionesApp from "../myHooks/useCargarRestriccionesApp";
import Perfil from "../configuracionPedidos/perfil";
function CustomDrawerContent(props) {

    const dispatch = useDispatch();
    function logout(){

        const user={nombreUsuario:null,password:null,correoElectronico:null}
        dispatch(loginToApp(user))
        dispatch(borrarPedido())

    }
    return (
        <DrawerContentScrollView {...props}>
            <DrawerItemList {...props} />
            <DrawerItem
                label="Log out"
                onPress={() => logout()}
            />

        </DrawerContentScrollView>
    );
}

const Drawer = createDrawerNavigator();

function MyDrawer() {
    return (

        <Drawer.Navigator
            useLegacyImplementation
            screenOptions={{drawerActiveBackgroundColor:coloresEmpresa[1],
            drawerActiveTintColor:coloresEmpresa[0],
                headerTintColor: coloresEmpresa[0]}}


            drawerContent={(props) => <CustomDrawerContent {...props} />}
        >
            <Drawer.Screen name="Hacer pedido" component={NavegacionPedidos} />
            <Drawer.Screen name="Mis pedidos" component={ PanelConfiguracionPedidos} />
            <Drawer.Screen name="Perfil" component={ Perfil} />
            <Drawer.Screen name="Ayuda" component={ Ayuda} />
        </Drawer.Navigator>
    );
}

export default function Navegacion() {
    useCargarRestriccionesApp()
    return (
        <NavigationContainer>

            <MyDrawer />
        </NavigationContainer>
    );
}

