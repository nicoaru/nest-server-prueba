import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './models/user.schema.mongo';
import { Task, TaskSchema } from './models/task.schema.mongo';
import { UserRepositoryMongo } from './repositories/user.repository.mongo';
import { TaskRepositoryMongo } from './repositories/task.repository.mongo';
import { Types } from 'mongoose';


@Module({
    imports: [
        ConfigModule,
        MongooseModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => ({
            uri: configService.get<string>('MONGODB_URI'),
            })
        }),
        MongooseModule.forFeature([
            {name: User.name, schema: UserSchema}, 
            {name: Task.name, schema: TaskSchema}
        ])
    ],
    providers: [
        {
            provide: 'USER_REPOSITORY',
            useClass: UserRepositoryMongo
        },
        {
            provide: 'TASK_REPOSITORY',
            useClass: TaskRepositoryMongo
        },
        {
            provide: 'ID_PARSER',
            useValue: (id: number|string):Types.ObjectId => {
                try {
                    return new Types.ObjectId(id);
                  }
                  catch(error) { 
                    return null;
                }   
            }
        },
    ],
    exports: [
        MongooseModule,
        'USER_REPOSITORY',
        'TASK_REPOSITORY',
        'ID_PARSER'
    ]
})
export class MongoDBModule {}


/*
    useValue: (id: number|string):Promise<Types.ObjectId> => {
        return new Promise((res, rej) => {
            try {
                res(new Types.ObjectId(id));
            }
            catch(error) { rej(error) }                    
        })
    }
*/
/*
    {
        provide: 'ID_PARSER',
        useValue: (id: number|string):Types.ObjectId => {
            try {
                return new Types.ObjectId(id);
                }
                catch(error) { 
                return null;
            }   
        }
    }
*/