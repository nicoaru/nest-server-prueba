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
import { CreateUserRequestDto } from 'src/users/dto/request/create-user-request.dto';
import { UpdateUserRequestDto } from 'src/users/dto/request/update-user-request.dto';
import { UserResponseDto } from 'src/users/dto/response/user-response.dto';
import { Mapper } from 'src/mappers/mapper';
import { ITask } from 'src/interfaces/task.interface';
import { IPageResponse } from 'src/interfaces/pageResponse.interface';


@Injectable()
export class TasksService {
  taskRepository:IRepositoryTask<TaskResponseDto, CreateTaskRequestDto, UpdateTaskRequestDto>;
  userRepository:IRepositoryUser<UserResponseDto, CreateUserRequestDto, UpdateUserRequestDto>;
  idParser:Function;

  constructor(
    private readonly databaseService:DatabaseService,
    private readonly mapper:Mapper
  ) {
    this.taskRepository = this.databaseService.getTaskRepository();
    this.userRepository = this.databaseService.getUserRepository();
    this.idParser = this.databaseService.getIdParser();
  }

  
  //** METODOS **//
  //** METODOS **//
  async create(createTaskDto: CreateTaskRequestDto):Promise<TaskResponseDto> {
    //** Chequea que exista el user y parsea al Id
    if(!this.idParser(createTaskDto.userId)) throw new BadRequestException("userId invalid format");
    if(!await this.userRepository.existsById(createTaskDto.userId)) throw new NotFoundException("User not found - Unexisting userId in database")
    
    const createdTask:ITask = await this.taskRepository.create(createTaskDto);
    const respDto:TaskResponseDto = this.mapper.taskToResponseDto(createdTask);
    return respDto;
  }
  
  async findAll(sort:string):Promise<TaskResponseDto[]> {
    
    const tasks:ITask[] = await this.taskRepository.findAll(sort);
    const respDtos:TaskResponseDto[] = this.mapper.taskArrayToResponseDto(tasks);
    return respDtos;
  }

  async findPaginated(paginationOptions:IPaginationOptions, sort:string):Promise<IPageResponse<TaskResponseDto>> {
    const totalDocs = await this.taskRepository.countDocs();
    const {page, skip, limit, prevPage, nextPage} = getPaginationData(paginationOptions, totalDocs);
    
    const tasks:ITask[] = await this.taskRepository.findPaginated(skip, limit, sort);
    const respDtos:TaskResponseDto[] = this.mapper.taskArrayToResponseDto(tasks);
    
    const pageResponse:IPageResponse<TaskResponseDto> = new TaskPageResponseDto(respDtos, totalDocs, page, prevPage, nextPage, limit);
    return pageResponse;
  }

  async findById(id: string|number):Promise<TaskResponseDto> {
    const task:ITask = await this.taskRepository.findById(id);
    if(!task) throw new NotFoundException("Not Found");
    const respDto:TaskResponseDto = this.mapper.taskToResponseDto(task);
    
    return respDto;
  }

  async findAllByUserId(userId:string|number, sort:string):Promise<TaskResponseDto[]> {
    //** El userId ya lo parseó el pipe
    const tasks:ITask[] = await this.taskRepository.findAllByUserId(userId, sort);
    const respDtos:TaskResponseDto[] = this.mapper.taskArrayToResponseDto(tasks);
    
    return respDtos;
  }

  async findPaginatedByUserId(userId:string|number, paginationOptions:IPaginationOptions, sort:string) {
    //** El userId ya lo parseó el pipe
    const totalDocs = await this.taskRepository.countDocsByUserId(userId);
    const {page, skip, limit, prevPage, nextPage} = getPaginationData(paginationOptions, totalDocs);
    
    const tasks:ITask[] = await this.taskRepository.findPaginatedByUserId(userId, skip, limit, sort);
    const respDtos:TaskResponseDto[] = this.mapper.taskArrayToResponseDto(tasks);

    
    const pageResponse:IPageResponse<TaskResponseDto> = new TaskPageResponseDto(respDtos, totalDocs, page, prevPage, nextPage, limit);
    
    return pageResponse;
  }

  async updateById(id: string|number, updateTaskDto: UpdateTaskRequestDto) {
    //** Chequear que exista el user
    if(!this.idParser(updateTaskDto.userId)) throw new BadRequestException("userId invalid format");
    if(updateTaskDto.userId && ! await this.userRepository.existsById(updateTaskDto.userId)) throw new NotFoundException("User not found - Unexisting userId in database")
    
    const updatedTask:ITask = await this.taskRepository.updateById(id, updateTaskDto);
    if(!updatedTask) throw new NotFoundException("Not Found");

    const respDto:TaskResponseDto = this.mapper.taskToResponseDto(updatedTask);
    return respDto;
  }

  async removeById(id: string|number) {
    const deletedTask:ITask = await this.taskRepository.removeById(id);
    if(!deletedTask) throw new NotFoundException("Not Found");

    const respDto:TaskResponseDto = this.mapper.taskToResponseDto(deletedTask);
    return respDto;
  }
}