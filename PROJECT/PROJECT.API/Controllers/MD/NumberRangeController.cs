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
    public class NumberRangeController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        public NumberRangeController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        [Route("GetList")]
        public async Task<IActionResult> GetList()
        {
            var lstUnit = await _context.T_MD_NUMBER_RANGE.ToArrayAsync();
            return Ok(lstUnit);
        }

        [HttpGet]
        [Route("Search/{key}")]
        public async Task<IActionResult> Search([FromRoute] string key)
        {
            var lstUnit = key == "Empty" ? await _context.T_MD_NUMBER_RANGE.ToArrayAsync() : await _context.T_MD_NUMBER_RANGE.Where(x => x.CHARACTER.Contains(key)).ToArrayAsync();
            return Ok(lstUnit);
        }

        [HttpPost]
        [Route("Create")]
        public async Task<IActionResult> Create([FromBody] T_MD_NUMBER_RANGE request)
        {
            request.ID = Guid.NewGuid();
            await _context.T_MD_NUMBER_RANGE.AddAsync(request);
            await _context.SaveChangesAsync();
            return Ok(request);
        }

        [HttpGet]
        [Route("Detail/{id:Guid}")]
        public async Task<IActionResult> EditItem([FromRoute] Guid id)
        {
            var item = await _context.T_MD_NUMBER_RANGE.FirstOrDefaultAsync(x => x.ID == id);
            if (item == null)
            {
                return NotFound();
            }
            return Ok(item);
        }

        [HttpPut]
        [Route("Update/{id:Guid}")]
        public async Task<IActionResult> UpdateItem([FromRoute] Guid id, T_MD_NUMBER_RANGE request)
        {
            var item = await _context.T_MD_NUMBER_RANGE.FindAsync(id);
            if (item == null)
            {
                return NotFound();
            }
            item.CHARACTER= request.CHARACTER;
            item.CURRENT_NUMBER = request.CURRENT_NUMBER;
            item.UPDATE_DATE = DateTime.Now;

            await _context.SaveChangesAsync();

            return Ok(item);
        }

        [HttpDelete]
        [Route("Delete/{id:Guid}")]
        public async Task<IActionResult> DeleteItem([FromRoute] Guid id)
        {
            var item = await _context.T_MD_NUMBER_RANGE.FindAsync(id);
            if (item == null)
            {
                return NotFound();
            }
            _context.T_MD_NUMBER_RANGE.Remove(item);
            await _context.SaveChangesAsync();
            return Ok(item);
        }
    }
}
