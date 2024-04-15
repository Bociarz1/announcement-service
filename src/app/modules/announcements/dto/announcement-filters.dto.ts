import {IsDate, IsEnum, IsNumber, IsOptional, IsPositive, IsString, Length, Matches, Min} from "class-validator";
import {AnnouncementCategoryEnum, AnnouncementTagsEnum} from "../../../../core/enums/announcements.enum";
import {Type} from "class-transformer";

export class FilterAnnouncementDto {

    @IsOptional()
    @IsString({message: 'Title must be a string'})
    title?: string;

    @IsOptional()
    @IsString({message: 'Description must be a string'})
    description?: string;

    @IsOptional()
    @IsString({message: 'Author must be a string'})
    author?: string;

    @IsOptional()
    @IsString({message: 'Phone number must be a string'})
    @Matches(/^[0-9]+$/, {message: 'Phone number must contain only digits'})
    @Length(1, 9, {message: 'Phone number must have between 1 and 9 characters'})
    phoneNumber?: string;

    @IsOptional()
    @IsEnum(AnnouncementCategoryEnum, {
        message: 'Invalid category provided. Must be one of: STOCK, WORK, EVENT, SERVICES',
    })
    category?: AnnouncementCategoryEnum;

    @IsOptional()
    @IsEnum(AnnouncementTagsEnum, {
        message: 'Invalid tags provided. Must be one of: STOCK, WORK, EVENT, SERVICES',
    })
    tags?: AnnouncementTagsEnum;

    @IsOptional()
    @IsPositive({message: 'Price must be greater than zero'})
    @IsNumber({allowNaN: false, allowInfinity: false}, {message: 'Price must be a number'})
    price?: number;

    @IsOptional()
    @IsNumber({allowNaN: false, allowInfinity: false}, {message: 'Salary must be a number'})
    @IsPositive({message: 'Price must be greater than zero'})
    salary?: number;

    @IsOptional()
    @IsString({message: 'Duties must be a string'})
    duties?: string;

    @IsOptional()
    @IsString({message: 'Address must be a string'})
    address?: string;

    @IsOptional()
    @Type(() => Date)
    @IsDate()
    createdDate?: Date;

    @IsOptional()
    @Type(() => Date)
    @IsDate()
    createdDateRangeFrom?: Date;

    @IsOptional()
    @Type(() => Date)
    @IsDate()
    createdDateRangeTo?: Date;

    @IsOptional()
    @IsNumber()
    @Min(0)
    priceRangeFrom?: number;

    @IsOptional()
    @IsNumber()
    @IsPositive({message: ''})
    priceRangeTo?: number;

    @IsOptional()
    @IsNumber()
    @Min(0)
    salaryRangeFrom?: number;

    @IsOptional()
    @IsNumber()
    @IsPositive({message: ''})
    salaryRangeTo?: number;

    @IsOptional()
    @IsString({message: 'Id must be a string'})
    _id?: string
}