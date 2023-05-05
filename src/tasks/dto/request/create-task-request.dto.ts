import { IsDefined, IsNotEmpty, IsEmail, IsString, IsBoolean, ValidateNested } from "class-validator";
import { UpdateUserRequestDto } from "src/users/dto/request/update-user-request.dto";

export class CreateTaskRequestDto {
    // Decoradores son para el ValidationPipe

    @IsNotEmpty()
    @IsString()
    userId: string;

    @IsNotEmpty()
    @IsString()
    title: string;

    @IsString()
    content: string;

    @IsBoolean()
    completed: boolean;
     
}


