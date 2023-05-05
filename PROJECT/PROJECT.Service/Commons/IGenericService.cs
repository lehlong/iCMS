using PROJECT.Core;
using PROJECT.Service.Extention;

namespace PROJECT.Service.Commons
{
    public interface IGenericService<TEntity, TDto>
    {
        public AppDbContext _context { get; set; }
        public MessageObject MessageObject { get; set; }
        public Exception? Exception { get; set; }
        public bool Status { get; set; }
        Task<IList<TDto>> GetAll();
        Task<TDto> Add(TDto dto);
        Task Update(TDto dto);
        Task Delete(TDto dto);
        Task<MessageObject> GetMessage(string code, string lang);
    }
}
