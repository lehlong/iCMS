using Microsoft.EntityFrameworkCore;
using PROJECT.API.Models.Common;
using System.ComponentModel.DataAnnotations;

namespace PROJECT.API.Models.AD
{
    public class T_AD_RIGHT : InformationBase
    {
        [Key]
        public virtual string CODE { get; set; }
        public virtual string NAME { get; set; }
        public virtual string PARENT { get; set; }
        public virtual int C_ORDER { get; set; }

    }
}
