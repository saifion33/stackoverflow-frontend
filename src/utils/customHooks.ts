import { off, onValue, ref } from "firebase/database"
import { useState, useEffect } from "react"
import { database } from "../firebase/firebase"
import { ICallData, IUserPresence} from "../Types"

export const useModal = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const openModal = () => {
        setIsOpen(true)
    }
    const closeModal = () => {
        setIsOpen(false)
    }
    return { isOpen, openModal, closeModal }
}
export const usePresence = (uid: string) => {
    const [userPresence, setUserPresence] = useState<IUserPresence>({ isOnline: false, last_changed: new Date() })
    useEffect(() => {
        const userDataRef = ref(database, `status/${uid}`)
        onValue(userDataRef, (snap) => {
            if (snap.exists()) {
                const data: IUserPresence = snap.val()
                setUserPresence(data)
            }
        })
        return () => {
            off(userDataRef)
        }
    }, [uid])

    return userPresence
}

export const useCallRequest = (uid: string) => {
    const [callRequest, setCallRequest] = useState<null | ICallData>(null)
    useEffect(() => {
        const callRequestRef = ref(database, `calls/${uid}/callRequest`)
        onValue(callRequestRef, (snap) => {
            console.log(snap.val());
            if (snap.exists()) {
                const callRequest = snap.val()
                setCallRequest(callRequest)
                return
            }
            setCallRequest(null)
        })
        return () => {
            off(callRequestRef)
        }
    }, [uid])
    return callRequest
}