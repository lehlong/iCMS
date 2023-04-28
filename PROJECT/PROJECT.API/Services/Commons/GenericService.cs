using AutoMapper;
using PROJECT.API.DATA.Common;

namespace PROJECT.API.Services.Commons
{
    public abstract class GenericService<TEntity, TDto> : IGenericService<TEntity, TDto> where TDto : class where TEntity : class
    {
        private IUnitOfWork _unitOfWork { get; set; }
        private IMapper _mapper;
        public GenericService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            this._unitOfWork = unitOfWork;
            this._mapper = mapper;
        }

        public virtual async Task<IEnumerable<TDto>> GetAll()
        {
            var lstEntity = await this._unitOfWork.Repo<TEntity>().GetAllAsync();
            return _mapper.Map<List<TDto>>(lstEntity);
        }

        public virtual async Task<TDto> Add(TDto dto)
        {
            var entity = _mapper.Map<TEntity>(dto);
            var entityResult = await this._unitOfWork.Repo<TEntity>().AddAsync(entity);
            await this._unitOfWork.SaveChangesAsync();
            var dtoResult = _mapper.Map<TDto>(entityResult);
            return dtoResult;
        }
        public virtual async Task Delete(TDto dto)
        {
            var entity = _mapper.Map<TEntity>(dto);
            await this._unitOfWork.Repo<TEntity>().RemoveAsync(entity);
            await this._unitOfWork.SaveChangesAsync();
        }
        public virtual async Task Update(TDto dto)
        {
            var entity = _mapper.Map<TEntity>(dto);
            await this._unitOfWork.Repo<TEntity>().UpdateAsync(entity);
            await this._unitOfWork.SaveChangesAsync();
        }
    }
}
