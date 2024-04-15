import {Module} from '@nestjs/common';

import {MongooseModule} from "@nestjs/mongoose";
import {AnnouncementSchema} from "../../../core/models/announcements.model";
import {UserService} from "../user/services/user.service";
import {UserSchema} from "../../../core/models/user.model";
import {AnnouncementsController} from "./controllers/announcements.controller";
import {AnnouncementsService} from "./services/announcements.service";

@Module({
    imports: [MongooseModule.forFeature([{name: 'Announcement', schema: AnnouncementSchema}]),
        MongooseModule.forFeature([{name: 'User', schema: UserSchema}])
    ],
    controllers: [AnnouncementsController],
    providers: [AnnouncementsService, UserService],
})
export class AnnouncementsModule {
}
