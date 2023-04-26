using Microsoft.EntityFrameworkCore;
using PROJECT.Core.Models.MD;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PROJECT.Infrastructure
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> contextOptions) : base(contextOptions)
        {

        }

        public DbSet<T_MD_UNIT> T_MD_UNIT { get; set; }
    }
}
