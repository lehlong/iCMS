using Microsoft.EntityFrameworkCore.Metadata.Internal;
using PROJECT.API.Models.Common;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PROJECT.API.Models.CM
{
    public class T_CM_TEMPLATE_CONTRACT : InformationBase
    {
        [Key]
        public virtual Guid ID { get; set; }
        public virtual string FILE_NAME { get; set; }
        public virtual string FILE_OLD_NAME { get; set; }
        public virtual string PATH_FILE { get; set; }
        public virtual string FULL_PATH { get; set; }
        public virtual string CONTRACT_TYPE { get; set; }

    }
}
