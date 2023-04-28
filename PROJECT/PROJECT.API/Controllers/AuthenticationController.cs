using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using PROJECT.API.Models.Authentication;
using UAParser;
using PROJECT.API.Services.Implements.AD;

namespace PROJECT.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthenticationController : ControllerBase
    {
        public readonly UserService _service;
        public AuthenticationController(UserService service)
        {
            _service = service;
        }

        [HttpPost("Login")]
        public async Task<IActionResult> Login([FromBody] Login user)
        {
            var userAgent = HttpContext.Request.Headers["User-Agent"];
            var uaParser = Parser.GetDefault();
            ClientInfo clientInfo = uaParser.Parse(userAgent);

            if (user is null)
            {
                return BadRequest("Invalid user request!!!");
            }

            var result = _service.CheckUserAuthentication(user);
            
            if (result != null)
            {
                //Lấy các role quyền
                var lstRole = _service.GetRightUserAuthentication(user);
                
                var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(ConfigurationManager.AppSetting["JWT:Secret"]));
                var signinCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);

                var claims = new[] {
                new Claim("username", user.UserName.ToString()),
                    new Claim(JwtRegisteredClaimNames.Name, user.UserName),
                    new Claim(JwtRegisteredClaimNames.Email, ""),
                    new Claim("Role", string.Join("", lstRole)),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
                };

                var tokeOptions = new JwtSecurityToken(issuer: ConfigurationManager.AppSetting["JWT:ValidIssuer"], audience: ConfigurationManager.AppSetting["JWT:ValidAudience"], claims, expires: DateTime.Now.AddHours(2), signingCredentials: signinCredentials);
                var tokenString = new JwtSecurityTokenHandler().WriteToken(tokeOptions);

                ////Lưu lịch sử đăng nhập
                //var info = new T_AD_HISTORY_LOGIN()
                //{
                //    ID = Guid.NewGuid(),
                //    USER_NAME = result.USER_NAME,
                //    FULL_NAME = result.FULL_NAME,
                //    LOGIN_TIME = DateTime.Now,
                //    OS = clientInfo.OS.Family + " " + clientInfo.OS.Major,
                //    BROWSER = clientInfo.UA.Family + " " + clientInfo.UA.Major + "." + clientInfo.UA.Minor,
                //    IP_ADDRESS = Request.HttpContext.Connection.RemoteIpAddress?.ToString(),
                //    CONNECTION_ID = Request.HttpContext.Connection.Id.ToString()
                //};
                //await _context.T_AD_HISTORY_LOGIN.AddAsync(info);
                //await _context.SaveChangesAsync();

                result.Result.PASSWORD = "";
                return Ok(new JWTTokenResponse
                {
                    Token = tokenString,
                    User = result.Result,
                    ListRight = lstRole.Distinct().ToList(),
                });
            }
            return Unauthorized();
        }
    }
}
