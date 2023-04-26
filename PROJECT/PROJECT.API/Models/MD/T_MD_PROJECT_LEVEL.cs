using PROJECT.API.Models.Common;
using System.ComponentModel.DataAnnotations;

namespace PROJECT.API.Models.MD
{
    public class T_MD_PROJECT_LEVEL : InformationBase
    {
        [Key]
        public virtual string CODE { get; set; }
        public virtual string NAME { get; set; }
        public virtual string VALUE_FROM { get; set; }
        public virtual string VALUE_TO { get; set; }
        public virtual string THOI_GIAN { get; set; }
        public virtual string NOTES { get; set; }
    }
}
