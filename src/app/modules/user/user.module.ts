import {Module} from '@nestjs/common';
import {UserService} from './services/user.service';
import {UserController} from './controllers/user.controller';
import {MongooseModule} from "@nestjs/mongoose";
import {UserSchema} from "../../../core/models/user.model";

@Module({
    imports: [MongooseModule.forFeature([{name: 'User', schema: UserSchema}])],
    controllers: [UserController],
    providers: [UserService],
})
export class UserModule {
}
