using PROJECT.Core.Models.MD;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PROJECT.Services.Interfaces.MD
{
    public interface IUnitService
    {
        public Task<IEnumerable<T_MD_UNIT>> GetAll();
    }
}
