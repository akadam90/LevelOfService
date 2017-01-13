using LOS.Services.Interface.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace LOS.Models
{
    public class Business_Form_Model
    {
        public IList<Client_Model> Clients { get; set; }
        public IList<BusinessType_Model> BusinessTypes { get; set; }
    }
}