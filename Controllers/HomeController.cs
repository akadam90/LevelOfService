using LOS.Models;
using LOS.Services.Implementation.Services;
using LOS.Services.Interface;
using LOS.Services.Interface.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace LOS.Controllers
{
    public class HomeController : BaseController
    {
        IBill_Pay_Traffic_Service billPayService = new Bill_Pay_Traffic_Service();
        IDigital_Service digitalService = new Digital_Service();
        ILocalService localService = new Local_Service();
        IOOH_Service oohService = new OOH_Service();
        IPublishing_Service publishingService = new Publishing_Service();
        IVideo_Service videoService = new Video_Service();
        ITAAG_Estimate_Service taagService = new TAAG_Estimate_Service();
        IClientOpsService clientOpsService = new ClientOpsService();
        IProject_Mngmt_Service pmService = new Project_Mngmt_Service();
        IBusiness_Service busService = new Business_Service();
        IClient_Service clientService = new Client_Service();
        ISurvey_Service surveyService = new Survey_Service();

       public HomeController() : base()
       {
    
       }

        public ActionResult Index(UserModel user)
        {
            ViewBag.Message = "Your application description page.";
            //this.layoutViewModel.User = user;
            //get User Logged in
            //UserModel user = new UserModel();
            //user.Role = "Department_Lead";
            //user.Role = "Business_Lead";
            //user.DepartmentName = "Project Management";
            //user.DepartmentName = "Preliminary TAAG Estimate & CPM";
            //user.DepartmentName = "Client Operations";
            //user.DepartmentName = "Platform Operations-Digital";
            //user.DepartmentName = "Platform Operations-Local";
            //user.DepartmentName = "Platform Operations-OOH";
            //user.DepartmentName = "Platform Operations-Publishing";
            //user.DepartmentName = "Platform Operations-Video";
            //user.DepartmentName = "Bill Pay/Traffic";
            return View(user);
        }

        public ActionResult _BusinessModal()
        {
            Survey_Model surveyModel = new Survey_Model();
            surveyModel.Sections = surveyService.getAllQuestions();

            return PartialView(surveyModel);
        }

        public ActionResult _New_Business_Modal()
        {
            Business_Form_Model formData = new Business_Form_Model();
            formData.BusinessTypes = busService.getBusinessTypes();
            formData.Clients = clientService.getClients();

            return PartialView(formData);
        }

        public ActionResult _Bill_Pay_Traffic_Modal()
        {            
            var digital_Spendings = billPayService.getDigitalSpendings();
            var national_Spendings = billPayService.getNationalSpendings();
            var ooh_Spendings = billPayService.getOOHSpendings();
            var print_Spendings = billPayService.getPrintSpendings();
            var broadcast_Spendings = billPayService.getBroadcastSpendings();
            var oohTraffic_Spendings = billPayService.getOOHTrafficSpendings();

            Bill_Pay_Traffic_Form_Model formData = new Bill_Pay_Traffic_Form_Model() { 
            Digital_Spendings = digital_Spendings,
            National_Spendings = national_Spendings,
            OOH_Spendings = ooh_Spendings,
            Print_Spendings = print_Spendings,
            Broadcast_Spendings =broadcast_Spendings,
            OOHTraffic_Spendings = oohTraffic_Spendings
            };

            return PartialView(formData);
        }

        public ActionResult _Platform_Operations_Digital_Modal()
        {
            Digital_Form_Modal formData = new Digital_Form_Modal();
            formData.netBillings = digitalService.getNETBillings();

            return PartialView(formData);
        }

        public ActionResult _Platform_Operations_Local_Modal()
        {
            Local_Form_Modal formData = new Local_Form_Modal();
            formData.local_mulipliers = localService.getLocalMulitipliers();

            return PartialView(formData);
        }

        public ActionResult _Platform_Operations_OOH_Modal()
        {
            OOH_Form_Modal formData = new OOH_Form_Modal();
            formData.ooh_mulipliers = oohService.getFTEMultipliers();

            return PartialView(formData);
        }

        public ActionResult _Platform_Operations_Publishing_Modal()
        {
            Publishing_Form_Modal formData = new Publishing_Form_Modal();
            formData.publishing_mulipliers = publishingService.getFTEMultipliers();
            return PartialView(formData);
        }

        public ActionResult _Platform_Operations_Video_Modal()
        {
            Video_Form_Modal formData = new Video_Form_Modal();
            formData.netBillings = videoService.getNETBillings();

            return PartialView(formData);
        }

        public ActionResult _TAAG_Estimate_Modal()
        {
            TAAG_Estimate_Form_Model formData = new TAAG_Estimate_Form_Model();
            formData.grossBillings = taagService.getGrossBillings();

            return PartialView(formData);
        }

        public ActionResult _Client_Operations_Modal()
        {
            Client_Operations_Form_Model formData = new Client_Operations_Form_Model();
            formData.ServiceLevels = clientOpsService.getServiceLevels();

            return PartialView(formData);
        }

        public ActionResult _Project_Management_Modal()
        {
            Project_Mngmnt_Form_Model formData = new Project_Mngmnt_Form_Model();
            formData.durations = pmService.getDurations();
            formData.skills = pmService.getSkills();
            formData.expertise = pmService.getExpertise();
            formData.visibilities = pmService.getVisibilities();
            
            return PartialView(formData);        
        }
                
    }
}