using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PROJECT.Infrastructure.Common
{
    public interface IGenericRepository<T> where T : class
    {
        Task<T> GetById(int id);
        Task<T> GetById(string id);
        Task<IEnumerable<T>> GetAll();
        Task Add(T entity);
        void Delete(T entity);
        void Update(T entity);
    }
}
