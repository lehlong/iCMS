using PROJECT.API.Models.Common;
using System.ComponentModel.DataAnnotations;

namespace PROJECT.API.Models.MD
{
    public class T_MD_NUMBER_RANGE :InformationBase
    {
        [Key]
        public virtual Guid ID { get; set; }
        public virtual string CHARACTER { get; set; }
        public virtual int CURRENT_NUMBER { get; set; }
    }
}
