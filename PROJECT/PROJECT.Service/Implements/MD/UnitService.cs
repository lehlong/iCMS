using AutoMapper;
using PROJECT.Core;
using PROJECT.Core.Models.MD;
using PROJECT.Service.Commons;
using PROJECT.Service.Dtos.MD;
using PROJECT.Service.Interfaces.MD;

namespace PROJECT.Service.Implements.MD
{
    public class UnitService : GenericService<T_MD_UNIT, T_MD_UNIT_Dto>, IUnitService
    {
        public UnitService(AppDbContext context, IMapper mapper) : base(context, mapper)
        {
        }
    }
}
