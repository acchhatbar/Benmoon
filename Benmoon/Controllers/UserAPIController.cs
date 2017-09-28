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
    public class UserAPIController : BaseAPIController
    {
        public HttpResponseMessage Get()
        {
            return ToJson(benmoonDB.tblUserMasters.AsEnumerable());
        }

        public HttpResponseMessage Post([FromBody]tblUserMaster value)
        {
            benmoonDB.tblUserMasters.Add(value);
            return ToJson(benmoonDB.SaveChanges());
        }

        public HttpResponseMessage Put(int id, [FromBody]tblUserMaster value)
        {
            benmoonDB.Entry(value).State = EntityState.Modified;
            return ToJson(benmoonDB.SaveChanges());
        }
        public HttpResponseMessage Delete(int id)
        {
            benmoonDB.tblUserMasters.Remove(benmoonDB.tblUserMasters.FirstOrDefault(x => x.UserID == id));
            return ToJson(benmoonDB.SaveChanges());
        }

        
    }
}
