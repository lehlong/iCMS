using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Net.Http.Headers;
using PROJECT.Core.Models.AD;
using PROJECT.Service.Extention;
using PROJECT.Service.Interfaces.AD;
using System.Net;

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
            var tranferObject = new TranferObject();
            var result = await _service.BuildTreeOrganize();
            if (_service.Status)
            {
                tranferObject.Data = result;
            }
            return Ok(tranferObject);
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
            var tranferObject = new TranferObject();
            await _service.UpdateOrder(request);
            if (_service.Status)
            {
                tranferObject.Message = await _service.GetMessage("S1000", Request.Headers["Language"]);
            } 
            return Ok(tranferObject);
        }

        [HttpPut]
        [Route("Update")]
        public async Task<IActionResult> UpdateItem([FromBody] T_AD_ORGANIZE request)
        {
            var tranferObject = new TranferObject();
            await _service.Update(request);
            if (_service.Status)
            {
                tranferObject.Message = await _service.GetMessage("S1000", Request.Headers["Language"]);
            }
            return Ok(tranferObject);
        }

        [HttpPost]
        [Route("Create")]
        public async Task<IActionResult> Create([FromBody] T_AD_ORGANIZE request)
        {
            var tranferObject = new TranferObject();
            await _service.Create(request);
            if (_service.Status)
            {
                tranferObject.Message = await _service.GetMessage("S1000", Request.Headers["Language"]);
            }
            return Ok(tranferObject);
        }
    }
}
