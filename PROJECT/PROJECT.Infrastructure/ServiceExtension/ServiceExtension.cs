using Microsoft.Extensions.DependencyInjection;
using PROJECT.Infrastructure.Common;
using PROJECT.Infrastructure.Repositories.MD;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using PROJECT.Infrastructure.Interfaces.MD;

namespace PROJECT.Infrastructure.ServiceExtension
{
    public static class ServiceExtension
    {
        public static IServiceCollection AddDIServices(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddDbContext<ApplicationDbContext>(options =>
            {
                options.UseSqlServer(configuration.GetConnectionString("Connection"));
            });

            services.AddScoped<IUnitOfWork, UnitOfWork>();
            services.AddScoped<IUnitRepo, UnitRepo>();

            return services;
        }
    }
}
