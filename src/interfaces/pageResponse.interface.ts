export interface IPageResponse<T> {
    docs:T[],
    totalDocs:number,
    page:number,
    prevPage:number,
    nextPage:number,
    limit:number
}