import { IJwtPayload, ITags, IUser } from "../Types";
import AvatarEditor from 'react-avatar-editor'
import { showAlertWithTimeout } from "../redux/slice/alertSlice";
import jwtDecode from "jwt-decode";
import store from "../store";
import { logout } from "../redux/slice/authSlice";
import { setNotificationTokenApi } from "../Api";
import { getToken } from "firebase/messaging";
import { messaging } from "../firebase/firebase";
export const usersList: IUser[] = [
    { _id: '1', displayName: 'saifi33', location: 'delhi', reputation: 234, tags: 'javascript,react,html', imageUrl: 'https://randomuser.me/api/portraits/med/men/73.jpg', joinedOn: new Date(), answerCount: 0, questionCount: 0, about: 'full stack develper', badges: [{ name: 'Bronze', count: 1, badgesList: ['student'] }, { name: 'Silver', count: 0, badgesList: [] }, { name: 'Gold', count: 0, badgesList: [] }] },
    { _id: '2', displayName: 'viscarte', location: '127.0.0.1', reputation: 596, tags: 'c++,php,go', imageUrl: 'https://randomuser.me/api/portraits/med/men/6.jpg', joinedOn: new Date(), answerCount: 0, questionCount: 0, about: 'MERN develper', badges: [{ name: 'Bronze', count: 1, badgesList: ['student'] }, { name: 'Silver', count: 0, badgesList: [] }, { name: 'Gold', count: 0, badgesList: [] }] },
    { _id: '3', displayName: 'iron man', location: 'usa', reputation: 596, tags: 'iron,al,go', imageUrl: 'https://randomuser.me/api/portraits/med/men/5.jpg', joinedOn: new Date(), answerCount: 0, questionCount: 0, about: 'python develper', badges: [{ name: 'Bronze', count: 1, badgesList: ['student'] }, { name: 'Silver', count: 0, badgesList: [] }, { name: 'Gold', count: 0, badgesList: [] }] },
    { _id: '4', displayName: 'alien', location: 'mars', reputation: 596, tags: 'alien++,dhoop,moonlight', imageUrl: 'https://randomuser.me/api/portraits/med/men/15.jpg', joinedOn: new Date(), answerCount: 0, questionCount: 0, about: 'exploring new planets and stars', badges: [{ name: 'Bronze', count: 1, badgesList: ['student'] }, { name: 'Silver', count: 0, badgesList: [] }, { name: 'Gold', count: 0, badgesList: [] }] }]

export const tags: ITags[] = [
    { id: '1', name: 'javascript', description: 'For questions about programming in ECMAScript (JavaScript/JS) and its different dialects/implementations (except for ActionScript). Note that JavaScript is NOT Java. Include all tags that are relevant to your question: e.g., [node.js], [jQuery], [JSON], [ReactJS], [angular], [ember.js], [vue.js], [typescript], [svelte], etc. ', questionAsked: 0 },
    { id: '2', name: 'python', description: 'Python is a dynamically typed, multi-purpose programming language. It is designed to be quick to learn, understand, and use, and enforces a clean and uniform syntax. Please note that Python 2 is officially out of support as of 2020-01-01. For version-specific Python questions, add the [python-2.7] or [python-3.x] tag. When using a Python variant (e.g. Jython, PyPy) or library (e.g. Pandas, NumPy), please include it in the tags.', questionAsked: 0 },
    { id: '3', name: 'java', description: `Java is a high-level object-oriented programming language. Use this tag when you're having problems using or understanding the language itself. This tag is frequently used alongside other tags for libraries and/or frameworks used by Java developers.`, questionAsked: 0 },
    { id: '4', name: 'C#', description: `C# (pronounced "see sharp") is a high-level, statically typed, multi-paradigm programming language developed by Microsoft. C# code usually targets Microsoft's .NET family of tools and run-times, which include .NET, .NET Framework, .NET MAUI, and Xamarin among others. Use this tag for questions about code written in C# or about C#'s formal specification.`, questionAsked: 0 }
]


export const firstBadgeCriteria: { [key: string]: string } = {
    bronze: 'Ask a question that scrore 2 or more to earn your first Bronze badge',
    silver: 'Ask a question that score 10 or more to earned your first Silver badge',
    gold: 'Ask a question that score 20 or more to earned your first Gold badge'
}

