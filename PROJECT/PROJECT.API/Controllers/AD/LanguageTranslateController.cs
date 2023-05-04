using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PROJECT.Core.Models.AD;
using PROJECT.Service.Interfaces.AD;

namespace PROJECT.API.Controllers.AD
{
    [ApiController]
    [Authorize]
    [Route("api/[controller]")]
    public class LanguageTranslateController : ControllerBase
    {
        private readonly ILanguageTranslateService _service;
        public LanguageTranslateController(ILanguageTranslateService service)
        {
            _service = service;
        }

        [HttpGet]
        [AllowAnonymous]
        [Route("GetLang/{lang}.json")]
        public async Task<IActionResult> GetLanguage([FromRoute] string lang)
        {
            return Ok(await _service.GetSelectLanguage(lang));
        }

        [HttpGet]
        [Route("GetList")]
        public async Task<IActionResult> GetList()
        {
            return Ok(await _service.GetAll());
        }

        [HttpGet]
        [Route("Detail/{id:Guid}")]
        public async Task<IActionResult> Detail([FromRoute] Guid id)
        {
            return Ok(await _service.LanguageDetail(id));
        }

        [HttpPost]
        [Route("Create")]
        public async Task<IActionResult> Create([FromBody] T_AD_LANGUAGE_TRANSLATE request)
        {           
            return Ok(await _service.Create(request));
        }

        [HttpPut]
        [Route("Update")]
        public async Task<IActionResult> UpdateItem([FromBody] T_AD_LANGUAGE_TRANSLATE request)
        {
            return Ok(await _service.Update(request));
        }        
    }
}
