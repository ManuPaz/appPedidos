import { StatusBar } from 'expo-status-bar';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {coloresEmpresa} from "../constantes/constantesNegocio";

export default function ButtonGradient({Press,Name,width}){


    return (
        <TouchableOpacity style={[styles.button,]} onPress={Press}>
            <LinearGradient
                // Button Linear Gradient
                colors={coloresEmpresa}
                style={[styles.button,{width: width}]}
                start={{x:0,y:0}}
                end={{x:1,y:1}}>
                <Text style={styles.text}>{Name}</Text>
            </LinearGradient>

        </TouchableOpacity>


    )
}
const styles=StyleSheet.create({

    button:{
         height: 50,
        borderRadius: 15,
        marginTop: '5%',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom:10,


    },
    text: {
       fontSize:12,
        color: 'white',
        fontWeight: 'bold',
        alignItems:'center',
        justifyContent: 'center',
        textAlign: 'center',
        marginLeft:5,
        marginRight:5,




    }


})