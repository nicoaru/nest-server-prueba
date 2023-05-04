import { IsDefined, IsNotEmpty, IsEmail, IsString, IsBoolean } from "class-validator";

export class CreateTaskRequestDto {
    // Decoradores son para el ValidationPipe
    @IsDefined()
    @IsNotEmpty()
    @IsString()
    userId: string;

    @IsDefined()
    @IsNotEmpty()
    @IsString()
    title: string;

    @IsString()
    content: string;

    @IsBoolean()
    completed: boolean;
     
}
