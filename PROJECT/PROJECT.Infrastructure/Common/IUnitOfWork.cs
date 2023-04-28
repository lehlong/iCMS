
using PROJECT.Infrastructure.Interfaces.MD;

namespace PROJECT.Infrastructure.Common
{
    public interface IUnitOfWork
    {
        IUnitRepo Unit { get; }
        void Commit();
        void Rollback();
        Task CommitAsync();
        Task RollbackAsync();
    }
}
