using System.ComponentModel.DataAnnotations;
using PROJECT.API.Models.Common;

namespace PROJECT.API.Models.MD
{
    public class T_MD_CUSTOMER : InformationBase
    {
        [Key]
        public virtual string CODE { get; set; }
        public virtual string NAME { get; set; }
        public virtual string SHORT_NAME { get; set; }
        public virtual string MST { get; set; }
        public virtual string EMAIL { get; set; }
        public virtual string PHONE { get; set; }
        public virtual string ADDRESS { get; set; }

    }
}
