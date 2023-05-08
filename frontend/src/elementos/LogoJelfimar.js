import { StatusBar } from 'expo-status-bar';
import {StyleSheet, Image, View} from 'react-native';

export default function LogoJelfimar(){

    return (
        <View style={styles_.containerPrincipalGlobal}>
        <Image
            style={styles_.logo}
            source={require('../../assets/logo_jelfimar.png')}
        />
        </View>



    )
}
const styles_=StyleSheet.create({
    containerPrincipalGlobal: {
        height: '15%',
        width: '100%'
    },
    logo:{width: '100%',
        height: '130%',
        position: 'relative',
        bottom: '70%'
    }


})