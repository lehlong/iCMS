using AutoMapper;
using PROJECT.Core.Models.AD;
using PROJECT.Service.Commons.Mapping;

namespace PROJECT.Service.Dtos.AD
{
    public class T_AD_LANGUAGE_TRANSLATE_Dto :IMapFrom
    {
        public Guid ID { get; set; }
        public string KEY { get; set; }
        public string CONTENT { get; set; }
        public string LANGUAGE { get; set; }
        public void Mapping(Profile profile)
        {
            profile.CreateMap<T_AD_LANGUAGE_TRANSLATE, T_AD_LANGUAGE_TRANSLATE_Dto>().ReverseMap();
        }
    }
}
