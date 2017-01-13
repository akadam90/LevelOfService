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
    public class OOH_ApiController : ApiController
    {
        IOOH_Service oohService = new OOH_Service();

        [HttpGet]
        public FTEModel getFTEMultipliers()
        {
            FTEModel fteAllocations = oohService.getFTEMultipliers();
            return fteAllocations;
        }
    }
}
