using PROJECT.Core.Models.AD;
using PROJECT.Service.Commons;
using PROJECT.Service.Dtos.AD;
using PROJECT.Service.Extention;
using static PROJECT.Service.Extention.NodeTree;

namespace PROJECT.Service.Interfaces.AD
{
    public interface IOrganizeService : IGenericService<T_AD_ORGANIZE, T_AD_ORGANIZE_Dto>
    {
        public Task<IList<NodeOrganize>> BuildTreeOrganize();
        public Task<IList<NodeOrganize>> Search(string key);
        public Task UpdateOrder(string request);
        public Task<T_AD_ORGANIZE> GetDetail(string pkid);
        public Task<TranferObject> Update(T_AD_ORGANIZE request);
        public Task<TranferObject> Create(T_AD_ORGANIZE request);
    }
}
