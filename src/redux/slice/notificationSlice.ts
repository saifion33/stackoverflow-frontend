import { createSlice } from "@reduxjs/toolkit";
import { getNotificationToken, } from "../../utils/helpers";
interface IState {
    askPermission: boolean;
}
const alredayAskedForPermission = localStorage.getItem('alredayAskedForPermission');

const registerServiceWroker = () => {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/firebase-messaging-sw.js')
            .then(async (registration) => {
                getNotificationToken(registration)
            })
            .catch((error) => {
                console.error('Service Worker registration failed:', error);
            });
    } else {
        console.log('serviceWorker not available in your browser.')
    }
}

// ************************************* SLICE ********************************
const notificationSlice = createSlice({
    name: "notification",

    initialState: <IState>{
        askPermission: alredayAskedForPermission ? JSON.parse(alredayAskedForPermission) : false,
    },

    reducers: {
        openAskNotificationModal: (state) => {
            state.askPermission = true;
        },

        requestNotificationPermission: (state) => {
            if (Notification.permission === 'default') {
                Notification.requestPermission().then(permission => {
                    if (permission === 'granted') {
                        registerServiceWroker();
                    }
                })
            }
            if (Notification.permission === 'granted') {
                registerServiceWroker();
            }
            state.askPermission = false;
            localStorage.setItem('alredayAskedForPermission', JSON.stringify(false));
        },

        closeNotificationModal: (state) => {
            state.askPermission = false;
            localStorage.setItem('alredayAskedForPermission', JSON.stringify(false));
        }

    }
})
export const { closeNotificationModal, openAskNotificationModal, requestNotificationPermission } = notificationSlice.actions
export default notificationSlice.reducer;