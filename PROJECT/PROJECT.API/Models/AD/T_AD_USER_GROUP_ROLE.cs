using PROJECT.API.Models.Common;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PROJECT.API.Models.AD
{
    public class T_AD_USER_GROUP_ROLE : InformationBase
    {
        public virtual string USER_GROUP_CODE { get; set; }
        [Key]
        public virtual string ROLE_CODE { get; set; }

        [ForeignKey("ROLE_CODE")]
        public virtual T_AD_ROLE Role { get; set; }
    }
}
