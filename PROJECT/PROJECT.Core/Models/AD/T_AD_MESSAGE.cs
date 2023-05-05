using PROJECT.Core.Common;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PROJECT.Core.Models.AD
{
    public class T_AD_MESSAGE : BaseEntity
    {
        [Key]
        public string PKID { get; set; }
        public string CODE { get; set; }
        public string TYPE { get; set; }
        public string LANGUAGE { get; set; }
        public string MESSAGE { get; set; }
        public string MESSAGE_DETAIL { get; set; }
        public string ACTIVE { get; set; }
    }
}
