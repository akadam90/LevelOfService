using LOS.Services.Interface.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace LOS.Models
{
    public class LayoutViewModel
    {
        public IList<Client_Model> Clients { get; set; }
        public UserModel User { get; set; }
    }
}