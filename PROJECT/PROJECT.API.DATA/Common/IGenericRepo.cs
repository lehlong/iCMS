using System.Linq.Expressions;

namespace PROJECT.API.DATA.Common
{
    public interface IGenericRepo<T> where T : class
    {
        T GetById(object id);
        Task<T> GetByIdAsync(object id);
        IEnumerable<T> GetAll();
        Task<IEnumerable<T>> GetAllAsync();
        IEnumerable<T> GetWhere(Expression<Func<T, bool>> predicate);
        Task<IEnumerable<T>> GetWhereAsync(Expression<Func<T, bool>> predicate);
        T FirstOrDefault(Expression<Func<T, bool>> predicate);
        Task<T> FirstOrDefaultAsync(Expression<Func<T, bool>> predicate);
        T Add(T entity);
        Task<T> AddAsync(T entity);
        IEnumerable<T> AddRange(IEnumerable<T> entities);
        Task<IEnumerable<T>> AddRangeAsync(IEnumerable<T> entities);
        void Remove(T entity);
        Task RemoveAsync(T entity);
        void RemoveRange(IEnumerable<T> entities);
        Task RemoveRangeAsync(IEnumerable<T> entities);
        void Update(T entity);
        Task UpdateAsync(T entity);
        void UpdateRange(IEnumerable<T> entities);
        Task UpdateRangeAsync(IEnumerable<T> entities);
        void Dispose();
    }
}
