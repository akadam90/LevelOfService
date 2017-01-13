using LOS.Services.Interface.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace LOS.Models
{
    public class Bill_Pay_Traffic_Form_Model
    {
        public IList<SpendingModel> Digital_Spendings { get; set; }
        public IList<SpendingModel> National_Spendings { get; set; }
        public IList<SpendingModel> OOH_Spendings { get; set; }
        public IList<SpendingModel> Print_Spendings { get; set; }
        public IList<SpendingModel> Broadcast_Spendings { get; set; }
        public IList<SpendingModel> OOHTraffic_Spendings { get; set; }
    }
}