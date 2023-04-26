using System.ComponentModel.DataAnnotations;

namespace PROJECT.API.Models.AD
{
    public class T_AD_CONFIG_TEXT_ELEMENT
    {
        [Key]
        public virtual Guid ID { get; set; }       
        public virtual string START_WORD { get; set; }
        public virtual string END_WORD { get; set; }

    }
}
