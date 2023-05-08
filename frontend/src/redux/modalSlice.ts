import {createSlice} from '@reduxjs/toolkit';
import {RootState} from './store';


const initialState = {modalPedidosVisble:false,modalGuardarVisible:false};
export const modalSlice = createSlice({
    name: 'modalVisible',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        setModalVisible(state,action) {
            state.modalPedidosVisble = action.payload
        },
        setModalGuardarVisible(state,action) {
            state.modalGuardarVisible = action.payload
        },

    },
});
export const  modalVisible=(state: RootState) => state.modal.modalPedidosVisble;
export const  modalGuardarVisible=(state: RootState) => state.modal.modalGuardarVisible;
export const {setModalVisible,setModalGuardarVisible} = modalSlice.actions;
export default modalSlice.reducer;