using PROJECT.API.DOMAIN.Common;
using System.ComponentModel.DataAnnotations;

namespace PROJECT.API.DOMAIN.Models.AD
{
    public class T_AD_ROLE_DETAIL : BaseEntity
    {
        [Key]
        public string FK_RIGHT { get; set; }
        public string FK_ROLE { get; set; }

    }
}
