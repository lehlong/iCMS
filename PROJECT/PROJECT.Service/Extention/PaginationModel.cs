using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PROJECT.Service.Extention
{
    public class PaginationModel
    {
        public int CurrentPage { get; set; }
        public int TotalPage { get; set; }
        public int ItemCount { get; set; }
        public int PageSize { get; set; }
        public string KeySearch { get; set; }   
        public object Data { get; set; }
        
    }
}
