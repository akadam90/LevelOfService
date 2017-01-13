using LOS.Models;
using LOS.Services.Implementation.Services;
using LOS.Services.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace LOS.Controllers
{
    public class BaseController : Controller
    {
        
        public LayoutViewModel layoutViewModel { get; set; }

        IClient_Service clientService = new Client_Service();

        public BaseController()
        {
            layoutViewModel = new LayoutViewModel();

            this.layoutViewModel.Clients = clientService.getClients();

            this.ViewData["MainLayoutViewModel"] = layoutViewModel;
        }
	}
}