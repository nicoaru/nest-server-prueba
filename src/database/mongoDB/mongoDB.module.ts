import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './models/user.schema.mongo';
import { Task, TaskSchema } from './models/task.schema.mongo';
import { UserRepositoryMongo } from './repositories/user.repository.mongo';
import { TaskRepositoryMongo } from './repositories/task.repository.mongo';

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
        }
    ],
    exports: [
        MongooseModule,
        'USER_REPOSITORY',
        'TASK_REPOSITORY',
    ]
})
export class MongoDBModule {}