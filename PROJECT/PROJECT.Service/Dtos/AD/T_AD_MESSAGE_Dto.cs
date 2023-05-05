using AutoMapper;
using PROJECT.Core.Models.AD;
using PROJECT.Service.Commons.Mapping;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PROJECT.Service.Dtos.AD
{
    public class T_AD_MESSAGE_Dto :IMapFrom
    {
        public string PKID { get; set; }
        public string CODE { get; set; }
        public string TYPE { get; set; }
        public string LANGUAGE { get; set; }
        public string MESSAGE { get; set; }
        public string MESSAGE_DETAIL { get; set; }
        public string ACTIVE { get; set; }
        public void Mapping(Profile profile)
        {
            profile.CreateMap<T_AD_MESSAGE, T_AD_MESSAGE_Dto>().ReverseMap();
        }
    }
}
