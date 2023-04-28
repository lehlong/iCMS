using PROJECT.API.DOMAIN.Models.AD;
using PROJECT.API.Services.Commons;
using PROJECT.API.Services.Dtos.AD;

namespace PROJECT.API.Services.Interfaces.AD
{
    public interface IUserService : IGenericService<T_AD_USER, T_AD_USER_Dto>
    {
    }
}
