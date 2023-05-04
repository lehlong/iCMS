using PROJECT.Core.Common;
using System.ComponentModel.DataAnnotations;

namespace PROJECT.Core.Models.AD
{
    public class T_AD_USER_USER_GROUP : BaseEntity
    {
        [Key]
        public Guid ID { get; set; }
        public string USER_NAME { get; set; }
        public string USER_GROUP_CODE { get; set; }
    }
}
