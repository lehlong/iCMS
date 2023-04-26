using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PROJECT.API.Data;
using PROJECT.API.Models;
using PROJECT.API.Models.AD;

namespace PROJECT.API.Controllers.AD
{
    [ApiController]
    [Authorize]
    [Route("api/[controller]")]
    public class UserGroupController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        public UserGroupController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        [Route("GetList")]
        public async Task<IActionResult> GetList()
        {
            var lstUserGroup = await _context.T_AD_USER_GROUP.ToArrayAsync();
            return Ok(lstUserGroup);
        }

        [HttpGet]
        [Route("Detail/{code}")]
        public async Task<IActionResult> GetUserGroupDetail([FromRoute] string code)
        {
            var item = await _context.T_AD_USER_GROUP.FindAsync(code);
            if (item == null)
            {
                return NotFound();
            }
            return Ok(item);
        }

        [HttpPut]
        [Route("Update/{code}")]
        public async Task<IActionResult> UpdateItem([FromRoute] string code, T_AD_USER_GROUP request)
        {
            var item = await _context.T_AD_USER_GROUP.FindAsync(code);
            if (item == null)
            {
                return NotFound();
            }
            item.NAME = request.NAME;
            item.NOTES = request.NOTES;
            item.UPDATE_DATE = DateTime.Now;

            await _context.SaveChangesAsync();

            return Ok(item);
        }

        [HttpPost]
        [Route("Create")]
        public async Task<IActionResult> Create([FromBody] T_AD_USER_GROUP request)
        {
            await _context.T_AD_USER_GROUP.AddAsync(request);
            await _context.SaveChangesAsync();
            return Ok(request);
        }

        [HttpGet]
        [Route("Search/{key}")]
        public async Task<IActionResult> Search([FromRoute] string key)
        {
            var lstUserGroup = key == "Empty" ? await _context.T_AD_USER_GROUP.ToArrayAsync() : await _context.T_AD_USER_GROUP.Where(x => x.NAME.Contains(key) || x.CODE.Contains(key)).ToArrayAsync();
            return Ok(lstUserGroup);
        }

        [HttpPost]
        [Route("GetListForAdd")]
        public async Task<IActionResult> GetListForAdd([FromBody] List<T_AD_USER_GROUP> currentUserGroupRole)
        {
            var lstUserGroup = await _context.T_AD_USER_GROUP.ToListAsync();
            lstUserGroup.RemoveAll(x => currentUserGroupRole.Any(y => y.CODE == x.CODE));

            return Ok(lstUserGroup);
        }
    }
}
