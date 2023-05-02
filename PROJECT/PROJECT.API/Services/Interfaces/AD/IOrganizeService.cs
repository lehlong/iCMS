using PROJECT.API.DOMAIN.Models.AD;
using PROJECT.API.Models.Common;
using PROJECT.API.Services.Commons;
using PROJECT.API.Services.Dtos.AD;
using static PROJECT.API.Models.Common.NodeTree;

namespace PROJECT.API.Services.Interfaces.AD
{
    public interface IOrganizeService : IGenericService<T_AD_ORGANIZE, T_AD_ORGANIZE_Dto>
    {
        public Task<IList<NodeOrganize>> BuildTreeOrganize();
        public Task<IList<NodeOrganize>> Search(string key);
        public Task<TranferObject> UpdateOrder(string request);
        public Task<T_AD_ORGANIZE> GetDetail(string pkid);
        public Task<TranferObject> Update(T_AD_ORGANIZE request);
        public Task<TranferObject> Create(T_AD_ORGANIZE request);
    }
}
