using PROJECT.Core.Common;
using System.ComponentModel.DataAnnotations;

namespace PROJECT.Core.Models.AD
{
    public class T_AD_USER : BaseEntity
    {
        [Key]
        public string USER_NAME { get; set; }
        public string PASSWORD { get; set; }
        public string ACCOUNT_AD { get; set; }
        public string FULL_NAME { get; set; }
        public string EMAIL { get; set; }
        public string ADDRESS { get; set; }
        public string PHONE { get; set; }
        public string NOTES { get; set; }
        public string ACTIVE { get; set; }
        public string OTP_VERIFY { get; set; }
        public string USER_TYPE { get; set; }
        public string TITLE_CODE { get; set; }
        public string COMPANY_ID { get; set; }
        public string IS_MODIFY_RIGHT { get; set; }
        public string VENDOR_CODE { get; set; }
        public string USER_SAP { get; set; }
        public string PASSWORD_SAP { get; set; }
        public DateTime? LAST_CHANGE_PASS_DATE { get; set; }
    }
}
