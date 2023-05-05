import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { CreateUserRequestDto } from './dto/request/create-user-request.dto';
import { UpdateUserRequestDto } from './dto/request/update-user-request.dto';
import { DatabaseService } from 'src/database/database.service';
import { UserEntity } from 'src/entities/user.entity';
import { IRepositoryUser } from 'src/interfaces/repositoryUser.interface';
import { IPaginationOptions } from 'src/interfaces/paginationOptions.interface';
import { IRepositoryTask } from 'src/interfaces/repositoryTask.interface';
import { TaskEntity } from 'src/entities/task.entity';
import { DeleteUserResponseDto } from './dto/response/delete-user-response.dto';
import { UserResponseDto } from './dto/response/user-response.dto';
import { TaskResponseDto } from 'src/tasks/dto/response/task-response.dto';
import { getPaginationData } from 'src/utils/utils';
import { UserPageResponseDto } from './dto/response/user-page-response.dto';
import { TaskPageResponseDto } from 'src/tasks/dto/response/task-page-response.dto';


@Injectable()
export class UsersService {
  userRepository:IRepositoryUser<UserResponseDto>;
  taskRepository:IRepositoryTask<TaskResponseDto>
  
  constructor(private readonly databaseService:DatabaseService) {
    this.userRepository = this.databaseService.getUserRepository();
    this.taskRepository = this.databaseService.getTaskRepository();
  }


  //** METODOS **//
  //** METODOS **//
  async create(createUserDto: CreateUserRequestDto) {
    //chequea si ya existe un usuario con ese username o email
    if(await this.userRepository.existsByUsername(createUserDto.username) || await this.userRepository.existsByEmail(createUserDto.email)) throw new ConflictException("Username not available or Email already registered");
    
    return await this.userRepository.create(createUserDto);
  }
  
  async findAll(sort:string) {
    return await this.userRepository.findAll(sort);
  }


  async findPaginated(paginationOptions:IPaginationOptions, sort:string) {
    const totalDocs = await this.userRepository.countDocs();
    const {page, skip, limit, prevPage, nextPage} = getPaginationData(paginationOptions, totalDocs);
    
    const usersDtos:UserResponseDto[] = await this.userRepository.findPaginated(skip, limit, sort);
    
    const pageResponse = new UserPageResponseDto(usersDtos, totalDocs, page, prevPage, nextPage, limit);
    
    return pageResponse;
  }

  
  async findById(id: string|number) {
    const user = await this.userRepository.findById(id);
    if(!user) throw new NotFoundException("Not Found");
    return user
  }

  async findTasksByUserId(id: string|number, sort:string) {
    const tasks = await this.taskRepository.findAllByUserId(id, sort);

    return tasks;
  }

  async findTasksByUserIdPaginated(userId:string|number, paginationOptions:IPaginationOptions, sort) {
    //** El userId ya lo parseó el pipe
    const totalDocs = await this.taskRepository.countDocsByUserId(userId);
    const {page, skip, limit, prevPage, nextPage} = getPaginationData(paginationOptions, totalDocs);
    
    const tasksDtos:TaskResponseDto[] = await this.taskRepository.findPaginatedByUserId(userId, skip, limit, sort);
    
    const pageResponse = new TaskPageResponseDto(tasksDtos, totalDocs, page, prevPage, nextPage, limit);
    
    return pageResponse;
  }


  async updateById(id: string|number, updateUserDto: UpdateUserRequestDto) {
    //busca el user a actualizar y si no existe tira error 404
    const userToUpdate = await this.userRepository.findById(id);
    if(!userToUpdate) throw new NotFoundException("Not Found");

    //chequea si hay conflicto con los nuevos valores de username y password
    if(updateUserDto.email !== (userToUpdate).email) {
      if(await this.userRepository.existsByEmail(updateUserDto.email)) 
        throw new ConflictException("Email already registered");      
    }
    if(updateUserDto.username !== userToUpdate.username) {
      if(await this.userRepository.existsByUsername(updateUserDto.username)) 
        throw new ConflictException("Username not available");      
    }

    return await this.userRepository.updateById(id, updateUserDto);
  }

  async removeById(id: string|number) {
    if(!await this.userRepository.existsById(id)) throw new NotFoundException();

    const result = await this.userRepository.removeByIdWithTasks(id);
    return result;
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