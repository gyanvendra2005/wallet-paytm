import  "next-auth";
import { DefaultSession } from "next-auth";

declare module 'next-auth' {
    interface User{
        id?:string;
        name?:string;
        email?:string;
        number?:string;
        Balance?:number;
        amount?:number;
        OnRamp?:number
    }
    interface Session{
        user:{
             id?:string;
             name?:string;
             email?:string;
             number?:string;
             Balance?:number;
             amount?:number;
             OnRamp?:number;
        }  & DefaultSession;['user']

    }
}

declare module 'next-auth/jwt' {
    interface JWT {
        id?:string;
        name?:string;
        email?:string;
        number?:string;
        Balance?:number;
        amount?:number;
        OnRamp?:number
    }
}