import { IPageResponse } from "./pageResponse.interface";
import { IPaginationOptions } from "./paginationOptions.interface";
import { IRepository } from "./repository.interface";

export interface IRepositoryTask<T> extends IRepository<T> {

    findAllByUserId(userId:string|number, sort:string): Promise<T[]>

    findPaginatedByUserId(userId:string|number, skip:number, limit:number, sort:string):Promise<T[]>

    removeByUserId(userId:string|number): Promise<Record<string, Object>>

    countDocsByUserId(userId:string|number):Promise<number>;
}