using Microsoft.EntityFrameworkCore;
using PROJECT.API.Models.Common;
using System.ComponentModel.DataAnnotations;

namespace PROJECT.API.Models.AD
{
    public class T_AD_USER_RIGHT : InformationBase
    {
        [Key]
        public virtual Guid ID { get; set; }
        public virtual string USER_NAME { get; set; }
        public virtual string FK_RIGHT { get; set; }
        public virtual string IS_ADD { get; set; }
        public virtual string IS_REMOVE { get; set; }

    }
}
