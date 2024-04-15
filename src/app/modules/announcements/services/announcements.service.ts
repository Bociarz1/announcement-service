import {BadRequestException, Injectable, NotFoundException, UnauthorizedException} from '@nestjs/common';
import {IAnnouncement} from "../../../../core/interfaces/announcements.interface";
import {filterData, SearchType} from "filter-data";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {CreateAnnouncementDto} from "../dto/create-announcement.dto";
import {FilterAnnouncementDto} from "../dto/announcement-filters.dto";
import {UpdateAnnouncementDto} from "../dto/update-announcement.dto";
import {AnnouncementCategoryEnum, AnnouncementTagsEnum} from "../../../../core/enums/announcements.enum";

@Injectable()
export class AnnouncementsService {
    constructor(@InjectModel('Announcement') private readonly announcementModel: Model<IAnnouncement>) {
    }

    public async addOne(createAnnouncementDto: CreateAnnouncementDto, creatorId: string): Promise<IAnnouncement> {
        this.ValidateCategory(createAnnouncementDto as IAnnouncement)
        const newAnnouncement: IAnnouncement = {creatorId, createdDate: new Date(), ...createAnnouncementDto}
        return await new this.announcementModel(newAnnouncement).save();
    }

    public async getOne(announcementId: string): Promise<IAnnouncement> {
        const announcement: IAnnouncement = await this.announcementModel.findById(announcementId).lean();
        if (!announcement) {
            throw new NotFoundException(`Announcement with an ID equal to ${announcementId} was not found`);
            return;
        }
        return announcement;
    }

    public async getAll(): Promise<Array<IAnnouncement>> {
        const announcements: Array<IAnnouncement> = await this.announcementModel.find().lean()
        if (!announcements) {
            throw new NotFoundException(`No announcements found`);
            return;
        }
        return announcements;
    }


    public async removeOne(announcementId: string, userId: string): Promise<IAnnouncement> {
        const announcement: IAnnouncement = await this.announcementModel.findById(announcementId).lean();
        if (!announcement) {
            throw new NotFoundException(`No announcements found`);
        }
        const {creatorId} = announcement;
        if (creatorId !== userId) {
            throw new UnauthorizedException('Unauthorized access');
            return;
        }
        return this.announcementModel.findByIdAndDelete(announcementId)
    }

    public async updateOne(announcementId: string, updateAnnouncementDto: UpdateAnnouncementDto, userId: string): Promise<IAnnouncement> {
        const announcement: IAnnouncement = await this.announcementModel.findById(announcementId).lean();
        if (!announcement) {
            throw new NotFoundException(`No announcements found`);
        }
        const {creatorId} = announcement;
        if (creatorId !== userId) {
            throw new UnauthorizedException('Unauthorized access');
            return;
        }
        this.ValidateCategory({...announcement, ...updateAnnouncementDto} as IAnnouncement)
        await this.announcementModel.findByIdAndUpdate(announcementId, updateAnnouncementDto)
        return this.announcementModel.findById(announcementId);
    }

    public async filter(filterAnnouncementDto: FilterAnnouncementDto): Promise<Array<IAnnouncement>> {
        let announcements: Array<IAnnouncement> = await this.announcementModel.find().lean()
        if (!announcements) {
            throw new NotFoundException(`No announcements found`);
            return;
        }

        const searchConditions: Array<{ key: string; value: string; type: SearchType }> = [];

        const FROM: 'RangeFrom' = 'RangeFrom';
        const TO: 'RangeTo' = 'RangeTo';
        const DATE: 'Date' = 'Date'

        // @ts-ignore
        for (const key: string in filterAnnouncementDto) {
            if (filterAnnouncementDto[key] === '') continue;
            const searchCondition: { key: string; value: any; type: SearchType } = {} as {
                key: string;
                value: string;
                type: SearchType
            };
            const isRangeFrom: boolean = key.includes(FROM)
            const isRangeTo: boolean = key.includes(TO)
            const isDate: boolean = key.includes(DATE)

            if (isRangeFrom || isRangeTo) {
                const dataKey: string = key.replace(isRangeFrom ? FROM : TO, "")
                const type: SearchType = isRangeFrom ? SearchType.GTE : SearchType.LTE
                searchCondition.key = dataKey;
                searchCondition.value = filterAnnouncementDto[key]
                searchCondition.type = type

            } else if (isDate && !(isRangeFrom || isRangeTo)) {
                searchCondition.key = key;
                searchCondition.value = filterAnnouncementDto[key]
                searchCondition.type = SearchType.LK
            } else {
                searchCondition.key = key;
                searchCondition.value = filterAnnouncementDto[key]
                searchCondition.type = SearchType.GTE
            }
            searchConditions.push(searchCondition)
        }
        return filterData(announcements, searchConditions)
    }

    public generateHTMLContent(announcement: IAnnouncement): string {
        const htmlContent: string[] = [];
        const announcementKeys: string[] = [
            'createdDate',
            'title',
            'description',
            'author',
            'phoneNumber',
            'category',
            'tags',
            'price',
            'salary',
            'duties',
            'address',
        ];
        announcementKeys.forEach((key: string) => {
            htmlContent.push(`<p><strong>${key}:</strong> <span>${announcement[key]}</span></p></br>`)
        })
        return htmlContent.join('');
    }

    private ValidateCategory(announcement: IAnnouncement): void {
        const {category, price, salary, duties, address} = announcement || {}
        switch (category) {
            case AnnouncementCategoryEnum.WORK:
                const workValidator: boolean = [price].some((element) => element);
                if (workValidator) {
                    throw new BadRequestException(`Price can not be provided for category:WORK(${AnnouncementCategoryEnum.WORK})`);
                    return;
                }
                break;
            case AnnouncementCategoryEnum.STOCK:
                const stockValidator: boolean = [salary, duties, address].some((element) => element);
                if (stockValidator) {
                    throw new BadRequestException(`Salary, Duties, Address can not be provided for category:STOCK(${AnnouncementCategoryEnum.STOCK})`);
                    return;
                }
                break;
            case AnnouncementCategoryEnum.EVENT:
                const eventValidator: boolean = [price, salary, duties].some((element) => element);
                if (eventValidator) {
                    throw new BadRequestException(`Price, Salary, Duties can not be provided for category:EVENT(${AnnouncementCategoryEnum.EVENT})`);
                    return;
                }
                break;
            case AnnouncementCategoryEnum.SERVICES:
                const servicesValidator: boolean = [price, salary, duties].some((element) => element);
                if (servicesValidator) {
                    throw new BadRequestException(`Price, Salary, Duties can not be provided for category:SERVICES(${AnnouncementCategoryEnum.SERVICES})`);
                    return;
                }
                break;
            default:
                throw new BadRequestException(`Invalid category provided. Must be one of: STOCK(${AnnouncementTagsEnum.STOCK}), WORK(${AnnouncementTagsEnum.WORK}), EVENT(${AnnouncementTagsEnum.EVENT}), SERVICES(${AnnouncementTagsEnum.SERVICES})`)
        }
    }
}
