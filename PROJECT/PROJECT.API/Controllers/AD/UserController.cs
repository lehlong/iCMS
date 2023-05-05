using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PROJECT.Service.Extention;
using PROJECT.Service.Filter.AD;
using PROJECT.Service.Interfaces.AD;

namespace PROJECT.API.Controllers.MD
{
    [ApiController]
    [Authorize]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly IUserService _service;
        public UserController(IUserService service)
        {
            _service = service;
        }

        [HttpGet]
        [Route("GetList")]
        public async Task<IActionResult> GetList([FromQuery] UserFilter page)
        {
            var tranferObject = new TranferObject();
            var pagination = await _service.Search(page);
            if (_service.Status)
            {
                tranferObject.Data = pagination;
            }
            return Ok(tranferObject);
        }

        //[HttpGet]
        //[Route("GetDetail/{username}")]
        //public async Task<IActionResult> GetDetail([FromRoute] string username)
        //{
        //    var user = await _context.T_AD_USER.FirstOrDefaultAsync(x => x.USER_NAME == username);

        //    return Ok(user);
        //}

        //[HttpPut]
        //[Route("Update/{username}")]
        //public async Task<IActionResult> UpdateUser([FromRoute] string username, T_AD_USER request)
        //{
        //    var item = await _context.T_AD_USER.FindAsync(username);
        //    if (item == null)
        //    {
        //        return NotFound();
        //    }
        //    item.ACCOUNT_AD = request.ACCOUNT_AD;
        //    item.FULL_NAME = request.FULL_NAME;
        //    item.EMAIL = request.EMAIL;
        //    item.ADDRESS = request.ADDRESS;
        //    item.PHONE = request.PHONE;
        //    item.NOTES = request.NOTES;
        //    item.USER_TYPE = request.USER_TYPE;
        //    item.TITLE_CODE = request.TITLE_CODE;
        //    item.COMPANY_ID = request.COMPANY_ID;
        //    item.VENDOR_CODE = request.VENDOR_CODE;
        //    item.USER_SAP = request.USER_SAP;
        //    item.UPDATE_DATE = DateTime.Now;

        //    await _context.SaveChangesAsync();

        //    return Ok(item);
        //}

        //[HttpPut]
        //[Route("ResetPassword/{username}")]
        //public async Task<IActionResult> ResetPassword([FromRoute] string username)
        //{
        //    var item = await _context.T_AD_USER.FindAsync(username);
        //    if (item == null)
        //    {
        //        return NotFound();
        //    }
        //    item.PASSWORD = EncryptStringMD5(username + "@123");

        //    await _context.SaveChangesAsync();

        //    return Ok(item);
        //}

        //[HttpPut]
        //[Route("ActiveAccount/{username}")]
        //public async Task<IActionResult> ActiveAccount([FromRoute] string username)
        //{
        //    var item = await _context.T_AD_USER.FindAsync(username);
        //    if (item == null)
        //    {
        //        return NotFound();
        //    }
        //    item.ACTIVE = "Y";

        //    await _context.SaveChangesAsync();

        //    return Ok(item);
        //}

        //[HttpPut]
        //[Route("LockAccount/{username}")]
        //public async Task<IActionResult> LockAccount([FromRoute] string username)
        //{
        //    var item = await _context.T_AD_USER.FindAsync(username);
        //    if (item == null)
        //    {
        //        return NotFound();
        //    }
        //    item.ACTIVE = "N";

        //    await _context.SaveChangesAsync();

        //    return Ok(item);
        //}

        //[HttpPost]
        //[Route("Create")]
        //public async Task<IActionResult> Create([FromBody] T_AD_USER request)
        //{
        //    request.ACTIVE = "Y";
        //    request.PASSWORD = EncryptStringMD5(request.USER_NAME + "@123");
        //    await _context.T_AD_USER.AddAsync(request);
        //    _context.SaveChanges();
        //    return Ok(request);
        //}

        //[HttpPost]
        //[Route("AddUserGroupToUser/{username}/{userGroupCode}")]
        //public async Task<IActionResult> AddUserGroupToUser([FromRoute] string username, [FromRoute] string userGroupCode)
        //{
        //    var item = new T_AD_USER_USER_GROUP()
        //    {
        //        ID = Guid.NewGuid(),
        //        USER_NAME = username,
        //        USER_GROUP_CODE = userGroupCode
        //    };
        //    await _context.T_AD_USER_USER_GROUP.AddAsync(item);
        //    await _context.SaveChangesAsync();
        //    return Ok(item);
        //}

