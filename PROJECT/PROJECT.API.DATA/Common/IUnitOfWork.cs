using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PROJECT.API.DATA.Common
{
    public interface IUnitOfWork : IDisposable
    {
        bool BeginTransaction();
        bool RollBackTransaction();
        int SaveChanges();
        Task<int> SaveChangesAsync();
        GenericRepo<T> Repo<T>() where T : class;
    }
}
