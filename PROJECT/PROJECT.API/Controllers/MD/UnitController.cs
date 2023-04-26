using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PROJECT.API.Data;
using PROJECT.API.Models;
using PROJECT.API.Models.MD;
using PROJECT.Services.Interfaces.MD;

namespace PROJECT.API.Controllers.MD
{
    [ApiController]
    [Authorize]
    [Route("api/[controller]")]
    public class UnitController : ControllerBase
    {
        public readonly IUnitService _service;
        public UnitController(IUnitService service)
        {
            _service = service;
        }

        [AllowAnonymous]
        [HttpGet]
        public async Task<IActionResult> GetProductList()
        {
            var productDetailsList = await _service.GetAllUnits();
            if (productDetailsList == null)
            {
                return NotFound();
            }
            return Ok(productDetailsList);
        }
    }
}
