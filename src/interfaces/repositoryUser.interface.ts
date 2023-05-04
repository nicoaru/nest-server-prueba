import { IRepository } from "./repository.interface";

export interface IRepositoryUser<T> extends IRepository<T> {

    existsByUsername(username:string):Promise<boolean>;

    existsByEmail(email:string):Promise<boolean>;

}