import {AnnouncementCategoryEnum, AnnouncementTagsEnum} from "../enums/announcements.enum";
import mongoose from "mongoose";

export interface IAnnouncement {
    _id?: mongoose.Types.ObjectId;
    creatorId: string;
    createdDate: Date;
    title: string;
    description: string;
    author: string;
    phoneNumber: string;
    category: AnnouncementCategoryEnum;
    tags: AnnouncementTagsEnum;

    price?: number; // ONLY FOR CATEGORIES: STOCK,
    salary?: number; // ONLY FOR CATEGORIES: WORK,
    duties?: string // ONLY FOR CATEGORIES: WORK,
    address?: string; // ONLY FOR CATEGORIES: WORK, EVENT, SERVICES
}

export interface IAnnouncementFilters {
    _id?: string;
    createdDate?: Date;
    createdDateRangeFrom?: Date;
    createdDateRangeTo?: Date;
    price?: number; // FOR CATEGORIES: STOCK,
    priceRangeFrom?: number; // FOR CATEGORIES: STOCK,
    priceRangeTo?: number; // FOR CATEGORIES: STOCK,
    salary?: number; // FOR CATEGORIES: WORK,
    salaryRangeFrom?: number; // FOR CATEGORIES: WORK,
    salaryRangeTo?: number; // FOR CATEGORIES: WORK,
    title?: string;
    description?: string;
    author?: string;
    phoneNumber?: string;
    category?: AnnouncementCategoryEnum;
    tags?: AnnouncementTagsEnum;
    duties?: string // FOR CATEGORIES: WORK,
    address?: string; // FOR CATEGORIES: WORK, EVENT, SERVICES
}