using DocumentFormat.OpenXml.Packaging;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PROJECT.API.Data;
using PROJECT.API.Models.Common;
using System.Data;
using System.Net.Http.Headers;
using Microsoft.AspNetCore.Http.Extensions;
using DocumentFormat.OpenXml.Wordprocessing;
using Microsoft.AspNetCore.Http;
using System.Net.Http;
using PROJECT.API.Models.CM;

namespace PROJECT.API.Controllers.CM
{
    [ApiController]
    [Authorize]
    [Route("api/[controller]")]
    public class TemplateContractController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        public TemplateContractController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        [Route("GetListTemplate")]
        public async Task<IActionResult> GetListTemplate()
        {
            var lstTemplate = await _context.T_CM_TEMPLATE_CONTRACT.ToArrayAsync();
            return Ok(lstTemplate);
        }

        [HttpPost, DisableRequestSizeLimit]
        [Route("UploadTemplate")]
        public async Task<IActionResult> UploadTemplate()
        {
            try
            {
                var baseUrl = ConfigurationManager.AppSetting["BaseUrl"];
                var formCollection = await Request.ReadFormAsync();
                var file = formCollection.Files.First();
                var folderName = Path.Combine("Template");
                if (!Directory.Exists(folderName))
                {
                    Directory.CreateDirectory(folderName);
                }
                var pathToSave = Path.Combine(Directory.GetCurrentDirectory(), folderName);

                if (file.Length > 0)
                {
                    var fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
                    var fullPath = Path.Combine(pathToSave, fileName);
                    var dbPath = Path.Combine(folderName, fileName);

                    //Lưu file vật lý
                    using (var stream = new FileStream(fullPath, FileMode.Create))
                    {
                        file.CopyTo(stream);
                    }

                    List<string> lstTextElement = new List<string>();
                    WordDocumentService wordDocumentService = new WordDocumentService(_context);
                    using (WordprocessingDocument doc = WordprocessingDocument.Open(fullPath, true))
                    {
                        lstTextElement = wordDocumentService.FindTextElement(doc);
                    }

                    //Lưu file database
                    var template = new T_CM_TEMPLATE_CONTRACT()
                    {
                        ID = Guid.NewGuid(),
                        FILE_NAME = fileName,
                        FILE_OLD_NAME = fileName,
                        PATH_FILE = $"{baseUrl}Template/{fileName}",
                        FULL_PATH = fullPath,
                        CREATE_DATE = DateTime.Now,
                    };

                    foreach(var item in lstTextElement)
                    {
                        var element = new T_CM_TEMPLATE_TEXT_ELEMENT()
                        {
                            ID = Guid.NewGuid(),
                            TEXT_ELEMENT = item,
                            TEMPLATE_ID = template.ID,
                        };
                        await _context.T_CM_TEMPLATE_TEXT_ELEMENT.AddAsync(element);
                    }

                    await _context.T_CM_TEMPLATE_CONTRACT.AddAsync(template);
                    await _context.SaveChangesAsync();



                    //var pathModify = Path.Combine(pathToSave, Guid.NewGuid() + ".docx");
                    //WordDocumentService wordDocumentService = new WordDocumentService(_context);

                    ////Lấy file template
                    //using (WordprocessingDocument doc = WordprocessingDocument.Open(fullPath, true))
                    //{
                    //    Document document = doc.MainDocumentPart.Document;

                    //    //Copy từ template sang 1 file mới 
                    //    OpenXmlPackage res = doc.SaveAs(pathModify);
                    //    res.Close();
                    //}

                    ////Lấy file cần được edit để replace
                    //using (WordprocessingDocument doc = WordprocessingDocument.Open(pathModify, true))
                    //{
                    //    wordDocumentService.ReplaceStringInWordDocumennt(doc, "[[SO_HD]]", "Số hợp đồng test");
                    //    wordDocumentService.ReplaceStringInWordDocumennt(doc, "[[TEN_KH]]", "Tên khách hàng test");
                    //    wordDocumentService.ReplaceStringInWordDocumennt(doc, "[[DIA_CHI]]", "Địa chỉ test");
                    //    wordDocumentService.ReplaceStringInWordDocumennt(doc, "[[MS_THUE]]", "1212312313");
                    //    wordDocumentService.ReplaceStringInWordDocumennt(doc, "[[SO_DT]]", "0123456789");
                    //    wordDocumentService.ReplaceStringInWordDocumennt(doc, "[[TAI_KHOAN]]", "Tài khoản test");
                    //    wordDocumentService.ReplaceStringInWordDocumennt(doc, "[[DAI_DIEN]]", "Đại diện Công ty test");
                    //    wordDocumentService.ReplaceStringInWordDocumennt(doc, "[[CHUC_VU]]", "Kinh doanh");
                    //}

                    return Ok(new { dbPath });
                }
                else
                {
                    return BadRequest();
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex}");
            }
        }

    }
}
