import { IPaginationOptions } from "src/interfaces/paginationOptions.interface";

export function getPaginationData(paginationOptions:IPaginationOptions, totalDocs:number):IPaginationData {
    const {page, limit} = paginationOptions;
    const skip = page === 0 ? 0 : limit*(page-1);
    const prevPage = page>1 ? page-1 : null;
    const nextPage = (page*limit)>=totalDocs ? null : page+1;

    return {page, skip, limit, prevPage, nextPage}
}

export interface IPaginationData {
    page:number;
    skip:number;
    limit:number;
    prevPage:number;
    nextPage:number;
}