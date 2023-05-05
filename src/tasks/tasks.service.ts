import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskRequestDto } from './dto/request/create-task-request.dto';
import { UpdateTaskRequestDto } from './dto/request/update-task-request.dto';
import { DatabaseService } from 'src/database/database.service';
import { IRepositoryTask } from 'src/interfaces/repositoryTask.interface';
import { IRepositoryUser } from 'src/interfaces/repositoryUser.interface';
import { IPaginationOptions } from 'src/interfaces/paginationOptions.interface';
import { TaskResponseDto } from './dto/response/task-response.dto';
import { getPaginationData } from 'src/utils/utils';
import { TaskPageResponseDto } from './dto/response/task-page-response.dto';


@Injectable()
export class TasksService {
  taskRepository:IRepositoryTask<TaskResponseDto>;
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
    //** Chequea que exista el user y parsea al Id
    if(!this.idParser(createTaskDto.userId)) throw new BadRequestException("userId invalid format");
    if(!await this.userRepository.existsById(createTaskDto.userId)) throw new NotFoundException("User not found - Unexisting userId in database")
    
    return await this.taskRepository.create(createTaskDto);
  }
  
  async findAll(sort:string) {
    return await this.taskRepository.findAll(sort);
  }

  async findPaginated(paginationOptions:IPaginationOptions, sort:string) {
    const totalDocs = await this.taskRepository.countDocs();
    const {page, skip, limit, prevPage, nextPage} = getPaginationData(paginationOptions, totalDocs);
    
    const tasksDtos:TaskResponseDto[] = await this.taskRepository.findPaginated(skip, limit, sort);
    
    const pageResponse = new TaskPageResponseDto(tasksDtos, totalDocs, page, prevPage, nextPage, limit);
    
    return pageResponse;
  }

  
  async findById(id: string|number) {
    const task = await this.taskRepository.findById(id);
    if(!task) throw new NotFoundException("Not Found");
    return task
  }

  async findAllByUserId(userId:string|number, sort:string) {
    //** El userId ya lo parseó el pipe
    return await this.taskRepository.findAllByUserId(userId, sort)
  }

  async findPaginatedByUserId(userId:string|number, paginationOptions:IPaginationOptions, sort:string) {
    //** El userId ya lo parseó el pipe
    const totalDocs = await this.taskRepository.countDocsByUserId(userId);
    const {page, skip, limit, prevPage, nextPage} = getPaginationData(paginationOptions, totalDocs);
    
    const tasksDtos:TaskResponseDto[] = await this.taskRepository.findPaginatedByUserId(userId, skip, limit, sort);
    
    const pageResponse = new TaskPageResponseDto(tasksDtos, totalDocs, page, prevPage, nextPage, limit);
    
    return pageResponse;
  }

  async updateById(id: string|number, updateTaskDto: UpdateTaskRequestDto) {
    //** Chequear que exista el user
    if(!this.idParser(updateTaskDto.userId)) throw new BadRequestException("userId invalid format");
    if(updateTaskDto.userId && ! await this.userRepository.existsById(updateTaskDto.userId)) throw new NotFoundException("User not found - Unexisting userId in database")
    
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