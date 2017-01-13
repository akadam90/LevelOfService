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
    public class Project_mngmt_ApiController : BaseApiController
    {
        IProject_Mngmt_Service pmService = new Project_Mngmt_Service();

        [HttpGet]
        public FTEModel getFTEAllocations(int skill, int expertise, int duration, int visibility)
        {
            FTEModel fte = pmService.getFTEAllocations(skill,expertise,duration,visibility);
            return fte;
        }
    }
}
