import { Addiction } from "./addiction"

export type User = {
    id : number , 
    firstName : string,
    lastName : string , 
    login : string , 
    email : string ,
    addictions : Addiction[];
}