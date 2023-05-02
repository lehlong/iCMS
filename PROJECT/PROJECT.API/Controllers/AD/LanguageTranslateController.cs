using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json.Linq;
using PROJECT.API.Data;
using PROJECT.API.Models;
using PROJECT.API.Models.AD;
using PROJECT.API.Services.Interfaces.AD;
using System.Text.Json.Nodes;

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

        //[HttpGet]
        //[Route("GetList")]
        //public async Task<IActionResult> GetList()
        //{
        //    var lstLanguageTranslate = await _context.T_AD_LANGUAGE_TRANSLATE.Take(200).ToArrayAsync();           
        //    return Ok(lstLanguageTranslate);
        //}

        //[HttpPost]
        //[Route("Create")]
        //public async Task<IActionResult> Create([FromBody] T_AD_LANGUAGE_TRANSLATE request)
        //{
        //    request.ID = Guid.NewGuid();
        //    await _context.T_AD_LANGUAGE_TRANSLATE.AddAsync(request);
        //    await _context.SaveChangesAsync();
        //    return Ok(request);
        //}       

        //[HttpPut]
        //[Route("Update/{id:Guid}")]
        //public async Task<IActionResult> UpdateItem([FromRoute] Guid id, T_AD_LANGUAGE_TRANSLATE request)
        //{
        //    var item = await _context.T_AD_LANGUAGE_TRANSLATE.FindAsync(id);
        //    if (item == null)
        //    {
        //        return NotFound();
        //    }
        //    item.CONTENT = request.CONTENT;
        //    item.UPDATE_DATE = DateTime.Now;

        //    await _context.SaveChangesAsync();

        //    return Ok(item);
        //}

        //[HttpDelete]
        //[Route("Delete/{id:Guid}")]
        //public async Task<IActionResult> DeleteItem([FromRoute] Guid id)
        //{
        //    var item = await _context.T_AD_LANGUAGE_TRANSLATE.FindAsync(id);
        //    if (item == null)
        //    {
        //        return NotFound();
        //    }
        //    _context.T_AD_LANGUAGE_TRANSLATE.Remove(item);
        //    await _context.SaveChangesAsync();
        //    return Ok(item);
        //}
    }
}
