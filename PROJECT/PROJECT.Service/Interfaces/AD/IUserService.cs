using PROJECT.Core.Models.AD;
using PROJECT.Service.Commons;
using PROJECT.Service.Commons.Authentication;
using PROJECT.Service.Dtos.AD;
using PROJECT.Service.Extention;
using PROJECT.Service.Filter.AD;

namespace PROJECT.Service.Interfaces.AD
{
    public interface IUserService : IGenericService<T_AD_USER, T_AD_USER_Dto>
    {
        public string EncryptStringMD5(string strSource);
        public Task<T_AD_USER> CheckUserAuthentication(Login user);
        public Task<List<string>> GetRightUserAuthentication(Login user);
        public Task<UserFilter> Search(UserFilter page);
    }
}
