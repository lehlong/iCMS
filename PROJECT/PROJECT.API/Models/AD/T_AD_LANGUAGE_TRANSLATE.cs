using PROJECT.API.Models.Common;
using System.ComponentModel.DataAnnotations;

namespace PROJECT.API.Models.AD
{
    public class T_AD_LANGUAGE_TRANSLATE : InformationBase
    {
        [Key]
        public virtual Guid ID { get; set; }
        public virtual string KEY { get; set; }
        public virtual string CONTENT { get; set; }
        public virtual string LANGUAGE { get; set; }
    }
}
