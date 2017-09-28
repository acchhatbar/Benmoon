using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Benmoon.Models;
using System.Data.Entity;
using System.Web.Mvc;
using System.Web;

namespace Benmoon.Controllers
{
    public class LoginAPIController : BaseAPIController
    {
        public HttpResponseMessage Post([FromBody]tblUserMaster value)
        {
            var obj = benmoonDB.tblUserMasters.Where(x => x.LoginName.Equals(value.LoginName) && x.Pwd.Equals(value.Pwd)).FirstOrDefault();
            if (obj != null)
            {
                HttpContext.Current.Session["UserID"] = obj.UserID;
                return ToJson(obj);
            }
            else
            {
                return ErrorJson("Invalid Login");
            }
        }
    }
}
