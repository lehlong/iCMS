namespace PROJECT.Service.Commons
{
    public interface IGenericService<TEntity, TDto>
    {
        Task<IEnumerable<TDto>> GetAll();
        Task<TDto> Add(TDto dto);
        Task Update(TDto dto);
        Task Delete(TDto dto);
    }
}
