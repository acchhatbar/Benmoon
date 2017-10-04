export interface ICategory {
    CategoryID: number,
    ParentCategoryID: number,
    CategoryCode: string,
    CategoryName: string,
    CategoryDesc: string,
    CategoryImage: string,
    DisplayOrder: number,
    IsActive: boolean,
    CommandID: number,
    CreateBy: number,
    CreateDate: string,
    CreateIP: string,
    UpdateBy: number,
    UpdateDate: string,
    UpdateIP: string
}