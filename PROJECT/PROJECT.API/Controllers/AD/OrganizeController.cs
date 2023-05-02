using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using PROJECT.API.Data;
using PROJECT.API.Models;
using PROJECT.API.Models.AD;
using PROJECT.API.Models.MD;
using PROJECT.API.Services.Interfaces.AD;
using static PROJECT.API.Models.Common.NodeTree;

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

        //[HttpGet]
        //[Route("GetListCP")]
        //public async Task<IActionResult> GetListCP()
        //{
        //    var dataOrganize = await _context.T_AD_ORGANIZE.Where(x => x.TYPE == "CP").ToArrayAsync();

        //    return Ok(dataOrganize);
        //}

        //[HttpGet]
        //[Route("GetListBP")]
        //public async Task<IActionResult> GetListBP()
        //{
        //    var dataOrganize = await _context.T_AD_ORGANIZE.Where(x => x.TYPE == "BP").ToArrayAsync();

        //    return Ok(dataOrganize);
        //}

        [HttpGet]
        [Route("BuildTree")]
        public async Task<IActionResult> BuildTree()
        {        
            return Ok(await _service.BuildTreeOrganize());
        }

        //[HttpGet]
        //[Route("Grid/DataTable")]
        //public async Task<IActionResult> GetDataTable()
        //{
        //    var dataOrganize = await _context.T_AD_ORGANIZE.ToArrayAsync();

        //    return Ok(dataOrganize);
        //}

        //[HttpGet]
        //[Route("Grid/BuildTree")]
        //public async Task<IActionResult> BuildTreeGrid()
        //{
        //    var lstNode = new List<NodeOrganize>();
        //    var dataOrganize = await _context.T_AD_ORGANIZE.Where(x => x.TYPE == "CP").ToListAsync();

        //    foreach (var item in dataOrganize.OrderBy(x => x.C_ORDER))
        //    {
        //        var node = new NodeOrganize()
        //        {
        //            id = item.PKID,
        //            pId = item.PARENT,
        //            name = item.NAME
        //        };
        //        lstNode.Add(node);
        //    }

        //    return Ok(lstNode);
        //}

        //[HttpGet]
        //[Route("Search/{key}")]
        //public async Task<IActionResult> Search([FromRoute] string key)
        //{
        //    var lstNode = new List<NodeOrganize>();
        //    var dataOrganize = key == "Empty" ? await _context.T_AD_ORGANIZE.ToArrayAsync() : await _context.T_AD_ORGANIZE.Where(x => x.NAME.Contains(key)).ToArrayAsync();
            
        //    foreach (var item in dataOrganize.OrderBy(x => x.C_ORDER))
        //    {
        //        var node = new NodeOrganize()
        //        {
        //            id = item.PKID,
        //            pId = item.PARENT,
        //            name = item.NAME
        //        };
        //        lstNode.Add(node);
        //    }
        //    return Ok(lstNode);
        //}

        //[HttpGet]
        //[Route("Detail/{id}")]
        //public async Task<IActionResult> GetDetail([FromRoute] string id)
        //{
        //    var item = await _context.T_AD_ORGANIZE.FirstOrDefaultAsync(x => x.PKID == id);
        //    if (item == null)
        //    {
        //        return NotFound();
        //    }
        //    return Ok(item);
        //}

        //[HttpGet]
        //[Route("GetChild/{id}")]
        //public async Task<IActionResult> GetChildCompany([FromRoute] string id)
        //{
        //    var item = await _context.T_AD_ORGANIZE.Where(x => x.PARENT == id).ToArrayAsync();
        //    if (item == null)
        //    {
        //        return NotFound();
        //    }
        //    return Ok(item);
        //}

        //[HttpGet]
        //[Route("Grid/Search/{key}")]
        //public async Task<IActionResult> SearchGrid([FromRoute] string key)
        //{
        //    var lstNode = new List<NodeOrganize>();
        //    var dataOrganize = key == "Empty" ? await _context.T_AD_ORGANIZE.Where(x => x.TYPE == "CP").ToArrayAsync() : await _context.T_AD_ORGANIZE.Where(x => x.NAME.Contains(key) && x.TYPE == "CP").ToArrayAsync();

        //    foreach (var item in dataOrganize.OrderBy(x => x.C_ORDER))
        //    {
        //        var node = new NodeOrganize()
        //        {
        //            id = item.PKID,
        //            pId = item.PARENT,
        //            name = item.NAME
        //        };
        //        lstNode.Add(node);
        //    }
        //    return Ok(lstNode);
        //}

        //[HttpDelete]
        //[Route("Delete/{id}")]
        //public async Task<IActionResult> DeleteItem([FromRoute] string id)
        //{
        //    var item = await _context.T_AD_ORGANIZE.FirstOrDefaultAsync(x => x.PKID == id);
        //    if (item == null)
        //    {
        //        return NotFound();
        //    }
        //    _context.T_AD_ORGANIZE.Remove(item);
        //    await _context.SaveChangesAsync();

        //    var lstNode = new List<NodeOrganize>();
        //    var dataOrganize = await _context.T_AD_ORGANIZE.ToListAsync();

        //    foreach (var org in dataOrganize.OrderBy(x => x.C_ORDER))
        //    {
        //        var node = new NodeOrganize()
        //        {
        //            id = org.PKID,
        //            pId = org.PARENT,
        //            name = org.NAME
        //        };
        //        lstNode.Add(node);
        //    }
        //    return Ok(lstNode);
        //}

        //[HttpPut]
        //[Route("Update/{request}")]
        //public async Task<IActionResult> updateItem([FromRoute] string request)
        //{
        //    var jsonData = JsonConvert.DeserializeObject<T_AD_ORGANIZE>(request);
        //    var item = await _context.T_AD_ORGANIZE.FindAsync(jsonData.PKID);
        //    if (item == null)
        //    {
        //        return NotFound();
        //    }
        //    item.NAME = jsonData.NAME;
        //    item.TYPE = jsonData.TYPE;
        //    item.COMPANY_CODE = jsonData.COMPANY_CODE;
        //    item.COST_CENTER_CODE = jsonData.COST_CENTER_CODE;
        //    item.UPDATE_DATE = DateTime.Now;

        //    await _context.SaveChangesAsync();

        //    var lstNode = new List<NodeOrganize>();
        //    var dataOrganize = await _context.T_AD_ORGANIZE.ToListAsync();

        //    foreach (var node in dataOrganize.OrderBy(x => x.C_ORDER))
        //    {
        //        var nodeItem = new NodeOrganize()
        //        {
        //            id = node.PKID,
        //            pId = node.PARENT,
        //            name = node.NAME
        //        };
        //        lstNode.Add(nodeItem);
        //    }

        //    return Ok(lstNode);
        //}

        //[HttpPut]
        //[Route("UpdateOrder/{request}")]
        //public async Task<IActionResult> updateOrder([FromRoute] string request)
        //{
        //    var jsonData = JsonConvert.DeserializeObject<NodeOrganize[]>(request);
        //    for(var i = 0; i< jsonData.Length; i++)
        //    {
        //        var item = await _context.T_AD_ORGANIZE.FindAsync(jsonData[i].id);
        //        if(item == null)
        //        {
        //            continue;
        //        }
        //        else
        //        {
        //            item.PARENT = jsonData[i].pId;
        //            item.C_ORDER = i;
        //        }
        //    }
        //    await _context.SaveChangesAsync();
        //    return Ok(jsonData);
        //}

        //[HttpPost]
        //[Route("Create/{request}")]
        //public async Task<IActionResult> AddItem([FromRoute] string request)
        //{
        //    var jsonData = JsonConvert.DeserializeObject<T_AD_ORGANIZE>(request);
        //    jsonData.PKID = Guid.NewGuid().ToString();
        //    await _context.T_AD_ORGANIZE.AddAsync(jsonData);
        //    await _context.SaveChangesAsync();

        //    var lstNode = new List<NodeOrganize>();
        //    var dataOrganize = await _context.T_AD_ORGANIZE.ToListAsync();

        //    foreach (var node in dataOrganize.OrderBy(x => x.C_ORDER))
        //    {
        //        var nodeItem = new NodeOrganize()
        //        {
        //            id = node.PKID,
        //            pId = node.PARENT,
        //            name = node.NAME
        //        };
        //        lstNode.Add(nodeItem);
        //    }

        //    return Ok(lstNode);
        //}
    }
}
