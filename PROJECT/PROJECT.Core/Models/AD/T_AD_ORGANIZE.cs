using PROJECT.Core.Common;
using System.ComponentModel.DataAnnotations;

namespace PROJECT.Core.Models.AD
{
    public class T_AD_ORGANIZE : BaseEntity
    {
        [Key]
        public string PKID { get; set; }
        public string COMPANY_CODE { get; set;}     
        public string PARENT { get; set;}
        public string NAME { get; set;} 
        public string TYPE { get; set;}
        public int  C_ORDER { get; set;}
        public string COST_CENTER_CODE { get; set;}

    }
}
