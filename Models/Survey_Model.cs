using LOS.Services.Interface.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace LOS.Models
{
    public class Survey_Model
    {
        public IList<Section_Model> Sections { get; set; }
        
    }
}