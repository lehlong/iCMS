using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PROJECT.Core.Common
{
    public class BaseEntity
    {
        public DateTime? CREATE_DATE { get; set; }
        public string CREATE_BY { get; set; }
        public DateTime? UPDATE_DATE { get; set; }
        public string UPDATE_BY { get; set; }
    }
}
