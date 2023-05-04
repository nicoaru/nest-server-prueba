import { Injectable, Inject, Optional, PipeTransform } from '@nestjs/common';
import { UserEntity } from './entities/user.entity';
import { IRepositoryUser } from 'src/interfaces/repositoryUser.interface';
import { TaskEntity } from './entities/task.entity';
import { IRepositoryTask } from 'src/interfaces/repositoryTask.interface';



@Injectable()
export class DatabaseService {
    constructor(
        @Optional() @Inject('USER_REPOSITORY') private readonly userRepository:IRepositoryUser<UserEntity>,
        @Optional() @Inject('TASK_REPOSITORY') private readonly taskRepository:IRepositoryTask<TaskEntity>,
        @Optional() @Inject('ID_PARSER') private readonly idParser:Function,
    ) { }

    getUserRepository():IRepositoryUser<UserEntity> {
        return this.userRepository;
    }

    getTaskRepository():IRepositoryTask<TaskEntity> {
        return this.taskRepository;
    }

    getIdParser():Function {
        return this.idParser;
    }

}



