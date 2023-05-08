import {Text} from "react-native";

export default function Negrita(props){
    return (
    <Text style={{fontWeight: 'bold'}}>{props.children}</Text>
    )
}