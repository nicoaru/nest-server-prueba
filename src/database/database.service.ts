import { Injectable, Inject, Optional } from '@nestjs/common';
import { IRepositoryUser } from 'src/interfaces/repositoryUser.interface';
import { IRepositoryTask } from 'src/interfaces/repositoryTask.interface';
import { UserResponseDto } from 'src/users/dto/response/user-response.dto';
import { TaskResponseDto } from 'src/tasks/dto/response/task-response.dto';
import { CreateUserRequestDto } from 'src/users/dto/request/create-user-request.dto';
import { UpdateUserRequestDto } from 'src/users/dto/request/update-user-request.dto';
import { CreateTaskRequestDto } from 'src/tasks/dto/request/create-task-request.dto';
import { UpdateTaskRequestDto } from 'src/tasks/dto/request/update-task-request.dto';
import { IUser } from 'src/interfaces/user.interface';
import { ITask } from 'src/interfaces/task.interface';




@Injectable()
export class DatabaseService {
    constructor(
        @Optional() @Inject('USER_REPOSITORY') private readonly userRepository:IRepositoryUser<IUser, CreateUserRequestDto, UpdateUserRequestDto>,
        @Optional() @Inject('TASK_REPOSITORY') private readonly taskRepository:IRepositoryTask<ITask, CreateTaskRequestDto, UpdateTaskRequestDto>,
        @Optional() @Inject('ID_PARSER') private readonly idParser:Function,
    ) { }

    getUserRepository():IRepositoryUser<IUser, CreateUserRequestDto, UpdateUserRequestDto> {
        return this.userRepository;
    }

    getTaskRepository():IRepositoryTask<ITask, CreateTaskRequestDto, UpdateTaskRequestDto> {
        return this.taskRepository;
    }

    getIdParser():Function {
        return this.idParser;
    }

}



