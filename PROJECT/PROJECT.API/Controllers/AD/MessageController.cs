using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PROJECT.Service.Interfaces.AD;

namespace PROJECT.API.Controllers.AD
{
    [ApiController]
    [Authorize]
    [Route("api/[controller]")]
    public class MessageController : ControllerBase
    {
        private readonly IMessageService _service;
        public MessageController(IMessageService service)
        {
            _service = service;
        }

        [HttpGet]
        [Route("GetList")]
        public async Task<IActionResult> GetList()
        {
            var lstMessage = await _service.GetAll();
            return Ok(lstMessage);
        }

        //[HttpGet]
        //[Route("Search/{key}")]
        //public async Task<IActionResult> Search([FromRoute] string key)
        //{
        //    var lstMessage = key == "Empty" ? await _context.T_AD_MESSAGE.ToArrayAsync() : await _context.T_AD_MESSAGE.Where(x => x.CODE.Contains(key) || x.LANGUAGE.Contains(key) || x.MESSAGE.Contains(key)).ToArrayAsync();
        //    return Ok(lstMessage);
        //}

        //[HttpPost]
        //[Route("Create")]
        //public async Task<IActionResult> Create([FromBody] T_AD_MESSAGE request)
        //{
        //    request.PKID = Guid.NewGuid().ToString();
        //    await _context.T_AD_MESSAGE.AddAsync(request);
        //    await _context.SaveChangesAsync();
        //    return Ok(request);
        //}

        //[HttpGet]
        //[Route("Detail/{pkid}")]
        //public async Task<IActionResult> EditItem([FromRoute] string pkid)
        //{
        //    var item = await _context.T_AD_MESSAGE.FirstOrDefaultAsync(x => x.PKID == pkid);
        //    if (item == null)
        //    {
        //        return NotFound();
        //    }
        //    return Ok(item);
        //}

        //[HttpPut]
        //[Route("Update/{pkid}")]
        //public async Task<IActionResult> UpdateItem([FromRoute] string pkid, T_AD_MESSAGE request)
        //{
        //    var item = await _context.T_AD_MESSAGE.FindAsync(pkid);
        //    if (item == null)
        //    {
        //        return NotFound();
        //    }
        //    item.MESSAGE = request.MESSAGE;
        //    item.UPDATE_DATE = DateTime.Now;

        //    await _context.SaveChangesAsync();

        //    return Ok(item);
        //}

        //[HttpDelete]
        //[Route("Delete/{pkid}")]
        //public async Task<IActionResult> DeleteItem([FromRoute] string pkid)
        //{
        //    var item = await _context.T_AD_MESSAGE.FindAsync(pkid);
        //    if (item == null)
        //    {
        //        return NotFound();
        //    }
        //    _context.T_AD_MESSAGE.Remove(item);
        //    await _context.SaveChangesAsync();
        //    return Ok(item);
        //}
    }
}
