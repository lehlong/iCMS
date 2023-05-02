using AutoMapper;
using DocumentFormat.OpenXml.Office2010.Excel;
using Newtonsoft.Json;
using PROJECT.API.DATA.Common;
using PROJECT.API.DOMAIN.Models.AD;
using PROJECT.API.Models.Common;
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

        public async Task<IList<NodeOrganize>> Search(string key)
        {
            var lstNode = new List<NodeOrganize>();
            var dataOrganize = key == "Empty" ? await UnitOfWork.Repo<T_AD_ORGANIZE>().GetAllAsync() : await UnitOfWork.Repo<T_AD_ORGANIZE>().GetWhereAsync(x => x.NAME.Contains(key) || x.COMPANY_CODE.Contains(key));

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
        public async Task<TranferObject> UpdateOrder(string request)
        {
            try
            {
                var jsonData = JsonConvert.DeserializeObject<NodeOrganize[]>(request);
                for (var i = 0; i < jsonData.Length; i++)
                {
                    var item = await UnitOfWork.Repo<T_AD_ORGANIZE>().GetByIdAsync(jsonData[i].id);
                    if (item == null)
                    {
                        continue;
                    }
                    else
                    {
                        item.PARENT = jsonData[i].pId;
                        item.C_ORDER = i;
                    }
                }
                await UnitOfWork.SaveChangesAsync();

                return new TranferObject
                {
                    Status = true,
                    Message = new MessageObject
                    {
                        Message = "Thành công!",
                        MessageDetail = "Cập nhật thứ tự cấu trúc tổ chức thành công!",
                        MessageType = "S",
                    }
                };
            }
            catch(Exception ex)
            {
                return new TranferObject
                {
                    Status = true,
                    Message = new MessageObject
                    {
                        Message = "Thất bại!",
                        MessageDetail = "Đã có lỗi xảy ra: " + ex.ToString(),
                        MessageType = "E",
                    }
                };
            }

        }
        public async Task<T_AD_ORGANIZE> GetDetail(string pkid)
        {
            return await UnitOfWork.Repo<T_AD_ORGANIZE>().GetByIdAsync(pkid);           
        }

        public async Task<TranferObject> Update(T_AD_ORGANIZE request)
        {
            try
            {
                await UnitOfWork.Repo<T_AD_ORGANIZE>().UpdateAsync(request);
                await UnitOfWork.SaveChangesAsync();
                return new TranferObject
                {
                    Status = true,
                    Message = new MessageObject
                    {
                        Message = "Thành công!",
                        MessageDetail = "Cập nhật thông tin công ty phòng ban thành công!",
                        MessageType = "S",
                    }
                };
            }
            catch (Exception ex)
            {
                return new TranferObject
                {
                    Status = true,
                    Message = new MessageObject
                    {
                        Message = "Thất bại!",
                        MessageDetail = "Đã có lỗi xảy ra: " + ex.ToString(),
                        MessageType = "E",
                    }
                };
            }
        }
        public async Task<TranferObject> Create(T_AD_ORGANIZE request)
        {
            try
            {
                request.PKID = Guid.NewGuid().ToString();
                request.C_ORDER = 0;
                await UnitOfWork.Repo<T_AD_ORGANIZE>().AddAsync(request);
                await UnitOfWork.SaveChangesAsync();
                return new TranferObject
                {
                    Status = true,
                    Message = new MessageObject
                    {
                        Message = "Thành công!",
                        MessageDetail = "Tạo mới thông tin công ty phòng ban thành công!",
                        MessageType = "S",
                    }
                };
            }
            catch (Exception ex)
            {
                return new TranferObject
                {
                    Status = true,
                    Message = new MessageObject
                    {
                        Message = "Thất bại!",
                        MessageDetail = "Đã có lỗi xảy ra: " + ex.ToString(),
                        MessageType = "E",
                    }
                };
            }
        }
    }
}
