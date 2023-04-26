using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PROJECT.API.Data;
using PROJECT.API.Service;

namespace PROJECT.API.Controllers.MD
{
    [ApiController]
    [Authorize]
    [Route("api/[controller]")]
    public class TemplateTextElementController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        public TemplateTextElementController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        [Route("GetList")]
        public async Task<IActionResult> GetList()
        {
            var lstTemplateTextElement = await _context.T_CM_TEMPLATE_TEXT_ELEMENT.ToArrayAsync();
            return Ok(lstTemplateTextElement);
        }
    }
}
