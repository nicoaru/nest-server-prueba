import { IPageResponse } from "./pageResponse.interface";
import { IPaginationOptions } from "./paginationOptions.interface";

export interface IRepository<T> {

    create(createDTO:any):Promise<T>;

    findAll():Promise<T[]>;

    findPaginated(paginationOptions:IPaginationOptions):Promise<IPageResponse<T>>;

    findById(id:string|number):Promise<T>;

    updateById(id:string|number, updateDTO:any):Promise<T>;

    removeById(id:string|number):Promise<T>;

    existsById(id:string|number):Promise<boolean>;

}
