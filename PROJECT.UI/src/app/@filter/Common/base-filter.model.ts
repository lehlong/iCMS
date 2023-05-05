export interface BaseFilter {
    CurrentPage: number;
    TotalPage: number;
    ItemCount: number;
    PageSize: number;
    KeySearch:string;
    Data: object;
}