import * as mongoose from 'mongoose'
import {Schema} from 'mongoose'
import {IUser} from "../interfaces/user.interface";

export const UserSchema: Schema<IUser> = new mongoose.Schema({
    name: {type: String, required: true,},
    token: {type: String, required: true,},
})