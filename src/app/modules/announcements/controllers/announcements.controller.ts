import {Body, Controller, Delete, Get, Headers, Param, Patch, Post, Res, ValidationPipe} from '@nestjs/common';
import {Response as ExpressResponse} from 'express';
import {AnnouncementsService} from '../services/announcements.service';
import {CreateAnnouncementDto} from '../dto/create-announcement.dto';
import {UpdateAnnouncementDto} from '../dto/update-announcement.dto';
import {IAnnouncement} from "../../../../core/interfaces/announcements.interface";
import {UserService} from "../../user/services/user.service";
import {HeaderAcceptOptionsEnum} from "../../../../core/enums/announcements.enum";
import {FilterAnnouncementDto} from "../dto/announcement-filters.dto";

@Controller('announcements')
export class AnnouncementsController {
    constructor(
        private readonly announcementsService: AnnouncementsService,
        private readonly userService: UserService
    ) {
    }

    @Post('add')
    public async addOne(
        @Body(new ValidationPipe()) createAnnouncementDto: CreateAnnouncementDto,
        @Headers() headers: Headers
    ): Promise<IAnnouncement> {
        const passedUserId: string = headers['x-user-id'];
        const passedToken: string = headers['authorization'];

        await this.userService.authenticateUser(passedUserId, passedToken);
        return this.announcementsService.addOne(createAnnouncementDto, passedUserId);
    }

    @Get('getOne/:announcementId')
    public async getOne(
        @Param('announcementId') announcementId: string,
        @Res() res: ExpressResponse,
        @Headers() headers: Headers
    ): Promise<any> {
        const acceptHeader = headers['accept'];
        const announcement: IAnnouncement = await this.announcementsService.getOne(announcementId);

        switch (acceptHeader) {
            case HeaderAcceptOptionsEnum.TEXT_PLAIN:
                res.set('Content-Type', HeaderAcceptOptionsEnum.TEXT_PLAIN);
                res.send(announcement);
                break;
            case HeaderAcceptOptionsEnum.TEXT_HTML:
                const htmlContent: string = this.announcementsService.generateHTMLContent(announcement)
                res.set('Content-Type', HeaderAcceptOptionsEnum.TEXT_HTML);
                res.send(`<html><body>${htmlContent}</body></html>`);
                break;
            case HeaderAcceptOptionsEnum.APPLICATION_JSON:
                res.json(announcement);
                break;
            default:
                res.json(announcement);
                break;
        }
    }

    @Get('getAll')
    public async getAll(): Promise<Array<IAnnouncement>> {
        return this.announcementsService.getAll();
    }


    @Delete('removeOne/:announcementId')
    public async removeOne(
        @Param('announcementId') announcementId: string,
        @Headers() headers: Headers
    ): Promise<IAnnouncement> {
        const passedUserId: string = headers['x-user-id'];
        const passedToken: string = headers['authorization'];

        await this.userService.authenticateUser(passedUserId, passedToken);
        return this.announcementsService.removeOne(announcementId, passedUserId)
    }

    @Patch('updateOne/:announcementId')
    public async updateOne(
        @Param('announcementId') announcementId: string,
        @Headers() headers: Headers,
        @Body(new ValidationPipe()) updateAnnouncementDto: UpdateAnnouncementDto): Promise<IAnnouncement> {
        const passedUserId: string = headers['x-user-id'];
        const passedToken: string = headers['authorization'];

        await this.userService.authenticateUser(passedUserId, passedToken);
        return this.announcementsService.updateOne(announcementId, updateAnnouncementDto, passedUserId)
    }

    @Post('filter')
    filter(@Body(new ValidationPipe()) filterAnnouncementDto: FilterAnnouncementDto): Promise<Array<IAnnouncement>> {
        return this.announcementsService.filter(filterAnnouncementDto);
    }
}
