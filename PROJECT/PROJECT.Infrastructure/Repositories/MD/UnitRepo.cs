using PROJECT.Core.Models.MD;
using PROJECT.Infrastructure.Common;
using PROJECT.Infrastructure.Interfaces.MD;

namespace PROJECT.Infrastructure.Repositories.MD
{
    public class UnitRepo : GenericRepository<T_MD_UNIT>, IUnitRepo
    {
        public UnitRepo(ApplicationDbContext dbContext) : base(dbContext)
        {
        }
    }
}
