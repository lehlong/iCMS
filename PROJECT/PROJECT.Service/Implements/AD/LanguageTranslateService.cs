using AutoMapper;
using Microsoft.EntityFrameworkCore;
using PROJECT.Core;
using PROJECT.Core.Models.AD;
using PROJECT.Service.Commons;
using PROJECT.Service.Dtos.AD;
using PROJECT.Service.Extention;
using PROJECT.Service.Interfaces.AD;
using System.Text.Json.Nodes;

namespace PROJECT.Service.Implements.AD
{
    public class LanguageTranslateService : GenericService<T_AD_LANGUAGE_TRANSLATE, T_AD_LANGUAGE_TRANSLATE_Dto>, ILanguageTranslateService
    {
        private AppDbContext _context;
        public LanguageTranslateService(AppDbContext context, IMapper mapper) : base(context, mapper)
        {
            _context = context;
        }
        public async Task<JsonObject> GetSelectLanguage(string lang)
        {
            var lstLanguageTranslate = await _context.T_AD_LANGUAGE_TRANSLATE.Where(x => x.LANGUAGE == lang).ToListAsync();

            JsonObject jsonObject = new JsonObject();

            foreach (var item in lstLanguageTranslate)
            {
                jsonObject.Add(item.KEY, item.CONTENT);
            }

            return jsonObject;
        }

        public async Task<T_AD_LANGUAGE_TRANSLATE> LanguageDetail(Guid id)
        {
           return await _context.T_AD_LANGUAGE_TRANSLATE.FirstAsync(x => x.ID == id);          
        }

        public async Task<TranferObject> Update(T_AD_LANGUAGE_TRANSLATE request)
        {
            try
            {
                _context.T_AD_LANGUAGE_TRANSLATE.Update(request);
                await _context.SaveChangesAsync();
                return new TranferObject
                {
                    Status = true,
                    Message = new MessageObject
                    {
                        Message = "Thành công!",
                        MessageDetail = "Cập nhật thông tin ngôn ngữ thành công!",
                        MessageType = "S",
                    }
                };
            }
            catch (Exception ex)
            {
                return new TranferObject
                {
                    Status = true,
                    Message = new MessageObject
                    {
                        Message = "Thất bại!",
                        MessageDetail = "Đã có lỗi xảy ra: " + ex.ToString(),
                        MessageType = "E",
                    }
                };
            }
        }
        public async Task<TranferObject> Create(T_AD_LANGUAGE_TRANSLATE request)
        {
            try
            {
                request.ID = Guid.NewGuid();
                await _context.T_AD_LANGUAGE_TRANSLATE.AddAsync(request);
                await _context.SaveChangesAsync();
                return new TranferObject
                {
                    Status = true,
                    Message = new MessageObject
                    {
                        Message = "Thành công!",
                        MessageDetail = "Tạo mới thông tin ngôn ngữ thành công!",
                        MessageType = "S",
                    }
                };
            }
            catch (Exception ex)
            {
                return new TranferObject
                {
                    Status = true,
                    Message = new MessageObject
                    {
                        Message = "Thất bại!",
                        MessageDetail = "Đã có lỗi xảy ra: " + ex.ToString(),
                        MessageType = "E",
                    }
                };
            }
        }
    }
}
