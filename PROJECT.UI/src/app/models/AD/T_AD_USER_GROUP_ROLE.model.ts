import { T_AD_ROLE } from "./T_AD_ROLE.model";

export interface T_AD_USER_GROUP_ROLE{
    USER_GROUP_CODE: string;
    ROLE_CODE: string;
    CREATE_BY: string;
    CREATE_DATE: Date;
    UPDATE_BY:string;
    UPDATE_DATE: Date;
    Role: T_AD_ROLE;
}
