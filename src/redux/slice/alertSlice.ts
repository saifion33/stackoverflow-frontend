import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AppDispatch } from "../../store";
import { nanoid } from 'nanoid/non-secure'


interface IAlert {
    id: string;
    message: string,
    type: 'info' | 'success' | 'warning' | 'error',
    timeout?: number
}

interface Ivalues {
    Alerts: IAlert[],
}

const initialState: Ivalues = {
    Alerts: []
}

const alertSlice = createSlice({
    name: 'alert',
    initialState,
    reducers: {
        showAlert: (state, action: PayloadAction<IAlert>) => {
            state.Alerts.push(action.payload)
        },
        hideAlert: (state, action: PayloadAction<string>) => {
            state.Alerts = state.Alerts.filter(alert => alert.id !== action.payload)
        },
    }
})



export const { showAlert, hideAlert } = alertSlice.actions

export const showAlertWithTimeout = (payload: { message: string,type: 'info' | 'success' | 'warning' | 'error',timeout?: number}) => (dispatch: AppDispatch) => {
    const id = nanoid(10)
    const alert={...payload,id}
    dispatch(showAlert(alert))
    setTimeout(() => {
        dispatch(hideAlert(alert.id))
    }, payload.timeout || 3500)
};

export default alertSlice.reducer