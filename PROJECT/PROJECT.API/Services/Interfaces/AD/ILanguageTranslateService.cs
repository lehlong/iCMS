using PROJECT.API.DOMAIN.Models.AD;
using PROJECT.API.Services.Commons;
using PROJECT.API.Services.Dtos.AD;
using System.Text.Json.Nodes;

namespace PROJECT.API.Services.Interfaces.AD
{
    public interface ILanguageTranslateService : IGenericService<T_AD_LANGUAGE_TRANSLATE, T_AD_LANGUAGE_TRANSLATE_Dto>
    {
        public Task<JsonObject> GetSelectLanguage(string lang);
    }
}
