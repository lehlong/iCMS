using PROJECT.Core.Common;
using System.ComponentModel.DataAnnotations;

namespace PROJECT.Core.Models.AD
{
    public class T_AD_ROLE_DETAIL : BaseEntity
    {
        [Key]
        public string FK_RIGHT { get; set; }
        public string FK_ROLE { get; set; }

    }
}
