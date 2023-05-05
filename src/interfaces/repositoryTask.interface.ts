import { IPageResponse } from "./pageResponse.interface";
import { IPaginationOptions } from "./paginationOptions.interface";
import { IRepository } from "./repository.interface";

export interface IRepositoryTask<T> extends IRepository<T> {

    findAllByUserId(userId:string|number): Promise<T[]>
    findPaginatedByUserId(userId:string|number, paginationOptions:IPaginationOptions): Promise<IPageResponse<T>>

    removeByUserId(userId:string|number): Promise<Record<string, Object>>
}