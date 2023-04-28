using PROJECT.API.DOMAIN.Common;
using System.ComponentModel.DataAnnotations;

namespace PROJECT.API.DOMAIN.Models.AD
{
    public class T_AD_ROLE : BaseEntity
    {
        [Key]
        public string CODE { get; set; }
        public string NAME { get; set; }
        public string NOTES { get; set; }
        public string ACTIVE { get; set; }

    }
}
