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
    public class CustomerController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        public CustomerController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        [Route("GetList")]
        public async Task<IActionResult> GetList()
        {
            var lstCustomer = await _context.T_MD_CUSTOMER.Take(200).ToArrayAsync();
            return Ok(lstCustomer);
        }   

        [HttpPost]
        [Route("Create")]
        public async Task<IActionResult> Create([FromBody] T_MD_CUSTOMER request)
        {
            await _context.T_MD_CUSTOMER.AddAsync(request);
            await _context.SaveChangesAsync();
            return Ok(request);
        }

        [HttpPut]
        [Route("Update/{code}")]
        public async Task<IActionResult> UpdateItem([FromRoute] string code, T_MD_CUSTOMER request)
        {
            var item = await _context.T_MD_CUSTOMER.FindAsync(code);
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
            var item = await _context.T_MD_CUSTOMER.FindAsync(code);
            if (item == null)
            {
                return NotFound();
            }
            _context.T_MD_CUSTOMER.Remove(item);
            await _context.SaveChangesAsync();
            return Ok(item);
        }
    }
}
