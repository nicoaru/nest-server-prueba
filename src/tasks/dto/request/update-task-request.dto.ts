import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskRequestDto } from './create-task-request.dto';

export class UpdateTaskRequestDto extends PartialType(CreateTaskRequestDto) {
    _id:string|number;
}
