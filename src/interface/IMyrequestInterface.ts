import {Request} from "express";
import { IUser } from './user.interface';
export interface IMyRequestInterface extends Request{
   user?:IUser
}
