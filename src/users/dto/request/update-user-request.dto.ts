import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateUserRequestDto } from './create-user-request.dto';
import { UpdateTaskRequestDto } from 'src/tasks/dto/request/update-task-request.dto';

export class UpdateUserRequestDto extends PartialType(OmitType(CreateUserRequestDto, ['password'] as const)) {
    _id:string|number;
}
