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
    public class ProjectTypeController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        public ProjectTypeController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        [Route("GetList")]
        public async Task<IActionResult> GetList()
        {
            var lstProjectType = await _context.T_MD_PROJECT_TYPE.ToArrayAsync();
            return Ok(lstProjectType);
        }

        [HttpGet]
        [Route("Search/{key}")]
        public async Task<IActionResult> Search([FromRoute] string key)
        {
            var lstProjectType = key == "Empty" ? await _context.T_MD_PROJECT_TYPE.ToArrayAsync() : await _context.T_MD_PROJECT_TYPE.Where(x => x.NAME.Contains(key) || x.CODE.Contains(key)).ToArrayAsync();
            return Ok(lstProjectType);
        }

        [HttpPost]
        [Route("Create")]
        public async Task<IActionResult> Create([FromBody] T_MD_PROJECT_TYPE request)
        {
            await _context.T_MD_PROJECT_TYPE.AddAsync(request);
            await _context.SaveChangesAsync();
            return Ok(request);
        }

        [HttpGet]
        [Route("Detail/{code}")]
        public async Task<IActionResult> EditItem([FromRoute] string code)
        {
            var item = await _context.T_MD_PROJECT_TYPE.FirstOrDefaultAsync(x => x.CODE == code);
            if (item == null)
            {
                return NotFound();
            }
            return Ok(item);
        }

        [HttpPut]
        [Route("Update/{code}")]
        public async Task<IActionResult> UpdateItem([FromRoute] string code, T_MD_PROJECT_TYPE request)
        {
            var item = await _context.T_MD_PROJECT_TYPE.FindAsync(code);
            if (item == null)
            {
                return NotFound();
            }
            item.NAME = request.NAME;
            item.ACTIVE = request.ACTIVE;
            item.UPDATE_DATE = DateTime.Now;

            await _context.SaveChangesAsync();

            return Ok(item);
        }

        [HttpDelete]
        [Route("Delete/{code}")]
        public async Task<IActionResult> DeleteItem([FromRoute] string code)
        {
            var item = await _context.T_MD_PROJECT_TYPE.FindAsync(code);
            if (item == null)
            {
                return NotFound();
            }
            _context.T_MD_PROJECT_TYPE.Remove(item);
            await _context.SaveChangesAsync();
            return Ok(item);
        }
    }
}
