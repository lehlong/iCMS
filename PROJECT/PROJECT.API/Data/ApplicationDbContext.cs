using Microsoft.EntityFrameworkCore;
using PROJECT.API.Models;
using PROJECT.API.Models.AD;
using PROJECT.API.Models.CM;
using PROJECT.API.Models.MD;

namespace PROJECT.API.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions options) : base(options) { 

        }
        public DbSet<T_MD_PROJECT_PROFILE> T_MD_PROJECT_PROFILE { get; set; }
        public DbSet<T_MD_NUMBER_RANGE> T_MD_NUMBER_RANGE { get; set; }
        public DbSet<T_MD_PROJECT_USER_TYPE> T_MD_PROJECT_USER_TYPE { get; set; }
        public DbSet<T_MD_PROJECT_TYPE> T_MD_PROJECT_TYPE { get; set; }
        public DbSet<T_MD_PROJECT_LEVEL> T_MD_PROJECT_LEVEL { get; set; }
        public DbSet<T_MD_VENDOR> T_MD_VENDOR { get; set; }
        public DbSet<T_MD_CUSTOMER> T_MD_CUSTOMER { get; set; }
        public DbSet<T_MD_TITLE> T_MD_TITLE { get; set; }
        public DbSet<T_MD_UNIT> T_MD_UNIT { get; set; }
        public DbSet<T_MD_AREA> T_MD_AREA { get; set; }
       
        
        public DbSet<T_AD_ORGANIZE> T_AD_ORGANIZE { get; set; }
        public DbSet<T_AD_RIGHT> T_AD_RIGHT { get; set; }
        public DbSet<T_AD_ROLE> T_AD_ROLE { get; set; }
        public DbSet<T_AD_HISTORY> T_AD_HISTORY { get; set; }
        public DbSet<T_AD_ROLE_DETAIL> T_AD_ROLE_DETAIL { get; set; }
        public DbSet<T_AD_LANGUAGE_TRANSLATE> T_AD_LANGUAGE_TRANSLATE { get; set; }
        public DbSet<T_AD_USER> T_AD_USER { get; set; }
        public DbSet<T_AD_MESSAGE> T_AD_MESSAGE { get; set; }
        public DbSet<T_AD_USER_GROUP> T_AD_USER_GROUP { get; set; }
        public DbSet<T_AD_USER_RIGHT> T_AD_USER_RIGHT { get; set; }
        public DbSet<T_AD_USER_USER_GROUP> T_AD_USER_USER_GROUP { get; set; }
        public DbSet<T_AD_USER_GROUP_ROLE> T_AD_USER_GROUP_ROLE { get; set; }
        public DbSet<T_AD_HISTORY_LOGIN> T_AD_HISTORY_LOGIN { get; set; }
        public DbSet<T_AD_CONFIG_TEXT_ELEMENT> T_AD_CONFIG_TEXT_ELEMENT { get; set; }


        //Contract Manager
        public DbSet<T_CM_CONTRACT_TYPE> T_CM_CONTRACT_TYPE { get; set; }
        public DbSet<T_CM_TEMPLATE_CONTRACT> T_CM_TEMPLATE_CONTRACT { get; set; }
        public DbSet<T_CM_TEMPLATE_TEXT_ELEMENT> T_CM_TEMPLATE_TEXT_ELEMENT { get; set; }
    }
}
