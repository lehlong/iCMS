using PROJECT.Core.Models.AD;

namespace PROJECT.Service.Commons.Authentication
{
    public class JWTTokenResponse
    {
        public string? Token { get; set; }
        public T_AD_USER? User { get;set; }

        public List<string> ListRight { get; set; }

    }
}
