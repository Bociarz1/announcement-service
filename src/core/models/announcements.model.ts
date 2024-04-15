import * as mongoose from 'mongoose'
import {Schema} from 'mongoose'
import {AnnouncementCategoryEnum, AnnouncementTagsEnum} from "../enums/announcements.enum";
import {IAnnouncement} from "../interfaces/announcements.interface";
import {EnumeratorUtil} from "../utils/enumerator.util";

export const AnnouncementSchema: Schema<IAnnouncement> = new mongoose.Schema({
    creatorId: {type: String, required: true},
    createdDate: {type: Date, required: true},
    title: {type: String, required: true},
    description: {type: String, required: true},
    author: {type: String, required: true},
    phoneNumber: {type: String, required: true},
    category: {
        type: Number,
        enum: EnumeratorUtil.getEnumValuesArray(AnnouncementCategoryEnum, 'number'),
        required: true
    },
    tags: {
        type: Number,
        enum: EnumeratorUtil.getEnumValuesArray(AnnouncementTagsEnum, 'number'),
        required: true
    },
    price: {type: Number, required: false},
    salary: {type: Number, required: false},
    duties: {type: String, required: false},
    address: {type: String, required: false},
})