        //[HttpDelete]
        //[Route("DeleteUserGroupToUser/{username}/{userGroupCode}")]
        //public async Task<IActionResult> DeleteUserGroupToUser([FromRoute] string username, [FromRoute] string userGroupCode)
        //{
        //    var item = await _context.T_AD_USER_USER_GROUP.FirstOrDefaultAsync(x => x.USER_NAME == username && x.USER_GROUP_CODE == userGroupCode);
        //    if(item == null)
        //    {
        //        return NotFound();
        //    }
        //    _context.T_AD_USER_USER_GROUP.Remove(item);
        //    await _context.SaveChangesAsync();
        //    return Ok(item);
        //}


        //[HttpGet]
        //[Route("GetRightUser/{username}")]
        //public async Task<IActionResult> GetRightUser([FromRoute] string username)
        //{
        //    var lstRight = new List<NodeRight>();
        //    var userGroups = await _context.T_AD_USER_USER_GROUP.Where(x => x.USER_NAME == username.Trim()).ToListAsync();

        //    //Lấy tất cả quyền
        //    var allRight = await _context.T_AD_RIGHT.ToListAsync();
        //    foreach (var right in allRight)
        //    {
        //        var item = new NodeRight()
        //        {
        //            id = right.CODE,
        //            pId = right.PARENT,
        //            name = $"{right.CODE} - {right.NAME}"
        //        };
        //        lstRight.Add(item);
        //    }

        //    //Lấy tất cả quyền thuộc nhóm người người dùng, nhóm quyền
        //    var lstStringRight = new List<string>();

        //    if (userGroups.Count > 0)
        //    {
        //        foreach (var userGroup in userGroups)
        //        {
        //            var roles = await _context.T_AD_USER_GROUP_ROLE.Where(x => x.USER_GROUP_CODE == userGroup.USER_GROUP_CODE).ToListAsync();
        //            if (roles.Count > 0)
        //            {
        //                foreach (var role in roles)
        //                {
        //                    var lstRoleDetail = await _context.T_AD_ROLE_DETAIL.Where(x => x.FK_ROLE == role.ROLE_CODE).ToListAsync();
        //                    if (lstRoleDetail.Count > 0)
        //                    {
        //                        foreach (var right in lstRoleDetail)
        //                        {
        //                            lstStringRight.Add(right.FK_RIGHT);
        //                        }
        //                    }
        //                    else
        //                    {
        //                        lstStringRight = new List<string>();
        //                    }

        //                }
        //            }
        //            else
        //            {
        //                lstStringRight = new List<string>();
        //            }
        //        }
        //    }
        //    else
        //    {
        //        lstStringRight = new List<string>();
        //    }

        //    //Check nếu trùng quyền
        //    foreach (var right in lstRight)
        //    {
        //        foreach (var stringRight in lstStringRight.Distinct().ToList())
        //        {
        //            if (right.id == stringRight)
        //            {
        //                right.@checked = "true";
        //            }
        //        }
        //    }

        //    var userRights = await _context.T_AD_USER_RIGHT.Where(x => x.USER_NAME == username).ToListAsync();

        //    //Check thêm hoặc xoá quyền riêng
        //    foreach (var right in lstRight)
        //    {
        //        foreach (var userRight in userRights)
        //        {
        //            if (right.id == userRight.FK_RIGHT && userRight.IS_ADD == "Y" && userRight.IS_REMOVE == "N")
        //            {
        //                right.@checked = "true";
        //                right.isAdd = "1";
        //            }
        //            else if (right.id == userRight.FK_RIGHT && userRight.IS_ADD == "N" && userRight.IS_REMOVE == "Y")
        //            {
        //                right.@checked = "false";
        //                right.isRemove = "1";
        //            }
        //        }
        //    }

        //    return Ok(lstRight);
        //}

        //[HttpDelete]
        //[Route("RestoreDefaultRight/{username}")]
        //public async Task<IActionResult> RestoreDefaultRight([FromRoute] string username)
        //{
        //    var lstRight = await _context.T_AD_USER_RIGHT.Where(x => x.USER_NAME == username).ToListAsync();
        //    foreach (var right in lstRight)
        //    {
        //        _context.T_AD_USER_RIGHT.Remove(right);
        //    }
        //    await _context.SaveChangesAsync();
        //    return Ok(lstRight);
        //}

