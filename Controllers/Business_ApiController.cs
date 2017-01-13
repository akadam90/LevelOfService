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
    public class Business_ApiController : BaseApiController
    {
        IBusiness_Service busService = new Business_Service();

        [HttpPost]         
        public ActionResponseModel saveBusiness([FromBody] Business_Model business)
        {            
            try
            { 
                busService.saveBusiness(business);
                return new ActionResponseModel(){
                Success = true,
                Message = "Business Added Successfully"
                
                };

            }
            catch(Exception ex)
            {
                return new ActionResponseModel()
                {
                    Success = false,
                    Message = ex.Message

                };
            }
        }
        
        [HttpGet]
        public IList<Business_Model> getAllBusinesses(int clientId)
        {
            return busService.getAllBusinesses(clientId);
        }
    }
}
