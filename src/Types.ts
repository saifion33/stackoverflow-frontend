// login form interface
export interface ILoginForm {
    email:string,
    password:string
}
// signup form interface
export interface ISignupForm extends ILoginForm{
    displayName: string,
}
// user interface
export interface IUser{
    id:string,
    displayName:string,
    location:string,
    reputation:number,
    tags:string,
    imageUrl:string
}

// tag interface
export interface ITags{
    name:string,
    description:string,
    questionAsked:number,
    id:string
}

// askQuestion interface

export interface IAskQuestion{
    title:string,
    description:string
    tags:string
}

// Question interface

export interface IQuestion extends IAskQuestion{
    id:string,
    votes:number,
    answers:number,
    askedAt:string,
    askedBy:IUser
}