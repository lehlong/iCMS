using AutoMapper;
using PROJECT.API.DATA.Common;
using PROJECT.API.DOMAIN.Models.AD;
using PROJECT.API.Services.Commons;
using PROJECT.API.Services.Dtos.AD;
using PROJECT.API.Services.Interfaces.AD;
using static PROJECT.API.Models.Common.NodeTree;

namespace PROJECT.API.Services.Implements.AD
{
    public class OrganizeService : GenericService<T_AD_ORGANIZE, T_AD_ORGANIZE_Dto>, IOrganizeService
    {
        private IUnitOfWork UnitOfWork;
        public OrganizeService(IUnitOfWork unitOfWork, IMapper mapper) : base(unitOfWork, mapper)
        {
            UnitOfWork = unitOfWork;
        }

        public async Task<IList<NodeOrganize>> BuildTreeOrganize()
        {
            var lstNode = new List<NodeOrganize>();
            var dataOrganize = await UnitOfWork.Repo<T_AD_ORGANIZE>().GetAllAsync();

            foreach (var item in dataOrganize.OrderBy(x => x.C_ORDER))
            {
                var node = new NodeOrganize()
                {
                    id = item.PKID,
                    pId = item.PARENT,
                    name = item.NAME
                };
                lstNode.Add(node);
            }
            return lstNode;
        }
    }
}
