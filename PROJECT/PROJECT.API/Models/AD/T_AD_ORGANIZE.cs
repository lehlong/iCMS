using Microsoft.EntityFrameworkCore;
using PROJECT.API.Models.Common;
using System.ComponentModel.DataAnnotations;

namespace PROJECT.API.Models.AD
{
    public class T_AD_ORGANIZE : InformationBase
    {
        [Key]
        public virtual string PKID { get; set; }
        public virtual string COMPANY_CODE { get; set;}     
        public virtual string PARENT { get; set;}
        public virtual string NAME { get; set;} 
        public virtual string TYPE { get; set;}
        public virtual int  C_ORDER { get; set;}
        public virtual string COST_CENTER_CODE { get; set;}

    }
}
