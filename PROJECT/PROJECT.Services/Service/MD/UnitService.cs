using PROJECT.Core.Common;
using PROJECT.Core.Models.MD;
using PROJECT.Infrastructure.Common;
using PROJECT.Services.Interfaces.MD;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PROJECT.Services.Service.MD
{
    public class UnitService : IUnitService
    {
        public IUnitOfWork UnitOfWork;
        public UnitService(IUnitOfWork unitOfWork)
        {
            UnitOfWork = unitOfWork;
        }

        public async Task<IEnumerable<T_MD_UNIT>> GetAll()
            => await UnitOfWork.Unit.GetAllAsync();
    }
}
