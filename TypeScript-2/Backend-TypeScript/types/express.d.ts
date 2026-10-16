import { Document } from "mongoose";
import "express"

declare global{
    namespace Express{
        interface Request{
            user?:{
                _id: any;
                name:string;
                email:string;
                role:"Admin" | "User"
            }
        }
    }
}