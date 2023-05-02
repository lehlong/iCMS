using PROJECT.API.DOMAIN.Models.AD;
using PROJECT.API.Services.Commons;
using PROJECT.API.Services.Dtos.AD;
using static PROJECT.API.Models.Common.NodeTree;

namespace PROJECT.API.Services.Interfaces.AD
{
    public interface IOrganizeService : IGenericService<T_AD_ORGANIZE, T_AD_ORGANIZE_Dto>
    {
        public Task<IList<NodeOrganize>> BuildTreeOrganize();
    }
}
