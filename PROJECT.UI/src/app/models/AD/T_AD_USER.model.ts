import { T_MD_TITLE } from "../MD/T_MD_TITLE.model";
import { T_AD_ORGANIZE } from "./T_AD_ORGANIZE.model";

export interface T_AD_USER{
    USER_NAME: string;
    PASSWORD: string;
    ACCOUNT_AD: string;
    FULL_NAME: string;
    EMAIL:string;
    ADDRESS : string;
    PHONE: string;
    NOTES:string;
    ACTIVE: string;
    OTP_VERIFY: string;
    USER_TYPE: string;
    TITLE_CODE: string;
    COMPANY_ID: string;
    IS_MODIFY_RIGHT: string;
    VENDOR_CODE: string;
    USER_SAP: string;
    PASSWORD_SAP: string;
    LAST_CHANGE_PASS_DATE: Date;
    CREATE_BY: string;
    CREATE_DATE: Date;
    UPDATE_BY:string;
    UPDATE_DATE: Date;
}