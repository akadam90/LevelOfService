using LOS.Services.Interface.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace LOS.Models
{
    public class TAAG_Estimate_Form_Model
    {
        public IList<SpendingModel> grossBillings { get; set; }
    }
}