using PROJECT.Core.Common;
using System.ComponentModel.DataAnnotations;
namespace PROJECT.Core.Models.MD
{
    public class T_MD_UNIT : BaseEntity
    {
        [Key]
        public virtual string CODE { get; set; }
        public virtual string NAME { get; set; }
        public virtual string SKF { get; set; }
    }
}
