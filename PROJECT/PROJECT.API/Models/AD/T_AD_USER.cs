using PROJECT.API.Models.Common;
using PROJECT.API.Models.MD;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PROJECT.API.Models.AD
{
    public class T_AD_USER : InformationBase
    {
        [Key]
        public virtual string USER_NAME { get; set; }
        public virtual string PASSWORD { get; set; }
        public virtual string ACCOUNT_AD { get; set; }
        public virtual string FULL_NAME { get; set; }
        public virtual string EMAIL { get; set; }
        public virtual string ADDRESS { get; set; }
        public virtual string PHONE { get; set; }
        public virtual string NOTES { get; set; }
        public virtual string ACTIVE { get; set; }
        public virtual string OTP_VERIFY { get; set; }
        public virtual string USER_TYPE { get; set; }        
        public virtual string TITLE_CODE { get; set; }
        public virtual string COMPANY_ID { get; set; }
        public virtual string IS_MODIFY_RIGHT { get; set; }
        public virtual string VENDOR_CODE { get; set; }
        public virtual string USER_SAP { get; set; }
        public virtual string PASSWORD_SAP { get; set; }
        public virtual DateTime? LAST_CHANGE_PASS_DATE { get; set; }
       
    }

}
