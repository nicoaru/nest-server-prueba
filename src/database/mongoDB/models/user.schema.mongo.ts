import { Injectable } from '@nestjs/common';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { IUser } from 'src/interfaces/user.interface';

export type UserDocument = HydratedDocument<User>;

@Injectable()
@Schema()
export class User implements IUser {

  _id:string|number;
  
  @Prop({required: true, unique: true})
  username: string;

  @Prop({required: true, unique: true})
  email: string;

  @Prop({required: true})
  password: string;

}


export const UserSchema = SchemaFactory.createForClass(User);