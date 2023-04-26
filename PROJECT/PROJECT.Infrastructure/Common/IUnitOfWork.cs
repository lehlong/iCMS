
using PROJECT.Infrastructure.Interfaces.MD;

namespace PROJECT.Infrastructure.Common
{
    public interface IUnitOfWork : IDisposable
    {
        IUnitRepo Unit { get; }


        int Save();
    }
}
