import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskRequestDto } from './dto/request/create-task-request.dto';
import { UpdateTaskRequestDto } from './dto/request/update-task-request.dto';
import { ParseIdPipe } from 'src/pipes/parseId.pipe';



@Controller('tasks')
export class TasksController {
  constructor(
    private readonly tasksService: TasksService
  ) {}

  @Post()
  create(@Body() createTaskDto: CreateTaskRequestDto) {
    return this.tasksService.create(createTaskDto);
  }

  @Get()
  findAll() {
    return this.tasksService.findAll();
  }

  @Get(':id')
  findById(@Param('id', ParseIdPipe) id: string) {
    return this.tasksService.findById(id);
  }

  @Patch(':id')
  updateById(@Param('id', ParseIdPipe) id: string, @Body() updateTaskDto: UpdateTaskRequestDto) {
    return this.tasksService.updateById(id, updateTaskDto);
  }

  @Delete(':id')
  removeById(@Param('id', ParseIdPipe) id: string) {
    return this.tasksService.removeById(id);
  }
}
