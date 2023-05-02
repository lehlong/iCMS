using AutoMapper;
using PROJECT.API.DATA.Common;
using PROJECT.API.DOMAIN.Models.AD;
using PROJECT.API.Models.Common;
using PROJECT.API.Services.Commons;
using PROJECT.API.Services.Dtos.AD;
using PROJECT.API.Services.Interfaces.AD;
using System.Text.Json.Nodes;

namespace PROJECT.API.Services.Implements.AD
{
    public class LanguageTranslateService : GenericService<T_AD_LANGUAGE_TRANSLATE, T_AD_LANGUAGE_TRANSLATE_Dto>, ILanguageTranslateService
    {
        private IUnitOfWork UnitOfWork;
        public LanguageTranslateService(IUnitOfWork unitOfWork, IMapper mapper) : base(unitOfWork, mapper)
        {
            UnitOfWork = unitOfWork;
        }
        public async Task<JsonObject> GetSelectLanguage(string lang)
        {
            var lstLanguageTranslate = await UnitOfWork.Repo<T_AD_LANGUAGE_TRANSLATE>().GetWhereAsync(x => x.LANGUAGE == lang);

            JsonObject jsonObject = new JsonObject();

            foreach (var item in lstLanguageTranslate)
            {
                jsonObject.Add(item.KEY, item.CONTENT);
            }

            return jsonObject;
        }

        public async Task<T_AD_LANGUAGE_TRANSLATE> LanguageDetail(Guid id)
        {
            return await UnitOfWork.Repo<T_AD_LANGUAGE_TRANSLATE>().GetByIdAsync(id);
        }

        public async Task<TranferObject> Update(T_AD_LANGUAGE_TRANSLATE request)
        {
            try
            {
                await UnitOfWork.Repo<T_AD_LANGUAGE_TRANSLATE>().UpdateAsync(request);
                await UnitOfWork.SaveChangesAsync();
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
        public async Task<bool> Create(T_AD_LANGUAGE_TRANSLATE request)
        {
            request.ID = Guid.NewGuid();
            await UnitOfWork.Repo<T_AD_LANGUAGE_TRANSLATE>().AddAsync(request);
            await UnitOfWork.SaveChangesAsync();
            return true;
        }
    }
}
