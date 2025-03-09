import {IsNotEmpty, IsUrl} from "class-validator";

export class CreateMediaDto {
    @IsUrl()
    url: string;

    @IsNotEmpty()
    title: string;
}
