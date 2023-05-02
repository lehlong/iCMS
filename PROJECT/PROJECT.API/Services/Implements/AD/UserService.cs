using AutoMapper;
using PROJECT.API.DATA.Common;
using PROJECT.API.DOMAIN.Models.AD;
using PROJECT.API.Models.Authentication;
using PROJECT.API.Services.Commons;
using PROJECT.API.Services.Dtos.AD;
using PROJECT.API.Services.Interfaces.AD;
using XSystem.Security.Cryptography;

namespace PROJECT.API.Services.Implements.AD
{
    public class UserService : GenericService<T_AD_USER, T_AD_USER_Dto>, IUserService
    {
        private IUnitOfWork UnitOfWork;
        public UserService(IUnitOfWork unitOfWork, IMapper mapper) : base(unitOfWork, mapper)
        {
            UnitOfWork = unitOfWork;
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

            return await UnitOfWork.Repo<T_AD_USER>().FirstOrDefaultAsync(x => x.USER_NAME == isvalidUsername && x.PASSWORD == isvalidPassword && x.ACTIVE == "Y");
        }

        public async Task<List<string>> GetRightUserAuthentication(Login user)
        {
            var isvalidUsername = user.UserName.Trim();
            var isvalidPassword = EncryptStringMD5(user.Password.Trim());

            //Lấy các role quyền
            var lstRole = new List<string>();
            var userGroups = UnitOfWork.Repo<T_AD_USER_USER_GROUP>().GetWhere(x => x.USER_NAME == isvalidUsername).ToList();

            if (userGroups.Count > 0)
            {
                foreach (var userGroup in userGroups)
                {
                    var roles = UnitOfWork.Repo<T_AD_USER_GROUP_ROLE>().GetWhere(x => x.USER_GROUP_CODE == userGroup.USER_GROUP_CODE).ToList();
                    if (roles.Count > 0)
                    {
                        foreach (var role in roles)
                        {
                            var lstRight = UnitOfWork.Repo<T_AD_ROLE_DETAIL>().GetWhere(x => x.FK_ROLE == role.ROLE_CODE).ToList();
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

            var userRight = UnitOfWork.Repo<T_AD_USER_RIGHT>().GetWhere(x => x.USER_NAME == isvalidUsername).ToList();
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

        public async Task<IEnumerable<T_AD_USER>> Search(string key)
        {
            if(key == "Empty")
            {
                return await UnitOfWork.Repo<T_AD_USER>().GetAllAsync();
            }
            else
            {
                return await UnitOfWork.Repo<T_AD_USER>().GetWhereAsync(x => x.USER_NAME.Contains(key) || x.FULL_NAME.Contains(key));
            }
        }
    }
}
