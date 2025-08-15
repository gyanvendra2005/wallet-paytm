import  "next-auth";
import { DefaultSession } from "next-auth";

declare module 'next-auth' {
    interface Merchant{
        id?:string;
        name?:string;
        email?:string;
        number?:string;
    }
    interface Session{
        user:{
             id?:string;
             name?:string;
             email?:string;
             number?:string;
        } & DefaultSession['user']

    }
}

declare module 'next-auth/jwt' {
    interface JWT {
        id?:string;
        name?:string;
        email?:string;
        number?:string;
    }
}