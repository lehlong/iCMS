using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Concurrent;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Threading.Tasks;

namespace PROJECT.API.Hubs
{
    [EnableCors]
    [AllowAnonymous]
    public class OnlineCountHub : Hub
    {
        public static List<string> _lstConnectionUser = new List<string>();
        public override Task OnConnectedAsync()
        {
            var context = Context.GetHttpContext();
            var username = context.Request.Query["username"].ToString();
            _lstConnectionUser.Add(username);

            base.OnConnectedAsync();
            return Task.CompletedTask;
        }
        public override Task OnDisconnectedAsync(Exception exception)
        {
            var context = Context.GetHttpContext();
            var username = context.Request.Query["username"].ToString();
            _lstConnectionUser.Remove(username);

            base.OnDisconnectedAsync(exception);
            return Task.CompletedTask;
        }
    }
}