export const getImageBlob = async (editorRef: React.RefObject<AvatarEditor>) => {
    return new Promise((resolve, reject) => {
        if (editorRef.current) {
            const canvas = editorRef.current.getImageScaledToCanvas()
            canvas.toBlob(blob => {
                if (blob) {
                    resolve(blob)
                }
                else {
                    reject(new Error('cant process file'));
                }
            })
        }
    })
}
type CheckType = 'network' | 'session' | 'both';

export const checkNetworkAndSession = (check: CheckType, next: () => void) => {

    const isNetworkConnected = navigator.onLine
    const token = store.getState().auth.user?.token
    const currentTime = Date.now()
    const isUserLoggedIn = token
    const isSessionExpire = token && jwtDecode<IJwtPayload>(token).exp * 1000 - currentTime < 0
    if (check === 'network') {
        if (isNetworkConnected) {
            next();
            return
        }
        store.dispatch(showAlertWithTimeout({ message: 'Check Your Internet Connection', type: 'warning' }))
    }
    else if (check === 'session') {
        if (isUserLoggedIn && !isSessionExpire) {
            next()
            return
        }
        if (!isUserLoggedIn) {
            store.dispatch(showAlertWithTimeout({ message: "Login Please", type: 'warning' }))
        }
        if (isUserLoggedIn && isSessionExpire) {
            store.dispatch(showAlertWithTimeout({ message: 'Session expired.', type: 'warning' }))
            store.dispatch(logout())
        }

    }
    else if (check === 'both') {
        if (!isUserLoggedIn) {
            store.dispatch(showAlertWithTimeout({ message: "Login Please.", type: 'warning' }))
        }
        if (isUserLoggedIn && isSessionExpire) {
            store.dispatch(logout());
            store.dispatch(showAlertWithTimeout({ message: "Session Expired", type: 'warning' }))
        }
        if (!isNetworkConnected) {
            store.dispatch(showAlertWithTimeout({ message: "Check your network", type: 'warning' }))
        }
        if (isNetworkConnected && isUserLoggedIn && !isSessionExpire) {
            next()
        }
    }

}

export const detectOs = () => {
    let operatingSystem = "Unknown OS";
    if (navigator.userAgent.indexOf("Win") !== -1) {
        operatingSystem = "Windows";
    } else if (navigator.userAgent.indexOf("Mac") !== -1) {
        operatingSystem = "MacOS";
    } else if (navigator.userAgent.indexOf("Android") !== -1) {
        operatingSystem = "Android";
    } else if (navigator.userAgent.indexOf("iOS") !== -1) {
        operatingSystem = "iOS";
    } else if (navigator.userAgent.indexOf("Linux") !== -1 || navigator.userAgent.indexOf("X11") !== -1) {
        if (navigator.userAgent.indexOf("Android") === -1) {
            operatingSystem = "Linux";
        }
    }
    return operatingSystem
}

export const detectBrowser = () => {
    let browser = "Unknown Browser";
    if (navigator.userAgent.indexOf("Edge") !== -1) {
        browser = "Edge";
    } else if (navigator.userAgent.indexOf("Chrome") !== -1) {
        if (navigator.userAgent.indexOf("Edg") !== -1) {
            browser = "Edge";
        } else {
            browser = "Chrome";
        }
    } else if (navigator.userAgent.indexOf("Firefox") !== -1) {
        browser = "Firefox";
    } else if (navigator.userAgent.indexOf("Opera") !== -1 || navigator.userAgent.indexOf("OPR") !== -1) {
        browser = "Opera";
    } else if (navigator.userAgent.indexOf("Safari") !== -1) {
        browser = "Safari";
    } else if (navigator.userAgent.indexOf("MSIE") !== -1 || navigator.userAgent.indexOf("Trident") !== -1) {
        browser = "Internet Explorer";
    } else if (navigator.userAgent.includes('brave')) {
        return 'Brave';
    }
    return browser
}
export const setNotificationTokenFunction=(token:string)=>{
    setNotificationTokenApi({token}).then(()=>{
        store.dispatch(showAlertWithTimeout({message:'Subscribed to Notification',type:'success'}))
    }).catch((error)=>{
        console.log(error)
        store.dispatch(showAlertWithTimeout({message:'Something went wrong.',type:'error'}))
    })
}

export const getNotificationToken = (registration: ServiceWorkerRegistration) => {
    getToken(messaging, { serviceWorkerRegistration: registration })
        .then(token=>{
            setNotificationTokenFunction(token)
        })
        .catch(error => console.log(error))
}