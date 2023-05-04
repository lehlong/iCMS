using PROJECT.Core.Models.AD;
using PROJECT.Service.Commons;
using PROJECT.Service.Dtos.AD;
using PROJECT.Service.Extention;
using System.Text.Json.Nodes;

namespace PROJECT.Service.Interfaces.AD
{
    public interface ILanguageTranslateService : IGenericService<T_AD_LANGUAGE_TRANSLATE, T_AD_LANGUAGE_TRANSLATE_Dto>
    {
        public Task<JsonObject> GetSelectLanguage(string lang);
        public Task<T_AD_LANGUAGE_TRANSLATE> LanguageDetail(Guid id);
        public Task<TranferObject> Update(T_AD_LANGUAGE_TRANSLATE request);
        public Task<TranferObject> Create(T_AD_LANGUAGE_TRANSLATE request);
    }
}
