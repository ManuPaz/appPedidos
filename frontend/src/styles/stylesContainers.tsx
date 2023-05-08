import {StyleSheet} from "react-native";

export const styles=StyleSheet.create({
    containerPrincipalGlobal: {
        flex:1,
        backgroundColor:"#f1f1f1"
    },
    containerSecundarioGlobal:{
        flex: 0.1,
        backgroundColor:"#99c343"
    },
    conteinerRowGlobal:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'center',
        margin:10

    },
    conteinerRowGlobalNoMarginTop:{
        flexDirection: 'row',
        flex:1,
        alignItems: 'center',
        justifyContent:'center',
        marginLeft:10

    },text_title:{fontSize:16,marginLeft:30,marginTop:10, fontWeight: "bold"},
    container: {

        paddingTop: 0

    },


})