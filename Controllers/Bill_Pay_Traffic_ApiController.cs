using LOS.Models;
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
    public class Bill_Pay_Traffic_ApiController : BaseApiController
    {
        IBill_Pay_Traffic_Service billPayService = new Bill_Pay_Traffic_Service();       
        
        [HttpGet]
        public FTEModel getFTEAllocations(int id)
        {            
            FTEModel fteAllocations = billPayService.getFTEAllocations(id);
            return fteAllocations;                                        
        }        

        [HttpPost]
        public bool saveBillPayScenario([FromBody] Bill_Pay_Form_Model scenarioInputs)
        {            
            try
            {
                billPayService.saveBillPayScenario(scenarioInputs);
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
            return billPayService.getAllScenarios(businessId);
        }

        //[HttpGet]
        //public IList<Business_Model> getBusinesses(int clientId)
        //{
        //    return billPayService.getBusinesses(clientId);
        //}

        [HttpGet]
        public IList<SpendingModel> getScenario(int scenarioId)
        {
            return billPayService.getScenario(scenarioId);
        }

        [HttpGet]
        public bool deleteScenario(int scenarioId)
        {
            try {
                billPayService.deleteScenario(scenarioId);
                return true;
            }
            catch(Exception ex){
                return false;
            }               

        }

        [HttpGet]
        public bool markFinal(int scenarioId, int businessId)
        {
            try {
                billPayService.markFinal(scenarioId,businessId);
                return true;
            }
            catch(Exception ex)
            {
                return false;
            }
        }
    }
}
