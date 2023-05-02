using PROJECT.API.DOMAIN.Models.AD;
using PROJECT.API.Models.Authentication;
using PROJECT.API.Services.Commons;
using PROJECT.API.Services.Dtos.AD;

namespace PROJECT.API.Services.Interfaces.AD
{
    public interface IUserService : IGenericService<T_AD_USER, T_AD_USER_Dto>
    {
        public string EncryptStringMD5(string strSource);
        public Task<T_AD_USER> CheckUserAuthentication(Login user);
        public Task<List<string>> GetRightUserAuthentication(Login user);
        public Task<IEnumerable<T_AD_USER>> Search(string key);
    }
}
