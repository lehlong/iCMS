using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using PROJECT.API.DOMAIN.Common;
using PROJECT.API.DOMAIN.Models.AD;
using PROJECT.API.DOMAIN.Models.MD;
using System.IdentityModel.Tokens.Jwt;

namespace PROJECT.API.DATA
{
    public class AppDbContext : DbContext
    {
        protected IHttpContextAccessor HttpContextAccessor { get; }
        public AppDbContext(DbContextOptions<AppDbContext> options, IHttpContextAccessor httpContextAccessor) : base(options)
        {
            this.HttpContextAccessor = httpContextAccessor;
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyAllConfigurations();
            base.OnModelCreating(modelBuilder);
        }

        public string UserProvider
        {
            get
            {
                //TODO
                return "";
            }
        }

        public Func<DateTime> TimestampProvider { get; set; } = ()
            => DateTime.UtcNow;

        public override int SaveChanges()
        {
            TrackChanges();
            return base.SaveChanges();
        }

        public override async Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
        {
            TrackChanges();
            return await base.SaveChangesAsync(cancellationToken);
        }

        private void TrackChanges()
        {
            var token = HttpContextAccessor.HttpContext.Request.Headers["Authorization"].ToString().Split(" ")[1];
            JwtSecurityTokenHandler tokenHandler = new JwtSecurityTokenHandler();
            JwtSecurityToken securityToken = (JwtSecurityToken)tokenHandler.ReadToken(token);
            var claim = securityToken.Claims;
            var user = claim.FirstOrDefault(x => x.Type == "username");

            foreach (var entry in this.ChangeTracker.Entries().Where(e => e.State == EntityState.Added || e.State == EntityState.Modified))
            {
                if (entry.Entity is IBaseEntity)
                {
                    var auditable = entry.Entity as IBaseEntity;
                    if (entry.State == EntityState.Added)
                    {
                        auditable.CREATE_BY = user?.Value;  
                        auditable.CREATE_DATE = TimestampProvider();
                    }
                    else
                    {
                        auditable.UPDATE_BY = user?.Value;
                        auditable.UPDATE_DATE = TimestampProvider();
                    }
                }
            }
        }

        #region System Manage
        public DbSet<T_AD_USER> T_AD_USER { get; set; }
        public DbSet<T_AD_LANGUAGE_TRANSLATE> T_AD_LANGUAGE_TRANSLATE { get; set; }
        public DbSet<T_AD_RIGHT> T_AD_RIGHT{ get; set; }
        public DbSet<T_AD_ROLE> T_AD_ROLE { get; set; }
        public DbSet<T_AD_ROLE_DETAIL> T_AD_ROLE_DETAIL { get; set; }
        public DbSet<T_AD_USER_GROUP> T_AD_USER_GROUP { get; set; }
        public DbSet<T_AD_USER_GROUP_ROLE> T_AD_USER_GROUP_ROLE { get; set; }
        public DbSet<T_AD_USER_RIGHT> T_AD_USER_RIGHT { get; set; }
        public DbSet<T_AD_USER_USER_GROUP> T_AD_USER_USER_GROUP { get; set; }
        public DbSet<T_AD_ORGANIZE> T_AD_ORGANIZE { get; set; }


        #endregion

        #region Master Data
        public DbSet<T_MD_UNIT> T_MD_UNIT { get; set; }
        #endregion
        
    }
}
