import {IsNotEmpty, MinLength} from "class-validator";

export class SigninDto  {
    @IsNotEmpty()
    @MinLength(2)
    username: string;
}
