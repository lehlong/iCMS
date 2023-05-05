using AutoMapper;
using DocumentFormat.OpenXml.Spreadsheet;
using DocumentFormat.OpenXml.Wordprocessing;
using Microsoft.EntityFrameworkCore;
using PROJECT.Core;
using PROJECT.Service.Extention;

namespace PROJECT.Service.Commons
{
    public abstract class GenericService<TEntity, TDto> : IGenericService<TEntity, TDto> where TDto : class where TEntity : class
    {
        public AppDbContext _context { get; set; }
        public MessageObject MessageObject { get; set; }
        public Exception? Exception { get; set; }
        public bool Status { get; set; }

        private IMapper _mapper;
        public GenericService(AppDbContext context, IMapper mapper)
        {
            this._context = context;
            this._mapper = mapper;
            this.Status = true;
            this.MessageObject = new MessageObject();
        }

        public virtual async Task<IList<TDto>> GetAll()
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
        public virtual async Task<MessageObject> GetMessage(string code, string lang)
        {
            var mess = await _context.T_AD_MESSAGE.FirstOrDefaultAsync(x => x.CODE == code && x.LANGUAGE == lang);
            var messageObject = new MessageObject()
            {
                Code = mess.CODE,
                Message = mess.MESSAGE,
                MessageDetail = mess.MESSAGE_DETAIL,
                MessageType = mess.TYPE
            };
            return messageObject;
        }
    }
}
