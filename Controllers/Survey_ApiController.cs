using LOS.Services.Implementation.Services;
using LOS.Services.Interface;
using LOS.Services.Interface.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Formatting;
using System.Web.Http;

namespace LOS.Controllers
{
    public class Survey_ApiController : BaseApiController
    {
        ISurvey_Service surveyService = new Survey_Service();

        [HttpGet]
        public IList<Survey_Response_Model> getSurveyResponses(int businessId)
        {
            return surveyService.getSurveyResponses(businessId);
        }

        [HttpPost]
        public bool saveSurvey(FormDataCollection formData)
        {
            try
            {
                IEnumerator<KeyValuePair<string, string>> pairs = formData.GetEnumerator();
                Dictionary<int, string> textResponses = new Dictionary<int, string>();
                Dictionary<int, List<int>> optionResponses = new Dictionary<int, List<int>>();

                int businessId = 0;

                while (pairs.MoveNext())
                {
                    KeyValuePair<string, string> pair = pairs.Current;
                    if (pair.Key.IndexOf('-') > -1)  //textbox
                    {
                        if (pair.Value != "")
                        {
                            textResponses.Add(Convert.ToInt32(pair.Key.Split('-')[1]), pair.Value);
                        }
                    }
                    else if (pair.Key.IndexOf('[') > -1)   //checkbox
                    {
                        if (optionResponses.ContainsKey(Convert.ToInt32(pair.Key.Split('.')[1])))
                        {
                            var checkList = optionResponses[Convert.ToInt32(pair.Key.Split('.')[1])];
                            checkList.Add(Convert.ToInt32(pair.Value));
                        }
                        else
                        {
                            optionResponses.Add(Convert.ToInt32(pair.Key.Split('.')[1]), new List<int> { Convert.ToInt32(pair.Value) });

                        }
                    }
                    else if (pair.Key.IndexOf('.') > -1)  //radio
                    {
                        optionResponses.Add(Convert.ToInt32(pair.Key.Split('.')[1]), new List<int> { Convert.ToInt32(pair.Value) });
                    }
                    else if (pair.Key == "SurveyBusinessId")
                    {
                        businessId = Convert.ToInt32(pair.Value);
                    }
                }
                surveyService.saveSurvey(businessId, textResponses, optionResponses);

                return true;
            }
            catch (Exception e)
            {
                return false;
            }

        }
    }
}
