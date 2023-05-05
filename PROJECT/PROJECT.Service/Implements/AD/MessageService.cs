using AutoMapper;
using PROJECT.Core.Models.AD;
using PROJECT.Core;
using PROJECT.Service.Commons;
using PROJECT.Service.Dtos.AD;
using PROJECT.Service.Extention;
using PROJECT.Service.Interfaces.AD;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Nodes;
using System.Threading.Tasks;

namespace PROJECT.Service.Implements.AD
{
    public class MessageService : GenericService<T_AD_MESSAGE, T_AD_MESSAGE_Dto>, IMessageService
    {
        private AppDbContext _context;
        public MessageService(AppDbContext context, IMapper mapper) : base(context, mapper)
        {
            _context = context;
        }
        
    }
}
