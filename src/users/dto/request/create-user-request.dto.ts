import { IsDefined, IsEmail, IsNotEmpty } from "class-validator";

export class CreateUserRequestDto {
    
    @IsDefined()
    @IsNotEmpty()
    username: string;
    @IsDefined()
    @IsEmail()
    email: string;
    @IsDefined()
    @IsNotEmpty()
    password: string;

}
