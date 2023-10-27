export interface IDeviceInfo{
    ip: string,
    browser:string
    deviceType: string
    os: string
    location: string
    loggedInAt?:Date
}

// login form interface
export interface ILoginForm {
    email: string,
    password: string,
}

// use when submit login data to server
export interface ILoginData extends ILoginForm{
    deviceInfo: IDeviceInfo
}

// signup form interface
export interface ISignupForm extends ILoginForm {
    displayName: string,
}

// use when submit signup  data to server
export interface ISignupData extends ILoginData {
    displayName: string,
}
export interface IBasicUserDetails {
    _id: string,
    fuid: string,
    displayName: string,
    about: string,
    location: string,
    reputation: number,
    tags: string,
    imageUrl: string,
}

// user interface
export interface IUser extends IBasicUserDetails {
    joinedOn: Date,
    questionCount: number,
    answerCount: number,
    badges: IBadge[]
}

export interface IUserUpdates {
    displayName?: string,
    about?: string,
    location?: string,
    tags?: string,
    image?: Blob
}


export interface IBadge {
    name: string
    count: number,
    badgesList: string[]
}

// tag interface
export interface ITags {
    name: string,
    description: string,
    questionAsked: number,
    id: string
}

// askQuestion interface

export interface IAskQuestion {
    title: string,
    description: string
    tags: string
}

interface IAuthor {
    _id: string,
    displayName: string,
    reputation: number,
    imageUrl: string | null
}

// Question interface
export interface IQuestion extends IAskQuestion {
    _id: string
    upVote: string[]
    downVote: string[]
    noOfAnswers: number
    askedOn: Date
    author: IAuthor
}

export interface IVoteData {
    id: string,
    userId: string,
    voteType: 'upVote' | 'downVote'
}
export interface IVoteAnswerData extends IVoteData {
    answerAuthorId: string,
    questionId: string
}

export interface IpostAnswer {
    questionId: string
    answerBody: string
}

export interface IAnswer {
    _id: string
    body: string
    answerOf: string
    author: IAuthor
    answeredOn: Date
    upVote: string[]
    downVote: string[],
    isAccepted: boolean
}

export interface IDeleteAnswer {
    answerId: string,
    questionId: string
}

export interface IServerResponse {
    status: number,
    message: string,
}

export interface IJwtPayload {
    email: string,
    id: string,
    iat: number,
    exp: number,
}

export interface IAcceptAnswer {
    questionId: string,
    answerId: string,
    questionAuthorId: string,
    answerAuthorId: string,
}

export interface IforgetPassword {
    email: string,
    deviceInfo: {
        ip: string,
        location: string
    }
}
export interface IResetPassword {
    newPassword: string,
    token: string
}
export interface IipInfo {
    city: string,
    country: string,
    ip: string,
    loc: string,
    org: string,
    postal: string,
    region: string,
    timezone: string,
}

export interface ISetNotificationToken {
    token: string
}

export interface IUserPresence {
    isOnline: boolean
    last_changed: Date
}

export type ClearUserPresence = () => () => void

export interface ImakeCall{
    callerName: string
    to:string
    callType:'audio'|'video'
}


export interface ICallData{
    callToken: string
    callId: string
    callerId: string
    callerName: string,
    callType: 'video' |'audio'
}


export interface IReciver{
    fuid: string
    name: string
}

