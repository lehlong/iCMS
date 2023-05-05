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
    public class VendorController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        public VendorController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        [Route("GetList")]
        public async Task<IActionResult> GetList()
        {
            var lstVendor = await _context.T_MD_VENDOR.ToArrayAsync();
            return Ok(lstVendor);
        }

        [HttpGet]
        [Route("Search/{key}")]
        public async Task<IActionResult> Search([FromRoute] string key)
        {
            var lstVendor = key == "Empty" ? await _context.T_MD_VENDOR.ToArrayAsync() : await _context.T_MD_VENDOR.Where(x => x.NAME.Contains(key) || x.CODE.Contains(key) || x.SHORT_NAME.Contains(key) || x.MST.Contains(key) || x.EMAIL.Contains(key) || x.PHONE.Contains(key)).ToArrayAsync();
            return Ok(lstVendor);
        }

        [HttpPost]
        [Route("Create")]
        public async Task<IActionResult> Create([FromBody] T_MD_VENDOR request)
        {
            await _context.T_MD_VENDOR.AddAsync(request);
            await _context.SaveChangesAsync();
            return Ok(request);
        }

        [HttpGet]
        [Route("Detail/{code}")]
        public async Task<IActionResult> EditItem([FromRoute] string code)
        {
            var item = await _context.T_MD_VENDOR.FirstOrDefaultAsync(x => x.CODE == code);
            if (item == null)
            {
                return NotFound();
            }
            return Ok(item);
        }

        [HttpPut]
        [Route("Update/{code}")]
        public async Task<IActionResult> UpdateItem([FromRoute] string code, T_MD_VENDOR request)
        {
            var item = await _context.T_MD_VENDOR.FindAsync(code);
            if (item == null)
            {
                return NotFound();
            }
            item.NAME = request.NAME;
            item.SHORT_NAME = request.SHORT_NAME;
            item.MST = request.MST;
            item.EMAIL = request.EMAIL;
            item.PHONE = request.PHONE;
            item.ADDRESS = request.ADDRESS;
            item.UPDATE_DATE = DateTime.Now;

            await _context.SaveChangesAsync();

            return Ok(item);
        }

        [HttpDelete]
        [Route("Delete/{code}")]
        public async Task<IActionResult> DeleteItem([FromRoute] string code)
        {
            var item = await _context.T_MD_VENDOR.FindAsync(code);
            if (item == null)
            {
                return NotFound();
            }
            _context.T_MD_VENDOR.Remove(item);
            await _context.SaveChangesAsync();
            return Ok(item);
        }
    }
}
