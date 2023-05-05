import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe, Optional, DefaultValuePipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskRequestDto } from './dto/request/create-task-request.dto';
import { UpdateTaskRequestDto } from './dto/request/update-task-request.dto';
import { ParseIdPipe } from 'src/pipes/parseId.pipe';
import { IPaginationOptions } from 'src/interfaces/paginationOptions.interface';



@Controller('tasks')
export class TasksController {
  constructor(
    private readonly tasksService: TasksService
  ) {}

  @Post()
  create(@Body() createTaskDto: CreateTaskRequestDto) {
    return this.tasksService.create(createTaskDto);
  }

  // @Query 
  //    userId
  //    sort
  //    page
  //    limit
  @Get()
  find(
    @Query('page', new DefaultValuePipe(0), ParseIntPipe) page:number,
    @Query('limit', new DefaultValuePipe(0), ParseIntPipe) limit:number,
    @Query('sort') sort:string) {
      console.log("entró en GET 'tasks'")

      const paginationOptions:IPaginationOptions = {page, limit}
      if(page>0 && limit>0) return this.tasksService.findPaginated(paginationOptions, sort)
      else return this.tasksService.findAll(sort);
  }

  @Get(':id')
  findById(@Param('id', ParseIdPipe) id: string|number) {
    return this.tasksService.findById(id);
  }

  @Patch(':id')
  updateById(@Param('id', ParseIdPipe) id: string|number, @Body() updateTaskDto: UpdateTaskRequestDto) {
    return this.tasksService.updateById(id, updateTaskDto);
  }

  @Delete(':id')
  removeById(@Param('id', ParseIdPipe) id: string|number) {
    return this.tasksService.removeById(id);
  }
}
