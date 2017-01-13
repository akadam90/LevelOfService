using LOS.Services.Interface.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace LOS.Models
{
    public class Project_Mngmnt_Form_Model
    {
        public IList<PM_Duration_Model> durations { get; set; }
        public IList<PM_Skill_Model> skills { get; set; }
        public IList<PM_Visibility_Model> visibilities { get; set; }
        public IList<PM_Expertise_Model> expertise { get; set; }
    }
}