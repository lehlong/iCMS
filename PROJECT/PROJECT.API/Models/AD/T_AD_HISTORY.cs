using Microsoft.EntityFrameworkCore;
using PROJECT.API.Models.Common;
using System.ComponentModel.DataAnnotations;

namespace PROJECT.API.Models.AD
{
    public class T_AD_HISTORY
    {
        [Key]
        public virtual Guid ID { get; set; }
        public virtual string UPDATE_BY { get; set; }
        public virtual DateTime UPDATE_DATE { get; set; }
        public virtual string AREA { get; set; }
        public virtual string OLD_VALUE { get; set; }
        public virtual string VALUE { get; set; }
        public virtual string ACTION { get; set; }
        public virtual string TITLE { get; set; }

    }
}
