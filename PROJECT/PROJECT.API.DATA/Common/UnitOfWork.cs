using Microsoft.EntityFrameworkCore.Storage;
using Microsoft.EntityFrameworkCore;

namespace PROJECT.API.DATA.Common
{
    public class UnitOfWork : IUnitOfWork
    {
        protected readonly AppDbContext _dbContext;
        private Dictionary<Type, dynamic> _repositories;
        private IDbContextTransaction _transation;

        public UnitOfWork(AppDbContext dbContext)
        {
            _dbContext = dbContext ?? throw new ArgumentNullException(nameof(dbContext));
            _repositories = new Dictionary<Type, dynamic>();
        }

        public DbContext DbContext { get { return this._dbContext; } }

        public bool BeginTransaction()
        {
            try
            {
                _transation = _dbContext.Database.BeginTransaction();
                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        public bool RollBackTransaction()
        {
            try
            {
                if (_transation != null)
                {
                    _transation.Rollback();
                    _transation = null;
                }
                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        public int SaveChanges()
        {
            var transaction = _transation != null ? _transation : _dbContext.Database.BeginTransaction();
            using (transaction)
            {
                try
                {
                    if (_dbContext == null)
                    {
                        throw new ArgumentException("Context is null");
                    }

                    int result = _dbContext.SaveChanges();

                    transaction.Commit();
                    return result;
                }
                catch (Exception ex)
                {
                    transaction.Rollback();
                    throw new Exception("Error on save changes ", ex);
                }
            }
        }

        public async Task<int> SaveChangesAsync()
        {
            var transaction = _transation != null ? _transation : _dbContext.Database.BeginTransaction();
            using (transaction)
            {
                try
                {
                    if (_dbContext == null)
                    {
                        throw new ArgumentException("Context is null");
                    }

                    int result = await _dbContext.SaveChangesAsync();

                    transaction.Commit();
                    return result;
                }
                catch (Exception ex)
                {
                    transaction.Rollback();
                    throw new Exception("Error on save changes ", ex);
                }
            }
        }

        public GenericRepo<T> Repo<T>() where T : class
        {
            //if (_repositories.Keys.Contains(typeof(T)) == true)
            //{
            //    return _repositories[typeof(T)];//as T
            //}
            //var repo = Activator.CreateInstance(typeof(T), this);
            //_repositories.Add(typeof(T), repo);
            //return repo as T;

            if (_repositories.Keys.Contains(typeof(T)) == true)
            {
                return _repositories[typeof(T)];//as T
            }
            var repo = Activator.CreateInstance(typeof(GenericRepo<T>), this);
            _repositories.Add(typeof(T), repo);
            return repo as GenericRepo<T>;
        }

        private bool disposed = false;
        protected void Dispose(bool disposing)
        {
            if (!this.disposed)
            {
                if (disposing)
                {
                    _dbContext.Dispose();
                }
            }
            this.disposed = true;
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }
    }
}
