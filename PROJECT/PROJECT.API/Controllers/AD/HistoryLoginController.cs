using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using PROJECT.API.Data;
using PROJECT.API.Hubs;
using PROJECT.API.Models.Common;

namespace PROJECT.API.Controllers.AD
{
    [ApiController]
    [Route("api/[controller]")]
    public class HistoryLoginController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        public HistoryLoginController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        [Route("Search/{date}")]
        public async Task<IActionResult> Search([FromRoute] string date)
        {
            var hihi = OnlineCountHub._lstConnectionUser.ToArray().Distinct().ToList();
            var jsonDate = JsonConvert.DeserializeObject<OnChangeDate>(date);
            var lstHistory = await _context.T_AD_HISTORY_LOGIN.Where(x => x.LOGIN_TIME >= DateTime.Parse(jsonDate.startDate) && x.LOGIN_TIME <= DateTime.Parse(jsonDate.finishDate).AddDays(1).AddTicks(-1)).ToArrayAsync();
            return Ok(lstHistory);
        }

        [HttpGet]
        [Route("UserOnline")]
        public async Task<IActionResult> UserOnline()
        {
            var lstConnectionUser = OnlineCountHub._lstConnectionUser.ToArray().Distinct().ToList();
            var lstHistory = await _context.T_AD_USER.Where(x => lstConnectionUser.Contains(x.USER_NAME)).ToArrayAsync();
            return Ok(lstHistory);
        }
    }
}
