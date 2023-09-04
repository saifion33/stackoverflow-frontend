// login form interface
export interface ILoginForm {
    email: string,
    password: string
}
// signup form interface
export interface ISignupForm extends ILoginForm {
    displayName: string,
}

export interface IBasicUserDetails {
    _id: string,
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
    imageUrl: string
}

// Question interface
export interface IQuestion extends IAskQuestion {
    _id: string
    upVote: string[]
    downVote: string[]
    noOfAnswers: number
    askedOn: string
    author: IAuthor
}

export interface IAnswer {
    _id: string
    answer: string
    answerOf: string
    author: IAuthor
    answerOn: string
    upVote: string[]
    downVote: string[]
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