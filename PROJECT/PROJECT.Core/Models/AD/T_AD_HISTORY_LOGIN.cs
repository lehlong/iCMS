using PROJECT.Core.Common;
using System.ComponentModel.DataAnnotations;

namespace PROJECT.Core.Models.AD
{
    public class T_AD_HISTORY_LOGIN : BaseEntity
    {
        [Key]
        public Guid ID { get; set; }
        public string USER_NAME { get; set; }
        public string FULL_NAME { get; set; }
        public string OS { get; set; }
        public DateTime LOGIN_TIME { get; set; }
        public string BROWSER { get; set; }
        public string IP_ADDRESS { get; set; }
        public string CONNECTION_ID { get; set; }
    }
}
