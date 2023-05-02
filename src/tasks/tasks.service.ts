import { Injectable } from '@nestjs/common';
import { CreateTaskRequestDto } from './dto/request/create-task-request.dto';
import { UpdateTaskRequestDto } from './dto/request/update-task-request.dto';

@Injectable()
export class TasksService {

  findAll() {
    return `This action returns all tasks`;
  }

  findOne(id: number) {
    return `This action returns a #${id} task`;
  }

  create(createTaskDto: CreateTaskRequestDto) {
    return 'This action adds a new task';
  }

  update(id: number, updateTaskDto: UpdateTaskRequestDto) {
    return `This action updates a #${id} task`;
  }

  remove(id: number) {
    return `This action removes a #${id} task`;
  }
}
