using AutoMapper;
using PROJECT.API.DATA.Common;
using PROJECT.API.DOMAIN.Models.AD;
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
    }
}
