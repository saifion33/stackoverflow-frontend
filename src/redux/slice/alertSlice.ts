import { createSlice } from "@reduxjs/toolkit";
import { AppDispatch } from "../../store";



interface Ivalues {
    isAlertVisible: boolean;
    alertType: 'info' | 'success' | 'warning' | 'error',
    alertMessage: string,

}

interface Iaction {
    payload: {
        alertType: 'info' | 'success' | 'warning' | 'error',
        alertMessage: string,
        time?:number
    },
    type: string
}

const initialState: Ivalues = {
    isAlertVisible: false,
    alertMessage: 'This is alert message',
    alertType: 'info'
}

const alertSlice = createSlice({
    name: 'alert',
    initialState,
    reducers: {
        showAlert: (state, action: Iaction) => {
            state.alertType = action.payload.alertType
            state.alertMessage = action.payload.alertMessage
            state.isAlertVisible = true
        },
        hideAlert: (state) => {
            state.isAlertVisible = false;
        },
    }
})



export const { showAlert,hideAlert } = alertSlice.actions

export const showAlertWithTimeout = (payload:Iaction['payload']) => (dispatch:AppDispatch) => {
    const { time } = payload;
    dispatch(showAlert(payload));
    setTimeout(() => {
      dispatch(hideAlert());
    }, time || 3500);
  };

export default alertSlice.reducer