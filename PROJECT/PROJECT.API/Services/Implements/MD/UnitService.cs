using AutoMapper;
using PROJECT.API.DATA.Common;
using PROJECT.API.DOMAIN.Models.MD;
using PROJECT.API.Services.Commons;
using PROJECT.API.Services.Dtos.MD;
using PROJECT.API.Services.Interfaces.MD;

namespace PROJECT.API.Services.Implements.MD
{
    public class UnitService : GenericService<T_MD_UNIT, T_MD_UNIT_Dto>, IUnitService
    {
        public UnitService(IUnitOfWork unitOfWork, IMapper mapper) : base(unitOfWork, mapper)
        {
        }
    }
}
