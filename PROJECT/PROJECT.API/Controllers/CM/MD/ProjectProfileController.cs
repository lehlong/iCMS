using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PROJECT.API.Data;
using PROJECT.API.Models;
using PROJECT.API.Models.MD;

namespace PROJECT.API.Controllers.MD
{
    [ApiController]
    [Authorize]
    [Route("api/[controller]")]
    public class ProjectProfileController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        public ProjectProfileController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        [Route("GetList")]
        public async Task<IActionResult> GetList()
        {
            var lstProjectProfile = await _context.T_MD_PROJECT_PROFILE.ToArrayAsync();
            return Ok(lstProjectProfile);
        }

        [HttpGet]
        [Route("Search/{key}")]
        public async Task<IActionResult> Search([FromRoute] string key)
        {
            var lstProjectProfile = key == "Empty" ? await _context.T_MD_PROJECT_PROFILE.ToArrayAsync() : await _context.T_MD_PROJECT_PROFILE.Where(x => x.COMPANY_CODE.Contains(key) || x.PROJECT_PROFILE.Contains(key) || x.PROJECT_TYPE.Contains(key) || x.FIRST_CHARACTER.Contains(key)).ToArrayAsync();
            return Ok(lstProjectProfile);
        }

        [HttpPost]
        [Route("Create")]
        public async Task<IActionResult> Create([FromBody] T_MD_PROJECT_PROFILE request)
        {
            await _context.T_MD_PROJECT_PROFILE.AddAsync(request);
            await _context.SaveChangesAsync();
            return Ok(request);
        }

        [HttpGet]
        [Route("Detail/{id:Guid}")]
        public async Task<IActionResult> EditItem([FromRoute] Guid id)
        {
            var item = await _context.T_MD_PROJECT_PROFILE.FirstOrDefaultAsync(x => x.ID == id);
            if (item == null)
            {
                return NotFound();
            }
            return Ok(item);
        }

        [HttpPut]
        [Route("Update/{id:Guid}")]
        public async Task<IActionResult> UpdateItem([FromRoute] Guid id, T_MD_PROJECT_PROFILE request)
        {
            var item = await _context.T_MD_PROJECT_PROFILE.FindAsync(id);
            if (item == null)
            {
                return NotFound();
            }
            item.COMPANY_CODE = request.COMPANY_CODE;
            item.PROJECT_PROFILE = request.PROJECT_PROFILE;
            item.FIRST_CHARACTER = request.FIRST_CHARACTER;
            item.PROJECT_TYPE = request.PROJECT_TYPE;
            item.UPDATE_DATE = DateTime.Now;

            await _context.SaveChangesAsync();

            return Ok(item);
        }

        [HttpDelete]
        [Route("Delete/{id:Guid}")]
        public async Task<IActionResult> DeleteItem([FromRoute] Guid id)
        {
            var item = await _context.T_MD_PROJECT_PROFILE.FindAsync(id);
            if (item == null)
            {
                return NotFound();
            }
            _context.T_MD_PROJECT_PROFILE.Remove(item);
            await _context.SaveChangesAsync();
            return Ok(item);
        }
    }
}
