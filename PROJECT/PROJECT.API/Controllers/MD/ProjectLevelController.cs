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
    public class ProjectLevelController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        public ProjectLevelController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        [Route("GetList")]
        public async Task<IActionResult> GetList()
        {
            var lstProjectLevel = await _context.T_MD_PROJECT_LEVEL.ToArrayAsync();
            return Ok(lstProjectLevel);
        }

        [HttpGet]
        [Route("Search/{key}")]
        public async Task<IActionResult> Search([FromRoute] string key)
        {
            var lstProjectLevel = key == "Empty" ? await _context.T_MD_PROJECT_LEVEL.ToArrayAsync() : await _context.T_MD_PROJECT_LEVEL.Where(x => x.NAME.Contains(key) || x.CODE.Contains(key)).ToArrayAsync();
            return Ok(lstProjectLevel);
        }

        [HttpPost]
        [Route("Create")]
        public async Task<IActionResult> Create([FromBody] T_MD_PROJECT_LEVEL request)
        {
            await _context.T_MD_PROJECT_LEVEL.AddAsync(request);
            await _context.SaveChangesAsync();
            return Ok(request);
        }

        [HttpGet]
        [Route("Detail/{code}")]
        public async Task<IActionResult> EditItem([FromRoute] string code)
        {
            var item = await _context.T_MD_PROJECT_LEVEL.FirstOrDefaultAsync(x => x.CODE == code);
            if (item == null)
            {
                return NotFound();
            }
            return Ok(item);
        }

        [HttpPut]
        [Route("Update/{code}")]
        public async Task<IActionResult> UpdateItem([FromRoute] string code, T_MD_PROJECT_LEVEL request)
        {
            var item = await _context.T_MD_PROJECT_LEVEL.FindAsync(code);
            if (item == null)
            {
                return NotFound();
            }
            item.NAME = request.NAME;
            item.VALUE_FROM = request.VALUE_FROM;
            item.VALUE_TO = request.VALUE_TO;
            item.THOI_GIAN = request.THOI_GIAN;
            item.NOTES = request.NOTES;
            item.UPDATE_DATE = DateTime.Now;

            await _context.SaveChangesAsync();

            return Ok(item);
        }

        [HttpDelete]
        [Route("Delete/{code}")]
        public async Task<IActionResult> DeleteItem([FromRoute] string code)
        {
            var item = await _context.T_MD_PROJECT_LEVEL.FindAsync(code);
            if (item == null)
            {
                return NotFound();
            }
            _context.T_MD_PROJECT_LEVEL.Remove(item);
            await _context.SaveChangesAsync();
            return Ok(item);
        }
    }
}
