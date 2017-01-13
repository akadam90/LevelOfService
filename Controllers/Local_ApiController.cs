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
    public class Local_ApiController : ApiController
    {
        ILocalService localService = new Local_Service();

        [HttpGet]
        public FTEModel getFTEMultipliers()
        {
            FTEModel fteAllocations = localService.getFTEMultipliers();
            return fteAllocations;
        }
    }
}
