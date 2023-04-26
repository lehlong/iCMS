using PROJECT.API.Models.AD;

namespace PROJECT.API.Models.Authentication
{
    public class JWTTokenResponse
    {
        public string? Token { get; set; }
        public T_AD_USER? User { get;set; }

        public List<string> ListRight { get; set; }

    }
}