        //[HttpPost]
        //[Route("UpdateRightOfUser/{username}/{lstRight}/{lstStatus}")]
        //public async Task<IActionResult> UpdateRightOfUser([FromRoute] string username, [FromRoute] string lstRight, [FromRoute] string lstStatus)
        //{
        //    var jsonListRight = JsonConvert.DeserializeObject<string[]>(lstRight);
        //    var jsonListStatus = JsonConvert.DeserializeObject<string[]>(lstStatus);

        //    //Lấy các role quyền
        //    var lstRole = new List<string>();
        //    var userGroups = _context.T_AD_USER_USER_GROUP.Where(x => x.USER_NAME == username).ToList();

        //    if (userGroups.Count > 0)
        //    {
        //        foreach (var userGroup in userGroups)
        //        {
        //            var roles = _context.T_AD_USER_GROUP_ROLE.Where(x => x.USER_GROUP_CODE == userGroup.USER_GROUP_CODE).ToList();
        //            if (roles.Count > 0)
        //            {
        //                foreach (var role in roles)
        //                {
        //                    var lstRightCheck = _context.T_AD_ROLE_DETAIL.Where(x => x.FK_ROLE == role.ROLE_CODE).ToList();
        //                    if (lstRightCheck.Count > 0)
        //                    {
        //                        foreach (var right in lstRightCheck)
        //                        {
        //                            lstRole.Add(right.FK_RIGHT);
        //                        }
        //                    }
        //                    else
        //                    {
        //                        lstRole = new List<string>();
        //                    }

        //                }
        //            }
        //            else
        //            {
        //                lstRole = new List<string>();
        //            }
        //        }
        //    }
        //    else
        //    {
        //        lstRole = new List<string>();
        //    }

        //    if (jsonListRight.Length <= 0 || jsonListStatus.Length <= 0)
        //    {
        //        return NotFound();
        //    }

        //    for (var i = 0; i < jsonListRight.Length; i++)
        //    {
        //        var checkRight = await _context.T_AD_USER_RIGHT.FirstOrDefaultAsync(x => x.FK_RIGHT == jsonListRight[i] && x.USER_NAME == username);
        //        if (checkRight != null)
        //        {
        //            if ((Array.Exists(lstRole.Distinct().ToArray(), x => x == jsonListRight[i]) && jsonListStatus[i] == "true") || (!Array.Exists(lstRole.Distinct().ToArray(), x => x == jsonListRight[i]) && jsonListStatus[i] == "false"))
        //            {
        //                _context.T_AD_USER_RIGHT.Remove(checkRight);
        //            }
        //            else if (Array.Exists(lstRole.Distinct().ToArray(), x => x == jsonListRight[i]) && jsonListStatus[i] == "false")
        //            {
        //                checkRight.IS_ADD = "N";
        //                checkRight.IS_REMOVE = "Y";
        //            }
        //            else if (!Array.Exists(lstRole.Distinct().ToArray(), x => x == jsonListRight[i]) && jsonListStatus[i] == "true")
        //            {
        //                checkRight.IS_ADD = "Y";
        //                checkRight.IS_REMOVE = "N";
        //            }
        //        }
        //        else
        //        {
        //            var right = new T_AD_USER_RIGHT()
        //            {
        //                ID = Guid.NewGuid(),
        //                USER_NAME = username,
        //                FK_RIGHT = jsonListRight[i],
        //                IS_ADD = jsonListStatus[i] == "true" ? "Y" : "N",
        //                IS_REMOVE = jsonListStatus[i] == "false" ? "Y" : "N",
        //            };
        //            await _context.T_AD_USER_RIGHT.AddAsync(right);
        //        }
        //    }

        //    await _context.SaveChangesAsync();
        //    return Ok(lstRight);
        //}

        //public static string EncryptStringMD5(string strSource)
        //{
        //    string str_md5 = "";
        //    byte[] mang = System.Text.Encoding.UTF8.GetBytes(strSource);

        //    MD5CryptoServiceProvider my_md5 = new MD5CryptoServiceProvider();
        //    mang = my_md5.ComputeHash(mang);

        //    foreach (byte b in mang)
        //    {
        //        str_md5 += b.ToString("X2");
        //    }

        //    return str_md5;
        //}
    }
}
