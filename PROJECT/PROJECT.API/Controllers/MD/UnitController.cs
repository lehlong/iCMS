using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PROJECT.Core.Models.MD;
using PROJECT.Services.Interfaces.MD;

namespace PROJECT.API.Controllers.MD
{
    [ApiController]
    [Authorize]
    [Route("api/[controller]")]
    public class UnitController : ControllerBase
    {
        public IUnitService _service { get; set; }
        public UnitController(IUnitService service)
        {
            _service = service;
        }

        [AllowAnonymous]
        [HttpGet]
        public async Task<IEnumerable<T_MD_UNIT>> GetAll()
          => await _service.GetAll();
    }
}
