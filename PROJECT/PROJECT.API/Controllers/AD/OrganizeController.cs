using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PROJECT.Core.Models.AD;
using PROJECT.Service.Interfaces.AD;

namespace PROJECT.API.Controllers.MD
{
    [ApiController]
    [Authorize]
    [Route("api/[controller]")]
    public class OrganizeController : ControllerBase
    {
        private readonly IOrganizeService _service;
        public OrganizeController(IOrganizeService service)
        {
            _service = service;
        }

        [HttpGet]
        [Route("BuildTree")]
        public async Task<IActionResult> BuildTree()
        {        
            return Ok(await _service.BuildTreeOrganize());
        }

        [HttpGet]
        [Route("Search/{key}")]
        public async Task<IActionResult> Search([FromRoute] string key)
        {
            return Ok(await _service.Search(key));
        }

        [HttpGet]
        [Route("GetDetail/{pkid}")]
        public async Task<IActionResult> GetDetail([FromRoute] string pkid)
        {
            return Ok(await _service.GetDetail(pkid));
        }

        [HttpPut]
        [Route("UpdateOrder/{request}")]
        public async Task<IActionResult> updateOrder([FromRoute] string request)
        {
            return Ok(await _service.UpdateOrder(request));
        }

        [HttpPut]
        [Route("Update")]
        public async Task<IActionResult> UpdateItem([FromBody] T_AD_ORGANIZE request)
        {
            return Ok(await _service.Update(request));
        }

        [HttpPost]
        [Route("Create")]
        public async Task<IActionResult> Create([FromBody] T_AD_ORGANIZE request)
        {
            return Ok(await _service.Create(request));
        }
    }
}
