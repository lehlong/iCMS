using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PROJECT.API.Data;
using PROJECT.API.Models;
using PROJECT.API.Models.AD;
using XAct;

namespace PROJECT.API.Controllers.AD
{
    [ApiController]
    [Authorize]
    [Route("api/[controller]")]
    public class UserGroupRoleController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        public UserGroupRoleController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        [Route("GetList/{userGroupCode}")]
        public async Task<IActionResult> GetList([FromRoute] string userGroupCode)
        {
            var lstUserGroupRole = await _context.T_AD_USER_GROUP_ROLE.Where(x => x.USER_GROUP_CODE == userGroupCode).ToArrayAsync();
            foreach (var item in lstUserGroupRole)
            {
                var role = _context.T_AD_ROLE.FirstOrDefault(x => x.CODE == item.ROLE_CODE);
                item.Role = role;
            }
            return Ok(lstUserGroupRole);
        }

        [HttpPost]
        [Route("GetListForAdd")]
        public async Task<IActionResult> GetListForAdd([FromBody] List<T_AD_USER_GROUP_ROLE> currentUserGroupRole)
        {
            var lstRole = await _context.T_AD_ROLE.ToListAsync();
            lstRole.RemoveAll(x => currentUserGroupRole.Any(y => y.ROLE_CODE == x.CODE));
            
            return Ok(lstRole);
        }

        [HttpPost]
        [Route("AddRoleToUserGroup/{userGroupCode}/{roleCode}")]
        public async Task<IActionResult> AddRoleToUserGroup([FromRoute] string userGroupCode, [FromRoute] string roleCode)
        {
            var newRole = new T_AD_USER_GROUP_ROLE();
            newRole.USER_GROUP_CODE = userGroupCode;
            newRole.ROLE_CODE = roleCode;

            await _context.T_AD_USER_GROUP_ROLE.AddAsync(newRole);
            await _context.SaveChangesAsync();
            return Ok(newRole);
        }

        [HttpDelete]
        [Route("Delete/{userGroupCode}/{roleCode}")]
        public async Task<IActionResult> DeleteItem([FromRoute] string userGroupCode, [FromRoute] string roleCode)
        {
            var item = await _context.T_AD_USER_GROUP_ROLE.FirstOrDefaultAsync(x => x.ROLE_CODE == roleCode && x.USER_GROUP_CODE == userGroupCode);
            if (item == null)
            {
                return NotFound();
            }
            _context.T_AD_USER_GROUP_ROLE.Remove(item);
            await _context.SaveChangesAsync();
            return Ok(item);
        }
    }
}
