using LOS.Services.Implementation.Models;
using LOS.Services.Implementation.Services;
using LOS.Services.Interface;
using LOS.Services.Interface.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace LOS.Controllers
{
    public class Client_Operations_ApiController : BaseApiController
    {
        IClientOpsService clientService = new ClientOpsService();

        [HttpGet]
        public Client_Operations_Model getFTEAllocations(int id)
        {
            Client_Operations_Model fteAllocations = clientService.getFTEAllocations(id);
            return fteAllocations;
        }
        
        [HttpGet]
        public bool saveClientScenario(int scenarioId, int businessId, int clientOpsId)
        {
            try
            {
                clientService.saveClientScenario(scenarioId, businessId, clientOpsId);
                return true;
            }
            catch (Exception ex)
            {
                return false;
            }

        }

        [HttpGet]
        public IList<Scenario_Model> getAllScenarios(int businessId)
        {
            return clientService.getAllScenarios(businessId);
        }

        [HttpGet]
        public Client_Operations_Model getScenario(int scenarioId)
        {
            return clientService.getScenario(scenarioId);
        }
        [HttpGet]
        public bool deleteScenario(int scenarioId)
        {
            try
            {
                clientService.deleteScenario(scenarioId);
                return true;
            }
            catch (Exception ex)
            {
                return false;
            }

        }

        [HttpGet]
        public bool markFinal(int scenarioId, int businessId)
        {
            try
            {
                clientService.markFinal(scenarioId, businessId);
                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }

    }
}
