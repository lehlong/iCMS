using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using PROJECT.Core;
using PROJECT.Core.Models.AD;
using PROJECT.Service.Commons;
using PROJECT.Service.Dtos.AD;
using PROJECT.Service.Extention;
using PROJECT.Service.Interfaces.AD;
using static PROJECT.Service.Extention.NodeTree;

namespace PROJECT.Service.Implements.AD
{
    public class OrganizeService : GenericService<T_AD_ORGANIZE, T_AD_ORGANIZE_Dto>, IOrganizeService
    {
        private AppDbContext _context;
        public OrganizeService(AppDbContext context, IMapper mapper) : base(context, mapper)
        {
            _context = context;
        }

        public async Task<IList<NodeOrganize>> BuildTreeOrganize()
        {
            var lstNode = new List<NodeOrganize>();
            var dataOrganize = await _context.T_AD_ORGANIZE.ToListAsync();

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
            var dataOrganize = key == "Empty" ? await _context.T_AD_ORGANIZE.ToListAsync() : await _context.T_AD_ORGANIZE.Where(x => x.NAME.Contains(key) || x.COMPANY_CODE.Contains(key)).ToListAsync();

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
        public async Task UpdateOrder(string request)
        {
            try
            {
                var jsonData = JsonConvert.DeserializeObject<NodeOrganize[]>(request);
                for (var i = 0; i < jsonData.Length; i++)
                {
                    var item = await _context.T_AD_ORGANIZE.FirstOrDefaultAsync(x => x.PKID == jsonData[i].id);
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
                await _context.SaveChangesAsync();               
            }
            catch(Exception ex)
            {
               this.Exception = ex;
               this.Status = false;
            }

        }
        public async Task<T_AD_ORGANIZE> GetDetail(string pkid)
        {
            return await _context.T_AD_ORGANIZE.FirstOrDefaultAsync(x => x.PKID == pkid);   
        }

        public async Task<TranferObject> Update(T_AD_ORGANIZE request)
        {
            try
            {
                _context.T_AD_ORGANIZE.Update(request);
                await _context.SaveChangesAsync();
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
                await _context.T_AD_ORGANIZE.AddAsync(request);
                await _context.SaveChangesAsync();
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
