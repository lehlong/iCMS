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
    public class ConfigTextElementController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        public ConfigTextElementController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        [Route("GetList")]
        public async Task<IActionResult> GetList()
        {
            var lstConfigTextElement = await _context.T_AD_CONFIG_TEXT_ELEMENT.FirstOrDefaultAsync();
            return Ok(lstConfigTextElement);
        }

        [HttpPut]
        [Route("Update/{id}")]
        public async Task<IActionResult> UpdateItem([FromRoute] string id, T_AD_CONFIG_TEXT_ELEMENT request)
        {
            var item = await _context.T_AD_CONFIG_TEXT_ELEMENT.FindAsync(Guid.Parse(id));
            if (item == null)
            {
                return NotFound();
            }
            item.START_WORD = request.START_WORD;
            item.END_WORD = request.END_WORD;

            await _context.SaveChangesAsync();

            return Ok(item);
        }
    }
}
