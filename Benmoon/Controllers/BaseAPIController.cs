using System.Net;
using System.Net.Http;
using System.Web.Http;
using Benmoon.Models;
using Newtonsoft.Json;
using System.Text;
using System.Web;
using System.ServiceModel.Channels;

namespace Benmoon.Controllers
{
    public class BaseAPIController : ApiController
    {
        protected readonly BenmoonEntities benmoonDB = new BenmoonEntities();

        

        protected HttpResponseMessage ToJson(dynamic obj)
        {
            var response = Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(JsonConvert.SerializeObject(obj), Encoding.UTF8, "application/json");
            return response;
        }

        protected HttpResponseMessage ErrorJson(dynamic obj)
        {
            var response = Request.CreateResponse(HttpStatusCode.Unauthorized);
            response.Content = new StringContent(JsonConvert.SerializeObject(obj), Encoding.UTF8, "application/json");
            return response;
        }

        protected string GetClientIp(HttpRequestMessage request = null)
        {
            if (request.Properties.ContainsKey("MS_HttpContext"))
            {
                return ((HttpContext)request.Properties["MS_HttpContext"]).Request.UserHostAddress;
            }
            else if (request.Properties.ContainsKey(RemoteEndpointMessageProperty.Name))
            {
                RemoteEndpointMessageProperty prop;
                prop = (RemoteEndpointMessageProperty)this.Request.Properties[RemoteEndpointMessageProperty.Name];
                return prop.Address;
            }
            else
            {
                return null;
            }
        }

    }
}
