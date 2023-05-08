import * as React from 'react';
import {coloresEmpresa, } from "../constantes/constantesNegocio";
import { NavigationContainer } from '@react-navigation/native';
import {
    createDrawerNavigator,
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem,
} from '@react-navigation/drawer';
import { borrarPedido} from "../redux/pedidoSlice";
import {useDispatch, } from "react-redux";
import {loginToApp,} from "../redux/loginSlice";
import UseCargarVendedor from "../myHooks/useCargarVendedor";
import PanelConfiguracionPedidosVendedor from "./panelConfiguracionPedidosVendedor";
import Clientes from "./clientes";
import OpcionesGlobalesVendedor from "./opcionesVendedor";
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
            <Drawer.Screen name="Clientes" component={Clientes} />
            <Drawer.Screen name="Opciones" component={ OpcionesGlobalesVendedor} />
            <Drawer.Screen name="Pedidos" component={ PanelConfiguracionPedidosVendedor} />
        </Drawer.Navigator>
    );
}

export default function NavegacionVendedor() {
    UseCargarVendedor();
    return (
        <NavigationContainer>

            <MyDrawer />
        </NavigationContainer>
    );
}

