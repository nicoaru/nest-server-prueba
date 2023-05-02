import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './models/user.schema';
import { Task, TaskSchema } from './models/task.schema';
import { UserRepository } from './repositories/user.repository';

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
        User,
        Task,
        UserRepository
    ],
    exports: [
        MongooseModule,
        User,
        Task,
        UserRepository
    ]
})
export class MongoDBModule {}