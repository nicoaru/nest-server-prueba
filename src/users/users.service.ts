import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { CreateUserRequestDto } from './dto/request/create-user-request.dto';
import { UpdateUserRequestDto } from './dto/request/update-user-request.dto';
import { DatabaseService } from 'src/database/database.service';
import { IRepositoryUser } from 'src/interfaces/repositoryUser.interface';
import { IPaginationOptions } from 'src/interfaces/paginationOptions.interface';
import { IRepositoryTask } from 'src/interfaces/repositoryTask.interface';
import { UserResponseDto } from './dto/response/user-response.dto';
import { TaskResponseDto } from 'src/tasks/dto/response/task-response.dto';
import { getPaginationData } from 'src/utils/utils';
import { UserPageResponseDto } from './dto/response/user-page-response.dto';
import { TaskPageResponseDto } from 'src/tasks/dto/response/task-page-response.dto';
import { CreateTaskRequestDto } from 'src/tasks/dto/request/create-task-request.dto';
import { UpdateTaskRequestDto } from 'src/tasks/dto/request/update-task-request.dto';
import { Mapper } from 'src/mappers/mapper';
import { IUser } from 'src/interfaces/user.interface';
import { ITask } from 'src/interfaces/task.interface';
import { IPageResponse } from 'src/interfaces/pageResponse.interface';
import { DeleteUserResponseDto } from './dto/response/delete-user-response.dto';


@Injectable()
export class UsersService {
  userRepository:IRepositoryUser<IUser, CreateUserRequestDto, UpdateUserRequestDto>;
  taskRepository:IRepositoryTask<ITask, CreateTaskRequestDto, UpdateTaskRequestDto>;
  
  constructor(
    private readonly databaseService:DatabaseService,
    private readonly mapper:Mapper) {
    this.userRepository = this.databaseService.getUserRepository();
    this.taskRepository = this.databaseService.getTaskRepository()
  }


  //** METODOS **//
  //** METODOS **//
  async create(createUserDto: CreateUserRequestDto):Promise<UserResponseDto> {
    //chequea si ya existe un usuario con ese username o email
    if(await this.userRepository.existsByUsername(createUserDto.username) || await this.userRepository.existsByEmail(createUserDto.email)) throw new ConflictException("Username not available or Email already registered");
    
    const createdUser = await this.userRepository.create(createUserDto);
    const respDto = this.mapper.userToResponseDto(createdUser);
    return respDto;
  }
  
  async findAll(sort:string):Promise<UserResponseDto[]> {
    const users = await this.userRepository.findAll(sort);
    const respDto = this.mapper.userArrayToResponseDto(users);
    return respDto;
  }


  async findPaginated(paginationOptions:IPaginationOptions, sort:string):Promise<IPageResponse<UserResponseDto>> {
    const totalDocs = await this.userRepository.countDocs();
    const {page, skip, limit, prevPage, nextPage} = getPaginationData(paginationOptions, totalDocs);
    
    const users:IUser[] = await this.userRepository.findPaginated(skip, limit, sort);
    const respDtos:UserResponseDto[] = this.mapper.userArrayToResponseDto(users);

    const pageResponse = new UserPageResponseDto(respDtos, totalDocs, page, prevPage, nextPage, limit);
    return pageResponse;
  }

  
  async findById(id: string|number):Promise<UserResponseDto> {
    const user = await this.userRepository.findById(id);
    if(!user) throw new NotFoundException("Not Found");
    
    const respDto = this.mapper.userToResponseDto(user);
    return respDto;
  }

  async findTasksByUserId(id: string|number, sort:string):Promise<TaskResponseDto[]> {
    const tasks = await this.taskRepository.findAllByUserId(id, sort);

    const respDtos = this.mapper.taskArrayToResponseDto(tasks);
    return respDtos;
  }

  async findTasksByUserIdPaginated(userId:string|number, paginationOptions:IPaginationOptions, sort:string):Promise<IPageResponse<TaskResponseDto>> {
    //** El userId ya lo parseó el pipe
    const totalDocs = await this.taskRepository.countDocsByUserId(userId);
    const {page, skip, limit, prevPage, nextPage} = getPaginationData(paginationOptions, totalDocs);
    
    const tasks:TaskResponseDto[] = await this.taskRepository.findPaginatedByUserId(userId, skip, limit, sort);
    const respDtos:TaskResponseDto[] = this.mapper.taskArrayToResponseDto(tasks);

    const pageResponse = new TaskPageResponseDto(respDtos, totalDocs, page, prevPage, nextPage, limit);
    
    return pageResponse;
  }


  async updateById(id: string|number, updateUserDto: UpdateUserRequestDto):Promise<UserResponseDto> {
    //busca el user a actualizar y si no existe tira error 404
    const userToUpdate = await this.userRepository.findById(id);
    if(!userToUpdate) throw new NotFoundException("Not Found");

    //chequea si hay conflicto con los nuevos valores de username y password
    if(updateUserDto.email !== userToUpdate.email) {
      if(await this.userRepository.existsByEmail(updateUserDto.email)) 
        throw new ConflictException("Email already registered");      
    }
    if(updateUserDto.username !== userToUpdate.username) {
      if(await this.userRepository.existsByUsername(updateUserDto.username)) 
        throw new ConflictException("Username not available");      
    }

    const updatedUser:IUser = await this.userRepository.updateById(id, updateUserDto);
    const respDto:UserResponseDto = this.mapper.userToResponseDto(updatedUser);
    return respDto;
  }

  async removeById(id: string|number):Promise<DeleteUserResponseDto> {
    //busca si existe el user
    if(!await this.userRepository.existsById(id)) throw new NotFoundException();
    //busca cuantas tasks relacionadas tiene
    const countTasks = await this.taskRepository.countDocsByUserId(id);
    //elimina el user junto con las tasks relacionadas
    const deletedUser:IUser = await this.userRepository.removeByIdWithTasks(id);
    const respDto:UserResponseDto = this.mapper.userToResponseDto(deletedUser);

    const respDeleteUser = new DeleteUserResponseDto(respDto, countTasks);
    return respDeleteUser;
  }
}

/*
    const deletedUser = await this.userRepository.removeById(id);
    if(!deletedUser) throw new NotFoundException("Not Found");

    let resultDeletTasks = await this.taskRepository.removeByUserId(id);
    console.log("Tasks pertenecientes al usuario eliminados: ", resultDeletTasks)

    const deletDto = new DeleteUserResponseDto;
    deletDto.deletedDoc = deletedUser;
    deletDto.deletedTasks = +resultDeletTasks.deletedCount;

    return deletDto;
*/