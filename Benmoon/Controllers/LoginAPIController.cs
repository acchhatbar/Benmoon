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
        public HttpResponseMessage Login(string loginID, string pwd)
        {
            var obj = benmoonDB.tblUserMasters.Where(x => x.LoginName.Equals(loginID) && x.Pwd.Equals(pwd)).FirstOrDefault();
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
