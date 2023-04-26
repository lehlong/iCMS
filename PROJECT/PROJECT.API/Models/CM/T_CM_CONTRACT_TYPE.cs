using PROJECT.API.Models.Common;
using System.ComponentModel.DataAnnotations;

namespace PROJECT.API.Models.CM
{
    public class T_CM_CONTRACT_TYPE : InformationBase
    {
        [Key]
        public virtual string CODE { get; set; }
        public virtual string NAME { get; set; }
        public virtual bool IS_CUSTOMER { get; set; }
    }
}
