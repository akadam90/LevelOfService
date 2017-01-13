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
    public class TAAG_ApiController : ApiController
    {
        ITAAG_Estimate_Service taagService = new TAAG_Estimate_Service();

        [HttpGet]
        public FTEModel getFTEAllocations(int id)
        {
            FTEModel fteAllocations = taagService.getFTEAllocations(id);
            return fteAllocations;
        }

        [HttpGet]
        public bool saveTAAGScenario(int scenarioId, int businessId, int digitalId)
        {
            try
            {
                taagService.saveTAAGScenario(scenarioId, businessId, digitalId);
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
            return taagService.getAllScenarios(businessId);
        }

        [HttpGet]
        public FTEModel getScenario(int scenarioId)
        {
            return taagService.getScenario(scenarioId);
        }
       

        [HttpGet]
        public bool deleteScenario(int scenarioId)
        {
            try
            {
                taagService.deleteScenario(scenarioId);
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
                taagService.markFinal(scenarioId, businessId);
                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }
    }
}
