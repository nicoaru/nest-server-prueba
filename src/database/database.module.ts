import { DynamicModule, Module } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { MongoDBModule } from './mongoDB/mongoDB.module';


@Module({})
export class DatabaseModule {

    static register(dbType: string): DynamicModule {
        let imports = [];
        switch (dbType) {
            case 'MongoDB':
                imports.push(MongoDBModule);
                break;
            default:
                throw new Error("No se definio un tipo de base de datos válida");
        }
        

        return {
          module: DatabaseModule,
          imports: imports,
          providers: [DatabaseService],
          exports: [DatabaseService],
        };
    }
}