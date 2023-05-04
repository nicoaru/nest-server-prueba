import { IsDefined, IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateUserRequestDto {
    // Decoradores son para el ValidationPipe
    @IsDefined()
    @IsNotEmpty()
    @IsString()
    username: string;

    @IsDefined()
    @IsEmail()
    @IsString()
    email: string;
    
    @IsDefined()
    @IsNotEmpty()
    @IsString()
    password: string;

}
