import {IsEnum, IsNotEmpty, IsNumber, IsPositive, IsString, Length, Matches, ValidateIf} from "class-validator";
import {AnnouncementCategoryEnum, AnnouncementTagsEnum} from "../../../../core/enums/announcements.enum";

export class CreateAnnouncementDto {

    @IsString({message: 'Title must be a string'})
    @IsNotEmpty({message: 'Title must not be empty'})
    title: string;

    @IsString({message: 'Description must be a string'})
    @IsNotEmpty({message: 'Description must not be empty'})
    description: string;

    @IsString({message: 'Author must be a string'})
    @IsNotEmpty({message: 'Author must not be empty'})
    author: string;

    @IsString({message: 'Phone number must be a string'})
    @IsNotEmpty({message: 'Phone number must not be empty'})
    @Matches(/^[0-9]+$/, {message: 'Phone number must contain only digits'})
    @Length(9, 9, {message: 'Phone number must be exactly 9 characters long'})
    phoneNumber: string;

    @IsEnum(AnnouncementCategoryEnum, {
        message: `Invalid category provided. Must be one of: STOCK(${AnnouncementCategoryEnum.STOCK}), WORK(${AnnouncementCategoryEnum.WORK}), EVENT(${AnnouncementCategoryEnum.EVENT}), SERVICES(${AnnouncementCategoryEnum.SERVICES}),`
    })
    category: AnnouncementCategoryEnum;

    @IsEnum(AnnouncementTagsEnum, {
        message: `Invalid tags provided. Must be one of: STOCK(${AnnouncementTagsEnum.STOCK}), WORK(${AnnouncementTagsEnum.WORK}), EVENT(${AnnouncementTagsEnum.EVENT}), SERVICES(${AnnouncementTagsEnum.SERVICES})`,
    })
    tags: AnnouncementTagsEnum;

    @ValidateIf(obj => [AnnouncementCategoryEnum.STOCK].includes(obj.category))
    @IsPositive({message: 'Price must be greater than zero'})
    @IsNumber({allowNaN: false, allowInfinity: false}, {message: 'Price must be a number'})
    price?: number;

    @ValidateIf(obj => [AnnouncementCategoryEnum.WORK].includes(obj.category))
    @IsNumber({allowNaN: false, allowInfinity: false}, {message: 'Salary must be a number'})
    @IsPositive({message: 'Salary must be greater than zero'})
    salary?: number;

    @ValidateIf(obj => [AnnouncementCategoryEnum.WORK].includes(obj.category))
    @IsString({message: 'Duties must be a string'})
    duties?: string;

    @ValidateIf(obj => ![AnnouncementCategoryEnum.STOCK].includes(obj.category))
    @IsString({message: 'Address must be a string'})
    address?: string;
}