import { PartialType } from '@nestjs/mapped-types';
import { CreateUserRequestDto } from './create-user-request.dto';
import { IsDefined, IsNotEmpty, IsEmail } from 'class-validator';

export class UpdateUserRequestDto extends PartialType(CreateUserRequestDto) {

}