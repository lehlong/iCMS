using PROJECT.API.Models.Common;
using System.ComponentModel.DataAnnotations;

namespace PROJECT.API.Models.MD
{
    public class T_MD_TITLE : InformationBase
    {
        [Key]
        public virtual string CODE { get; set; }
        public virtual string NAME { get; set; }
        public virtual bool? ACTIVE { get; set; }
    }
}
