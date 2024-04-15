import {Injectable, UnauthorizedException} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {IUser} from "../../../../core/interfaces/user.interface";

@Injectable()
export class UserService {
    constructor(@InjectModel('User') private readonly userModel: Model<IUser>) {
    }

    public async authenticateUser(passedUserId: string, passedUserToken: string): Promise<boolean> {
        passedUserToken = (passedUserToken || '').replace('Bearer ', '')
        const userToken: string = await this.getUserToken(passedUserId)
        if (userToken === passedUserToken) {
            return true;
        } else {
            throw new UnauthorizedException('User is not authenticated');
            return false;
        }
    }

    private async getUserToken(userId: string): Promise<string> {
        const user: IUser = await this.userModel.findById(userId)
        if (!user?.token) {
            throw new UnauthorizedException('User is not authenticated');
            return '';
        }
        return user?.token;
    }

}
