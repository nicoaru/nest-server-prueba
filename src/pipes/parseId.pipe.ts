import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Types } from 'mongoose';

@Injectable()
export class ParseIdPipe implements PipeTransform {
  dbType:string;
  
  constructor(private readonly configService:ConfigService) {
    this.dbType = configService.get<string>('DB_TYPE');
  }

  transform(value: any, metadata: ArgumentMetadata) {
    switch (this.dbType) {
      case 'MongoDB':
          try {
            return new Types.ObjectId(value);
          }
          catch(error) { 
            throw new BadRequestException("Invalid Id type - "+error.message);
          }          
    
      default:
        break;
    }

  }
}