using Fnx_Git_Api.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Fnx_Git_Api.Controllers
{
    [Route("api/auth")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        public string adminUsername;
        public string adminPassword;

        public AuthController( IConfiguration configuration)
        {
            _configuration = configuration;
            adminUsername = _configuration.GetValue<string>("Authorization:username");
            adminPassword = _configuration.GetValue<string>("Authorization:password");
        }

        [HttpPost,Route("login")]
        public IActionResult Login ([FromBody] LoginModel user)
        {
            if (user == null)
                return BadRequest("Invalid Client Request");

            if (user.UserName == "johndoe" && user.Password == "def@123")
            {
                var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("superSecretKey@345"));
                var signinCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);
                var tokeOptions = new JwtSecurityToken(
                    issuer: "https://localhost:5001",
                    audience: "https://localhost:5001",
                    claims: new List<Claim>(),
                    expires: DateTime.Now.AddMinutes(5),
                    signingCredentials: signinCredentials
                );
                var tokenString = new JwtSecurityTokenHandler().WriteToken(tokeOptions);
                return Ok(new AuthenticatedResponse { Token = tokenString });
            }

            return Unauthorized();
        }

    }
}
