import * as mongoose from "mongoose";

export interface IUser {
    _id?: mongoose.Types.ObjectId;
    name: string;
    token: string;
}