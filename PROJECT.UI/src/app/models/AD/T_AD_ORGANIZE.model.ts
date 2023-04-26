export interface T_AD_ORGANIZE{
    PKID: string;
    COMPANY_CODE: string;
    PARENT: string;
    NAME: string;
    TYPE:string;
    C_ORDER : number;
    COST_CENTER_CODE: string;
    CREATE_BY: string;
    CREATE_DATE: Date;
    UPDATE_BY:string;
    UPDATE_DATE: Date;
}

export interface NodeOrganize{
    id:string,
    pId: string;
    name:string;
    checked:boolean;
    icon:string;
    open:boolean;
    companyCode: string
}
