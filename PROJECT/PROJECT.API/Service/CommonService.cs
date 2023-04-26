using Microsoft.EntityFrameworkCore.ChangeTracking.Internal;
using PROJECT.API.Data;
using PROJECT.API.Models.AD;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace PROJECT.API.Service
{
    public class CommonService
    {
        private readonly ApplicationDbContext _context;
        public CommonService(ApplicationDbContext context)
        {
            _context = context;
        }

        public string GetUserFromJWTToken(string token)
        {
            JwtSecurityTokenHandler tokenHandler = new JwtSecurityTokenHandler();
            JwtSecurityToken securityToken = (JwtSecurityToken)tokenHandler.ReadToken(token);
            var claim = securityToken.Claims;
            var user = claim.FirstOrDefault(x => x.Type == "username");
            if (user != null)
            {
                return user.Value;
            }
            else
            {
                return null;
            }
        }

        public bool CheckRightFromJWTToken(string token, string rightCheck)
        {
            JwtSecurityTokenHandler tokenHandler = new JwtSecurityTokenHandler();
            JwtSecurityToken securityToken = (JwtSecurityToken)tokenHandler.ReadToken(token);
            var claim = securityToken.Claims;
            var user = claim.FirstOrDefault(x => x.Type == "username");

            var lstRole = new List<string>();
            var userGroups = _context.T_AD_USER_USER_GROUP.Where(x => x.USER_NAME == user.Value).ToList();

            if (userGroups.Count > 0)
            {
                foreach (var userGroup in userGroups)
                {
                    var roles = _context.T_AD_USER_GROUP_ROLE.Where(x => x.USER_GROUP_CODE == userGroup.USER_GROUP_CODE).ToList();
                    if (roles.Count > 0)
                    {
                        foreach (var role in roles)
                        {
                            var lstRight = _context.T_AD_ROLE_DETAIL.Where(x => x.FK_ROLE == role.ROLE_CODE).ToList();
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

            var userRight = _context.T_AD_USER_RIGHT.Where(x => x.USER_NAME == user.Value).ToList();
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

            bool check = Array.Exists(lstRole.Distinct().ToArray(), x => x == rightCheck);

            return check;

        }

        public void CreateHistory(string username, string title, string area,string action, string oldValue, string value)
        {
            var history = new T_AD_HISTORY()
            {
                ID = Guid.NewGuid(),
                UPDATE_BY = username,
                UPDATE_DATE = DateTime.Now,
                AREA = area,
                OLD_VALUE = oldValue,
                VALUE = value,
                ACTION = action,
                TITLE = title
            };
            _context.T_AD_HISTORY.Add(history);
            _context.SaveChanges();
        }
    }
}
