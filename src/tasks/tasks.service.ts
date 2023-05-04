import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskRequestDto } from './dto/request/create-task-request.dto';
import { UpdateTaskRequestDto } from './dto/request/update-task-request.dto';
import { DatabaseService } from 'src/database/database.service';
import { TaskEntity } from 'src/database/entities/task.entity';
import { IRepositoryTask } from 'src/interfaces/repositoryTask.interface';
import { IRepositoryUser } from 'src/interfaces/repositoryUser.interface';


@Injectable()
export class TasksService {
  taskRepository:IRepositoryTask<TaskEntity>;
  userRepository:IRepositoryUser<any>;
  idParser:Function;

  constructor(private readonly databaseService:DatabaseService) {
    this.taskRepository = this.databaseService.getTaskRepository();
    this.userRepository = this.databaseService.getUserRepository();
    this.idParser = this.databaseService.getIdParser();
  }


  //** METODOS **//
  //** METODOS **//
  async create(createTaskDto: CreateTaskRequestDto) {
    //** Chequear que exista el user
    if(!this.idParser(createTaskDto.userId)) throw new BadRequestException("userId invalid format");
    if(!await this.userRepository.existsById(createTaskDto.userId)) throw new NotFoundException("User not found - Unexisting userId in database")
    
    return await this.taskRepository.create(createTaskDto);
  }
  
  async findAll() {
    return await this.taskRepository.findAll();
  }
  
  async findById(id: string|number) {
    const task = await this.taskRepository.findById(id);
    if(!task) throw new NotFoundException("Not Found");
    return task
  }

  async updateById(id: string|number, updateTaskDto: UpdateTaskRequestDto) {
    //** Chequear que exista el user
    if(!this.idParser(updateTaskDto.userId)) throw new BadRequestException("userId invalid format");
    if(!await this.userRepository.existsById(updateTaskDto.userId)) throw new NotFoundException("User not found - Unexisting userId in database")
    
    const updatedTask = await this.taskRepository.updateById(id, updateTaskDto);
    if(!updatedTask) throw new NotFoundException("Not Found");  
    return updatedTask
  }

  async removeById(id: string|number) {
    const deletedTask = await this.taskRepository.removeById(id);
    if(!deletedTask) throw new NotFoundException("Not Found");
    return deletedTask
  }
}