using PROJECT.Infrastructure.Interfaces.MD;

namespace PROJECT.Infrastructure.Common
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly ApplicationDbContext _dbContext;
        public IUnitRepo Unit { get; }

        public UnitOfWork(ApplicationDbContext dbContext,
                            IUnitRepo unitRepo)
        {
            _dbContext = dbContext;
            Unit = unitRepo;
        }

        public int Save()
        {
            return _dbContext.SaveChanges();
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        protected virtual void Dispose(bool disposing)
        {
            if (disposing)
            {
                _dbContext.Dispose();
            }
        }

    }
}
