using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using PROJECT.API.Data;
using PROJECT.API.Models;
using PROJECT.API.Models.AD;
using PROJECT.API.Models.MD;
using static PROJECT.API.Models.Common.NodeTree;

namespace PROJECT.API.Controllers.MD
{
    [ApiController]
    [Authorize]
    [Route("api/[controller]")]
    public class RightController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        public RightController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        [Route("BuildTree")]
        public async Task<IActionResult> BuildTree()
        {
            var lstNode = new List<NodeRight>();
            var dataRight = await _context.T_AD_RIGHT.ToListAsync();

            foreach (var item in dataRight.OrderBy(x => x.C_ORDER))
            {
                var node = new NodeRight()
                {
                    id = item.CODE,
                    pId = item.PARENT,
                    name = $"{item.CODE} - {item.NAME}"
                };
                lstNode.Add(node);
            }

            return Ok(lstNode);
        }

        [HttpGet]
        [Route("Search/{key}")]
        public async Task<IActionResult> Search([FromRoute] string key)
        {
            var lstNode = new List<NodeRight>();
            var dataRight = key == "Empty" ? await _context.T_AD_RIGHT.ToArrayAsync() : await _context.T_AD_RIGHT.Where(x => x.NAME.Contains(key) || x.CODE.Contains(key)).ToArrayAsync();

            foreach (var item in dataRight.OrderBy(x => x.C_ORDER))
            {
                var node = new NodeRight()
                {
                    id = item.CODE,
                    pId = item.PARENT,
                    name = $"{item.CODE} - {item.NAME}"
                };
                lstNode.Add(node);
            }
            return Ok(lstNode);
        }

        [HttpGet]
        [Route("Detail/{code}")]
        public async Task<IActionResult> GetDetail([FromRoute] string code)
        {
            var item = await _context.T_AD_RIGHT.FirstOrDefaultAsync(x => x.CODE == code);
            if (item == null)
            {
                return NotFound();
            }
            return Ok(item);
        }

       

        [HttpDelete]
        [Route("Delete/{code}")]
        public async Task<IActionResult> DeleteItem([FromRoute] string code)
        {
            var item = await _context.T_AD_RIGHT.FirstOrDefaultAsync(x => x.CODE == code);
            if (item == null)
            {
                return NotFound();
            }
            _context.T_AD_RIGHT.Remove(item);
            await _context.SaveChangesAsync();

            var lstNode = new List<NodeRight>();
            var dataRight = await _context.T_AD_RIGHT.ToListAsync();

            foreach (var right in dataRight.OrderBy(x => x.C_ORDER))
            {
                var node = new NodeRight()
                {
                    id = right.CODE,
                    pId = right.PARENT,
                    name = $"{right.CODE} - {right.NAME}"
                };
                lstNode.Add(node);
            }
            return Ok(lstNode);
        }

        [HttpPut]
        [Route("Update/{request}")]
        public async Task<IActionResult> updateItem([FromRoute] string request)
        {
            var jsonData = JsonConvert.DeserializeObject<T_AD_RIGHT>(request);
            var item = await _context.T_AD_RIGHT.FindAsync(jsonData.CODE);
            if (item == null)
            {
                return NotFound();
            }
            item.NAME = jsonData.NAME;
            item.UPDATE_DATE = DateTime.Now;

            await _context.SaveChangesAsync();

            var lstNode = new List<NodeRight>();
            var dataRight = await _context.T_AD_RIGHT.ToListAsync();

            foreach (var node in dataRight.OrderBy(x => x.C_ORDER))
            {
                var nodeItem = new NodeRight()
                {
                    id = node.CODE,
                    pId = node.PARENT,
                    name = $"{node.CODE} - {node.NAME}"
                };
                lstNode.Add(nodeItem);
            }

            return Ok(lstNode);
        }

        [HttpPut]
        [Route("UpdateOrder/{request}")]
        public async Task<IActionResult> updateOrder([FromRoute] string request)
        {
            var jsonData = JsonConvert.DeserializeObject<NodeRight[]>(request);
            for (var i = 0; i < jsonData.Length; i++)
            {
                var item = await _context.T_AD_RIGHT.FindAsync(jsonData[i].id);
                if (item == null)
                {
                    continue;
                }
                else
                {
                    item.PARENT = jsonData[i].pId;
                    item.C_ORDER = i;
                }
            }
            await _context.SaveChangesAsync();
            return Ok(jsonData);
        }

        [HttpPost]
        [Route("Create/{request}")]
        public async Task<IActionResult> AddItem([FromRoute] string request)
        {
            var jsonData = JsonConvert.DeserializeObject<T_AD_RIGHT>(request);

            await _context.T_AD_RIGHT.AddAsync(jsonData);
            await _context.SaveChangesAsync();

            var lstNode = new List<NodeRight>();
            var dataRight = await _context.T_AD_RIGHT.ToListAsync();

            foreach (var node in dataRight.OrderBy(x => x.C_ORDER))
            {
                var nodeItem = new NodeRight()
                {
                    id = node.CODE,
                    pId = node.PARENT,
                    name = $"{node.CODE} - {node.NAME}"
                };
                lstNode.Add(nodeItem);
            }

            return Ok(lstNode);
        }
    }
}
