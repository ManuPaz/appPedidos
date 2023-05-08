import 'react-native-gesture-handler';
import Login from "./src/login/login";
import {Provider} from "react-redux";
import {store} from "./src/redux/store";
export default function App() {


        return (
            <Provider store={store}>


                <Login></Login>


            </Provider>
        )


};
