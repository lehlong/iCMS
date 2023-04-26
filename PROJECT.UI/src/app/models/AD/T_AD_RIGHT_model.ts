export interface T_AD_RIGHT{
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

export interface NodeRight{
    id:string,
    pId: string;
    name:string;
    checked:boolean;
    icon:string;
    open:boolean;
    companyCode: string
}
