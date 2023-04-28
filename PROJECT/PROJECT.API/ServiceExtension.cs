using AutoMapper.Extensions.ExpressionMapping;
using Microsoft.EntityFrameworkCore;
using PROJECT.API.DATA;
using PROJECT.API.Services.Commons.Mapping;
using PROJECT.API.Services.Interfaces.MD;
using System.Reflection;

namespace PROJECT.API
{
    public static class ServiceExtension
    {
        public static IServiceCollection AddDIServices(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddAutoMapper(cfg => { cfg.AddExpressionMapping(); }, typeof(MappingProfile).Assembly);
            // Add Entity Framework
            services.AddDbContext<AppDbContext>(options => options.UseSqlServer(configuration.GetConnectionString("Connection")));
            services.AddScoped<DATA.Common.IUnitOfWork, DATA.Common.UnitOfWork>();

            //Add all service
            var allProviderTypes = Assembly.GetAssembly(typeof(IUnitService))
             .GetTypes().Where(t => t.Namespace != null).ToList();
            foreach (var intfc in allProviderTypes.Where(t => t.IsInterface))
            {
                var impl = allProviderTypes.FirstOrDefault(c => c.IsClass && !c.IsAbstract && intfc.Name.Substring(1) == c.Name);
                if (impl != null) services.AddScoped(intfc, impl);
            }

            return services;
        }
    }
}
