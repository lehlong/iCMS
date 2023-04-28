using PROJECT.API.DOMAIN.Common;
using System.ComponentModel.DataAnnotations;

namespace PROJECT.API.DOMAIN.Models.MD
{
    public class T_MD_UNIT : BaseEntity
    {
        [Key]
        public string CODE { get; set; }
        public string NAME { get; set; }
        public string SKF { get; set; }
    }
}
