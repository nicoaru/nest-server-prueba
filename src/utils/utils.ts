import { IPaginationOptions } from "src/interfaces/paginationOptions.interface";
import { IPaginationSkipAndLimit } from "src/interfaces/paginationSkipAndLimit.interface";

export function getSkipAndLimitPagination(paginationOptions:IPaginationOptions):IPaginationSkipAndLimit {
    const {page, limit} = paginationOptions;
    const skip = page === 0 ? 0 : limit*(page-1);

    return {skip, limit}
}