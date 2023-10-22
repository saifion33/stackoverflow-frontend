import { off, onValue, ref } from "firebase/database"
import { useState ,useEffect} from "react"
import { database } from "../firebase/firebase"
import { IUserPresence } from "../Types"

export const useModal=()=>{
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const openModal=()=>{
        setIsOpen(true)
    }
    const closeModal=()=>{
        setIsOpen(false)
    }
    return {isOpen,openModal,closeModal}
}
export const usePresence = (uid:string) => {
    const [userPresence, setUserPresence] = useState<IUserPresence>({isOnline:false,last_changed:new Date()})
    useEffect(() => {
        const userDataRef = ref(database, `status/${uid}`)
        onValue(userDataRef, (snap) => {
            if (snap.exists()) {
                const data:IUserPresence = snap.val()
                setUserPresence(data)
            }
        })
        return () => {
            off(userDataRef)
        }
    }, [uid])

    return userPresence
}