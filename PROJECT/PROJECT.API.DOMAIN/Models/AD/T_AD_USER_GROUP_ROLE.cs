using PROJECT.API.DOMAIN.Common;
using System.ComponentModel.DataAnnotations;

namespace PROJECT.API.DOMAIN.Models.AD
{
    public class T_AD_USER_GROUP_ROLE : BaseEntity
    {
        public string USER_GROUP_CODE { get; set; }
        [Key]
        public string ROLE_CODE { get; set; }

    }
}
