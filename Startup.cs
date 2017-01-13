using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(LOS.Startup))]
namespace LOS
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
