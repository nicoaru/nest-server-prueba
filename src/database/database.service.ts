import { Injectable, Inject, Optional } from '@nestjs/common';
import { IRepositoryUser } from 'src/interfaces/repositoryUser.interface';
import { IRepositoryTask } from 'src/interfaces/repositoryTask.interface';
import { UserResponseDto } from 'src/users/dto/response/user-response.dto';
import { TaskResponseDto } from 'src/tasks/dto/response/task-response.dto';




@Injectable()
export class DatabaseService {
    constructor(
        @Optional() @Inject('USER_REPOSITORY') private readonly userRepository:IRepositoryUser<UserResponseDto>,
        @Optional() @Inject('TASK_REPOSITORY') private readonly taskRepository:IRepositoryTask<TaskResponseDto>,
        @Optional() @Inject('ID_PARSER') private readonly idParser:Function,
    ) { }

    getUserRepository():IRepositoryUser<UserResponseDto> {
        return this.userRepository;
    }

    getTaskRepository():IRepositoryTask<TaskResponseDto> {
        return this.taskRepository;
    }

    getIdParser():Function {
        return this.idParser;
    }

}



