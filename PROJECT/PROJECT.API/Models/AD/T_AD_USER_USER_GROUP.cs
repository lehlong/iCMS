using PROJECT.API.Models.Common;
using System.ComponentModel.DataAnnotations;

namespace PROJECT.API.Models.AD
{
    public class T_AD_USER_USER_GROUP : InformationBase
    {
        [Key]
        public virtual Guid ID { get; set; }
        public virtual string USER_NAME { get; set; }
        public virtual string USER_GROUP_CODE { get; set; }
    }
}
