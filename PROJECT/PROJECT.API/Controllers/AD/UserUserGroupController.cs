using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PROJECT.API.Data;
using PROJECT.API.Models.AD;

namespace PROJECT.API.Controllers.AD
{
    [Route("api/[controller]")]
    [Authorize]
    [ApiController]
    public class UserUserGroupController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        public UserUserGroupController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        [Route("GetList/{userGroupCode}")]
        public async Task<IActionResult> GetList([FromRoute] string userGroupCode)
        {
            var lstUserUserGroup = await _context.T_AD_USER_USER_GROUP.Where(x => x.USER_GROUP_CODE == userGroupCode).ToArrayAsync();                     
            var lstUser = new List<T_AD_USER>();
            foreach(var user in lstUserUserGroup)
            {
                var dataUser = await _context.T_AD_USER.FirstOrDefaultAsync(x => x.USER_NAME == user.USER_NAME);
                lstUser.Add(dataUser);
            }

            return Ok(lstUser);
        }


        [HttpGet]
        [Route("GetListDetail/{username}")]
        public async Task<IActionResult> GetListDetail([FromRoute] string username)
        {
            var lstUserUserGroup = await _context.T_AD_USER_USER_GROUP.Where(x => x.USER_NAME == username).ToArrayAsync();
            var lstUserGroup = new List<T_AD_USER_GROUP>();
            
            foreach (var user in lstUserUserGroup)
            {
                var dataUser = await _context.T_AD_USER_GROUP.FirstOrDefaultAsync(x => x.CODE == user.USER_GROUP_CODE);
                lstUserGroup.Add(dataUser);
            }

            return Ok(lstUserGroup);
        }

        [HttpDelete]
        [Route("Delete/{userGroupCode}/{username}")]
        public async Task<IActionResult> DeleteItem([FromRoute] string userGroupCode, [FromRoute] string username)
        {
            var item = await _context.T_AD_USER_USER_GROUP.FirstOrDefaultAsync(x => x.USER_GROUP_CODE == userGroupCode && x.USER_NAME == username);
            if (item == null)
            {
                return NotFound();
            }
            _context.T_AD_USER_USER_GROUP.Remove(item);
            await _context.SaveChangesAsync();
            return Ok(item);
        }

        [HttpGet]
        [Route("ListUserForAdd/{userGroupCode}")]
        public async Task<IActionResult> ListUserForAdd([FromRoute] string userGroupCode)
        {
            var lstUserUserGroup = await _context.T_AD_USER_USER_GROUP.Where(x => x.USER_GROUP_CODE == userGroupCode).ToListAsync();
            var lstUser = await _context.T_AD_USER.ToListAsync();
            lstUser.RemoveAll(x => lstUserUserGroup.Any(y => y.USER_NAME == x.USER_NAME));
           
            return Ok(lstUser);
        }

        [HttpPost]
        [Route("AddUserToUserGroup/{userGroupCode}/{username}")]
        public async Task<IActionResult> AddUserToUserGroup([FromRoute] string userGroupCode, [FromRoute] string username)
        {
            var user = new T_AD_USER_USER_GROUP();
            user.ID = Guid.NewGuid();
            user.USER_NAME = username;
            user.USER_GROUP_CODE = userGroupCode;

            await _context.T_AD_USER_USER_GROUP.AddAsync(user);
            await _context.SaveChangesAsync();
            return Ok(user);
        }
    }
}
