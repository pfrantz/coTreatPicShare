import { PartialType } from '@nestjs/mapped-types';
import { CreateMediaDto } from './create-media.dto';
import {IsBoolean, IsOptional} from "class-validator";

export class UpdateMediaDto extends PartialType(CreateMediaDto) {
    @IsOptional()
    @IsBoolean()
    favourite: boolean;
}
