using Microsoft.EntityFrameworkCore.Metadata.Internal;
using PROJECT.API.Models.Common;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PROJECT.API.Models.CM
{
    public class T_CM_TEMPLATE_TEXT_ELEMENT: InformationBase
    {
        [Key]
        public virtual Guid ID { get; set; }
        public virtual string TEXT_ELEMENT { get; set; }
        public virtual Guid TEMPLATE_ID { get; set; }

    }
}
