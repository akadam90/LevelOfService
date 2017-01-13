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
    public class Video_ApiController : BaseApiController
    {
        IVideo_Service videoService = new Video_Service();

        [HttpGet]
        public FTEModel getFTEAllocations(int id)
        {
            FTEModel fteAllocations = videoService.getFTEAllocations(id);
            return fteAllocations;
        }
    }
}
