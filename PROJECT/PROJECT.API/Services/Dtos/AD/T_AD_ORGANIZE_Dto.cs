using AutoMapper;
using PROJECT.API.DOMAIN.Models.AD;
using PROJECT.API.Services.Commons.Mapping;
using PROJECT.API.Services.Dtos.MD;

namespace PROJECT.API.Services.Dtos.AD
{
    public class T_AD_ORGANIZE_Dto : IMapFrom
    {
        public string PKID { get; set; }
        public string COMPANY_CODE { get; set; }
        public string PARENT { get; set; }
        public string NAME { get; set; }
        public string TYPE { get; set; }
        public int C_ORDER { get; set; }
        public string COST_CENTER_CODE { get; set; }
        public void Mapping(Profile profile)
        {
            profile.CreateMap<T_AD_ORGANIZE, T_AD_ORGANIZE_Dto>().ReverseMap();
        }
    }
}
