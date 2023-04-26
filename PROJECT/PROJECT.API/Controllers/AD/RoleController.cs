using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using PROJECT.API.Data;
using PROJECT.API.Models;
using PROJECT.API.Models.AD;
using PROJECT.API.Models.MD;
using static PROJECT.API.Models.Common.NodeTree;

namespace PROJECT.API.Controllers.AD
{
    [ApiController]
    [Authorize]
    [Route("api/[controller]")]
    public class RoleController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        public RoleController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        [Route("GetList")]
        public async Task<IActionResult> GetList()
        {
            var lstRole = await _context.T_AD_ROLE.ToArrayAsync();
            return Ok(lstRole);
        }

        [HttpGet]
        [Route("Detail/{code}")]
        public async Task<IActionResult> GetRoleDetail([FromRoute] string code)
        {
            var item = await _context.T_AD_ROLE.FindAsync(code);
            if (item == null)
            {
                return NotFound();
            }
            return Ok(item);
        }

        [HttpPut]
        [Route("Update/{code}")]
        public async Task<IActionResult> UpdateItem([FromRoute] string code, T_AD_ROLE request)
        {
            var item = await _context.T_AD_ROLE.FindAsync(code);
            if (item == null)
            {
                return NotFound();
            }
            item.NAME = request.NAME;
            item.NOTES = request.NOTES;
            item.UPDATE_DATE = DateTime.Now;

            await _context.SaveChangesAsync();

            return Ok(item);
        }

        [HttpGet]
        [Route("BuildTree/{code}")]
        public async Task<IActionResult> BuildTree([FromRoute] string code)
        {
            var lstNode = new List<NodeRight>();
            var dataRight = await _context.T_AD_RIGHT.ToArrayAsync();
            var dataRoleDetail = await _context.T_AD_ROLE_DETAIL.Where(x => x.FK_ROLE == code).ToArrayAsync();

            foreach (var item in dataRight.OrderBy(x => x.C_ORDER))
            {
                var node = new NodeRight()
                {
                    id = item.CODE,
                    pId = item.PARENT,
                    name = $"{item.CODE} - {item.NAME}"
                };
                foreach(var role in dataRoleDetail)
                {
                    if (role.FK_RIGHT == item.CODE) node.@checked = "true";
                }
                lstNode.Add(node);
            }

            return Ok(lstNode);
        }

        [HttpPost]
        [Route("UpdateRightOfRole/{code}/{lstRight}")]
        public async Task<IActionResult> updateRightOfRole([FromRoute] string code, [FromRoute] string lstRight)
        {
            var jsonData = JsonConvert.DeserializeObject<string[]>(lstRight);

            var currentRight = await _context.T_AD_ROLE_DETAIL.Where(x => x.FK_ROLE == code).ToArrayAsync();
            foreach(var item in currentRight)
            {
                _context.T_AD_ROLE_DETAIL.Remove(item);
            }

            foreach(var item in jsonData)
            {
                var right = new T_AD_ROLE_DETAIL()
                {
                    FK_ROLE = code,
                    FK_RIGHT = item,
                    UPDATE_DATE = DateTime.Now,
                };
                await _context.T_AD_ROLE_DETAIL.AddAsync(right);
            }
            await _context.SaveChangesAsync();
            return Ok(currentRight);
        }

        [HttpPost]
        [Route("Create")]
        public async Task<IActionResult> Create([FromBody] T_AD_ROLE request)
        {
            await _context.T_AD_ROLE.AddAsync(request);
            await _context.SaveChangesAsync();
            return Ok(request);
        }

        [HttpGet]
        [Route("Search/{key}")]
        public async Task<IActionResult> Search([FromRoute] string key)
        {
            var lstRole = key == "Empty" ? await _context.T_AD_ROLE.ToArrayAsync() : await _context.T_AD_ROLE.Where(x => x.NAME.Contains(key) || x.CODE.Contains(key)).ToArrayAsync();
            return Ok(lstRole);
        }
    }
}
