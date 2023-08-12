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