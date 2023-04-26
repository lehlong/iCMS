using PROJECT.API.Models.Common;
using System.ComponentModel.DataAnnotations;

namespace PROJECT.API.Models.MD
{
    public class T_MD_PROJECT_PROFILE : InformationBase
    {
        [Key]
        public virtual Guid ID { get; set; }
        public virtual string COMPANY_CODE { get; set; }
        public virtual string PROJECT_PROFILE { get; set; }
        public virtual string PROJECT_TYPE { get; set; }
        public virtual string FIRST_CHARACTER { get; set; }
    }
}
