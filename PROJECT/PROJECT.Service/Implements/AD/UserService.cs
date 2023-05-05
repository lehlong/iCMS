using AutoMapper;
using Microsoft.EntityFrameworkCore;
using PROJECT.Core;
using PROJECT.Core.Models.AD;
using PROJECT.Service.Commons;
using PROJECT.Service.Commons.Authentication;
using PROJECT.Service.Dtos.AD;
using PROJECT.Service.Extention;
using PROJECT.Service.Filter.AD;
using PROJECT.Service.Interfaces.AD;
using XSystem.Security.Cryptography;

namespace PROJECT.Service.Implements.AD
{
    public class UserService : GenericService<T_AD_USER, T_AD_USER_Dto>, IUserService
    {
        private AppDbContext _context;
        public UserService(AppDbContext context, IMapper mapper) : base(context, mapper)
        {
            _context = context;
        }
        public string EncryptStringMD5(string strSource)
        {
            string str_md5 = "";
            byte[] mang = System.Text.Encoding.UTF8.GetBytes(strSource);

            MD5CryptoServiceProvider my_md5 = new MD5CryptoServiceProvider();
            mang = my_md5.ComputeHash(mang);

            foreach (byte b in mang)
            {
                str_md5 += b.ToString("X2");
            }

            return str_md5;
        }

        public async Task<T_AD_USER> CheckUserAuthentication(Login user)
        {
            var isvalidUsername = user.UserName.Trim();
            var isvalidPassword = EncryptStringMD5(user.Password.Trim());

            return await _context.T_AD_USER.FirstOrDefaultAsync(x => x.USER_NAME == isvalidUsername && x.PASSWORD == isvalidPassword && x.ACTIVE == "Y");
        }

        public async Task<List<string>> GetRightUserAuthentication(Login user)
        {
            var isvalidUsername = user.UserName.Trim();
            var isvalidPassword = EncryptStringMD5(user.Password.Trim());

            //Lấy các role quyền
            var lstRole = new List<string>();
            var userGroups = await _context.T_AD_USER_USER_GROUP.Where(x => x.USER_NAME == isvalidUsername).ToListAsync();

            if (userGroups.Count > 0)
            {
                foreach (var userGroup in userGroups)
                {
                    var roles = await _context.T_AD_USER_GROUP_ROLE.Where(x => x.USER_GROUP_CODE == userGroup.USER_GROUP_CODE).ToListAsync();
                    if (roles.Count > 0)
                    {
                        foreach (var role in roles)
                        {
                            var lstRight = await _context.T_AD_ROLE_DETAIL.Where(x => x.FK_ROLE == role.ROLE_CODE).ToListAsync();
                            if (lstRight.Count > 0)
                            {
                                foreach (var right in lstRight)
                                {
                                    lstRole.Add(right.FK_RIGHT);
                                }
                            }
                            else
                            {
                                lstRole = new List<string>();
                            }

                        }
                    }
                    else
                    {
                        lstRole = new List<string>();
                    }
                }
            }
            else
            {
                lstRole = new List<string>();
            }

            var userRight = await _context.T_AD_USER_RIGHT.Where(x => x.USER_NAME == isvalidUsername).ToListAsync();
            if (userRight.Count > 0)
            {
                foreach (var right in userRight)
                {
                    if (right.IS_ADD == "Y" && right.IS_REMOVE == "N")
                    {
                        lstRole.Add(right.FK_RIGHT);
                    }
                    else if (right.IS_ADD == "N" && right.IS_REMOVE == "Y")
                    {
                        lstRole.Remove(right.FK_RIGHT);
                    }
                }
            }

            return lstRole;
        }

        public async Task<UserFilter> Search(UserFilter page)
        {
            var query = _context.T_AD_USER.AsQueryable();
            if (page.KeySearch != "Empty")
            {
                query = query.Where(x => x.USER_NAME.Contains(page.KeySearch) || x.FULL_NAME.Contains(page.KeySearch));
            }
            var count = query.Count();

            page.ItemCount = count;
            page.TotalPage = (int)Math.Ceiling(count / (decimal)page.PageSize);
            page.Data = await query.Skip((page.CurrentPage - 1) * page.PageSize).Take(page.PageSize).ToListAsync();
            
            return page;
        }
    }
}
