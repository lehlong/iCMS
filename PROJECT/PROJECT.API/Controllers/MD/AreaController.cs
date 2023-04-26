using JWT;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json.Linq;
using PROJECT.API.Data;
using PROJECT.API.Models;
using PROJECT.API.Models.Authentication;
using PROJECT.API.Models.MD;
using PROJECT.API.Service;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace PROJECT.API.Controllers.MD
{
    [ApiController]
    [Authorize]
    [Route("api/[controller]")]
    public class AreaController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly CommonService _service;
        public AreaController(ApplicationDbContext context)
        {
            _context = context;
            _service = new CommonService(context);
        }

        [HttpGet]
        [Route("GetList")]
        public async Task<IActionResult> GetList()
        {
            var lstArea = await _context.T_MD_AREA.ToArrayAsync();
            return Ok(lstArea);
        }

        [HttpGet]
        [Route("Search/{key}")]
        public async Task<IActionResult> Search([FromRoute] string key)
        {
            var lstArea = key == "Empty" ? await _context.T_MD_AREA.ToArrayAsync() : await _context.T_MD_AREA.Where(x => x.NAME.Contains(key) || x.CODE.Contains(key)).ToArrayAsync();
            return Ok(lstArea);
        }

        [HttpPost]
        [Route("Create")]
        public async Task<IActionResult> Create([FromBody] T_MD_AREA request)
        {
            var token = Request.Headers.Authorization.ToString().Split(" ")[1];

            request.CREATE_BY = _service.GetUserFromJWTToken(token);
            request.CREATE_DATE = DateTime.Now;
            await _context.T_MD_AREA.AddAsync(request);
            await _context.SaveChangesAsync();
            return Ok(request);
        }

        [HttpGet]
        [Route("Detail/{code}")]
        public async Task<IActionResult> EditItem([FromRoute] string code)
        {
            var item = await _context.T_MD_AREA.FirstOrDefaultAsync(x => x.CODE == code);
            if (item == null)
            {
                return NotFound();
            }
            return Ok(item);
        }

        [HttpPut]
        [Route("Update/{code}")]
        public async Task<IActionResult> UpdateItem([FromRoute] string code, T_MD_AREA request)
        {
            var item = await _context.T_MD_AREA.FindAsync(code);
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
            var item = await _context.T_MD_AREA.FindAsync(code);
            if (item == null)
            {
                return NotFound();
            }
            _context.T_MD_AREA.Remove(item);
            await _context.SaveChangesAsync();
            return Ok(item);
        }
    }
}
