using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PROJECT.API.Services.Interfaces.MD;

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

        [HttpGet("GetAll")]
        [AllowAnonymous]
        public async Task<IActionResult> GetAll()
        {
            return Ok(await _service.GetAll());
        }
    }
}
