using PROJECT.API.DOMAIN.Common;
using System.ComponentModel.DataAnnotations;

namespace PROJECT.API.DOMAIN.Models.AD
{
    public class T_AD_RIGHT : BaseEntity
    {
        [Key]
        public string CODE { get; set; }
        public string NAME { get; set; }
        public string PARENT { get; set; }
        public int C_ORDER { get; set; }

    }
}
