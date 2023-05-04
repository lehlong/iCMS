using AutoMapper;
using Microsoft.EntityFrameworkCore;
using PROJECT.Core;

namespace PROJECT.Service.Commons
{
    public abstract class GenericService<TEntity, TDto> : IGenericService<TEntity, TDto> where TDto : class where TEntity : class
    {
        private AppDbContext _context { get; set; }
        private IMapper _mapper;
        public GenericService(AppDbContext context, IMapper mapper)
        {
            this._context = context;
            this._mapper = mapper;
        }

        public virtual async Task<IEnumerable<TDto>> GetAll()
        {
            var lstEntity = await this._context.Set<TEntity>().ToListAsync();
            return _mapper.Map<List<TDto>>(lstEntity);
        }

        public virtual async Task<TDto> Add(TDto dto)
        {
            var entity = _mapper.Map<TEntity>(dto);
            var entityResult = await this._context.Set<TEntity>().AddAsync(entity);
            await this._context.SaveChangesAsync();
            var dtoResult = _mapper.Map<TDto>(entityResult);
            return dtoResult;
        }
        public virtual async Task Delete(TDto dto)
        {
            var entity = _mapper.Map<TEntity>(dto);
            this._context.Set<TEntity>().Remove(entity);
            await this._context.SaveChangesAsync();
        }
        public virtual async Task Update(TDto dto)
        {
            var entity = _mapper.Map<TEntity>(dto);
            this._context.Set<TEntity>().Update(entity);
            await this._context.SaveChangesAsync();
        }
    }
}
