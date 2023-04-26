using Microsoft.EntityFrameworkCore;
using PROJECT.API.Models.Common;
using System.ComponentModel.DataAnnotations;

namespace PROJECT.API.Models.AD
{
    public class T_AD_ROLE_DETAIL : InformationBase
    {
        [Key]
        public virtual string FK_RIGHT { get; set; }
        public virtual string FK_ROLE { get; set; }

    }
}
