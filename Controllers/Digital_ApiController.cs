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
    public class Digital_ApiController : BaseApiController
    {
        IDigital_Service digitalService = new Digital_Service();

        [HttpGet]
        public FTEModel getFTEAllocations(int id)
        {
            FTEModel fteAllocations = digitalService.getFTEAllocations(id);
            return fteAllocations;
        }

        [HttpGet]
        public bool saveDigitalScenario(int scenarioId, int businessId, int digitalId)
        {
            try {
                digitalService.saveDigitalScenario(scenarioId,businessId,digitalId);
                return true;
            }
            catch(Exception ex)
            {
                return false;
            }
            
        }

        [HttpGet]
        public IList<Scenario_Model> getAllScenarios(int businessId)
        {
            return digitalService.getAllScenarios(businessId);
        }

        [HttpGet]
        public SpendingModel getScenario(int scenarioId)
        {
            return digitalService.getScenario(scenarioId);
        }
       
        [HttpGet]
        public bool deleteScenario(int scenarioId)
        {
            try
            {
                digitalService.deleteScenario(scenarioId);
                return true;
            }
            catch (Exception ex)
            {
                return false;
            }

        }
        
        [HttpPost]
        public void xyz(HttpWebRequest req)
        { 
         
        }


        [HttpGet]
        public bool markFinal(int scenarioId, int businessId)
        {
            try
            {
                digitalService.markFinal(scenarioId, businessId);
                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }
    }
}
