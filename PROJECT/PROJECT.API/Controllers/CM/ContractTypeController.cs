using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PROJECT.API.Data;
using PROJECT.API.Models;
using PROJECT.API.Models.CM;
using PROJECT.API.Models.MD;

namespace PROJECT.API.Controllers.CM
{
    [ApiController]
    [Authorize]
    [Route("api/[controller]")]
    public class ContractTypeController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        public ContractTypeController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        [Route("GetList")]
        public async Task<IActionResult> GetList()
        {
            var lstContractType = await _context.T_CM_CONTRACT_TYPE.ToArrayAsync();
            return Ok(lstContractType);
        }       

        [HttpPost]
        [Route("Create")]
        public async Task<IActionResult> Create([FromBody] T_CM_CONTRACT_TYPE request)
        {
            await _context.T_CM_CONTRACT_TYPE.AddAsync(request);
            await _context.SaveChangesAsync();
            return Ok(request);
        }

        [HttpPut]
        [Route("Update/{code}")]
        public async Task<IActionResult> UpdateItem([FromRoute] string code, T_CM_CONTRACT_TYPE request)
        {
            var item = await _context.T_CM_CONTRACT_TYPE.FindAsync(code);
            if (item == null)
            {
                return NotFound();
            }
            item.NAME = request.NAME;
            item.IS_CUSTOMER = request.IS_CUSTOMER;

            item.UPDATE_DATE = DateTime.Now;

            await _context.SaveChangesAsync();

            return Ok(item);
        }

        [HttpDelete]
        [Route("Delete/{code}")]
        public async Task<IActionResult> DeleteItem([FromRoute] string code)
        {
            var item = await _context.T_CM_CONTRACT_TYPE.FindAsync(code);
            if (item == null)
            {
                return NotFound();
            }
            _context.T_CM_CONTRACT_TYPE.Remove(item);
            await _context.SaveChangesAsync();
            return Ok(item);
        }
    }
}
