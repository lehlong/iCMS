using PROJECT.API.DOMAIN.Common;
using System.ComponentModel.DataAnnotations;

namespace PROJECT.API.DOMAIN.Models.AD
{
    public class T_AD_USER_RIGHT : BaseEntity
    {
        [Key]
        public Guid ID { get; set; }
        public string USER_NAME { get; set; }
        public string FK_RIGHT { get; set; }
        public string IS_ADD { get; set; }
        public string IS_REMOVE { get; set; }

    }
}
