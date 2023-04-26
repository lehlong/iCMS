using PROJECT.API.Models.Common;
using System.ComponentModel.DataAnnotations;

namespace PROJECT.API.Models.AD
{
    public class T_AD_MESSAGE: InformationBase
    {
        [Key]
        public virtual string PKID { get; set; }
        public virtual string CODE { get; set; }
        public virtual string LANGUAGE { get; set; }
        public virtual string MESSAGE { get; set; }
        public virtual string ACTIVE { get; set; }
    }
}
