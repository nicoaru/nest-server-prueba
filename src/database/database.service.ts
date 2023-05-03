import { Injectable, Inject, Optional } from '@nestjs/common';
import { Types } from 'mongoose';
import { IRepository } from 'src/interfaces/repository.interface';
import { UserEntity } from './entities/user.entity';


@Injectable()
export class DatabaseService {
    constructor(@Optional() @Inject('USER_REPOSITORY') private readonly userRepository:IRepository<UserEntity>) { }

    getUserRepository():IRepository<UserEntity> {
        return this.userRepository;
    }

    parseId(id: number|string): Types.ObjectId|false {
        try {
            return new Types.ObjectId(id);
        }
        catch(error) { return false }
    }

    getIdParser():Function {
        return this.parseId;
    }

}
