using PROJECT.Core.Common;
using System.ComponentModel.DataAnnotations;

namespace PROJECT.Core.Models.AD
{
    public class T_AD_LANGUAGE_TRANSLATE : BaseEntity
    {
        [Key]
        public Guid ID { get; set; }
        public string KEY { get; set; }
        public string CONTENT { get; set; }
        public string LANGUAGE { get; set; }
    }
}
