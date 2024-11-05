import { IUser } from "../user/index.type";

export interface ISession {
    _id?: string;
    userId?: IUser;
    connectedAt?: Date;
    disconnectedAt?: Date;
    duration?: number;
}