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
        Task<bool> CreateUnit(T_MD_UNIT unit);

        Task<IEnumerable<T_MD_UNIT>> GetAllUnits();

        Task<T_MD_UNIT> GetUnitById(int UnitId);

        Task<bool> UpdateUnit(T_MD_UNIT unit);

        Task<bool> DeleteUnit(int UnitId);
    }
}
