using LOS.Models;
using LOS.Services.Implementation.Services;
using LOS.Services.Interface;
using LOS.Services.Interface.Models;
using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Formatting;
using System.Web.Http;

namespace LOS.Controllers
{
    public class Client_ApiController : BaseApiController
    {
        IClient_Service clientService = new Client_Service();        

        [HttpPost]
        public bool addClient([FromBody]Client_Model clientName)
        {
            try
            {
                clientService.addClient(clientName);
                return true;
            }
            catch (Exception ex)
            {
                return false;
            }                               
        }

        [HttpGet]
        public IList<Client_Model> getClients()
        {
            var clients = clientService.getClients();
            return clients;
        }

        [HttpGet]
        public IList<Business_Model> getBusinesses(int clientId)
        {
            return clientService.getBusinesses(clientId);
        }

    }
}
