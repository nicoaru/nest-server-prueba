import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { CreateUserRequestDto } from './dto/request/create-user-request.dto';
import { UpdateUserRequestDto } from './dto/request/update-user-request.dto';
import { DatabaseService } from 'src/database/database.service';
import { UserEntity } from 'src/database/entities/user.entity';
import { IRepositoryUser } from 'src/interfaces/repositoryUser.interface';
import { IPaginationOptions } from 'src/interfaces/paginationOptions.interface';
import { IRepositoryTask } from 'src/interfaces/repositoryTask.interface';
import { TaskEntity } from 'src/database/entities/task.entity';
import { DeleteUserResponseDto } from './dto/response/delete-user-response.dto';
import { UserResponseDto } from './dto/response/user-response.dto';
import { TaskResponseDto } from 'src/tasks/dto/response/task-response.dto';


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
  
  async findAll() {
    return await this.userRepository.findAll();
  }

  async findPaginated(paginationOptions:IPaginationOptions) {
    return await this.userRepository.findPaginated(paginationOptions)
  }

  
  async findById(id: string|number) {
    const user = await this.userRepository.findById(id);
    if(!user) throw new NotFoundException("Not Found");
    return user
  }

  async findTasksByUserId(id: string|number) {
    const tasks = await this.taskRepository.findAllByUserId(id);

    return tasks;
  }

  async findTasksByUserIdPaginated(id: string|number, paginationOptions:IPaginationOptions) {
    const tasks = await this.taskRepository.findPaginatedByUserId(id, paginationOptions);

    return tasks;
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