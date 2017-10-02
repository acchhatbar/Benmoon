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
            int intUserID = benmoonDB.tblUserMasters.Max(x => x.UserID) + 1;
            value.UserID = intUserID;
            value.CommandID = 1;
            value.CreateDate = DateTime.Now;
            value.UpdateDate = DateTime.Now;
            value.CreateIP = "";
            value.UpdateIP = "";

            benmoonDB.tblUserMasters.Add(value);
            return ToJson(benmoonDB.SaveChanges());
        }

        public HttpResponseMessage Put(int id, [FromBody]tblUserMaster value)
        {
            benmoonDB.tblUserMasters.Attach(value);
            value.CommandID = 2;
            value.UpdateDate = DateTime.Now;
            value.UpdateIP = "";

            benmoonDB.Entry(value).Property(x => x.LoginName).IsModified = true;
            benmoonDB.Entry(value).Property(x => x.UserName).IsModified = true;
            benmoonDB.Entry(value).Property(x => x.Pwd).IsModified = true;
            benmoonDB.Entry(value).Property(x => x.Email).IsModified = true;
            benmoonDB.Entry(value).Property(x => x.Mobile).IsModified = true;
            benmoonDB.Entry(value).Property(x => x.IsActive).IsModified = true;
            benmoonDB.Entry(value).Property(x => x.CommandID).IsModified = true;
            benmoonDB.Entry(value).Property(x => x.UpdateDate).IsModified = true;
            benmoonDB.Entry(value).Property(x => x.UpdateIP).IsModified = true;
            return ToJson(benmoonDB.SaveChanges());
        }
        public HttpResponseMessage Delete(int id)
        {
            benmoonDB.tblUserMasters.Remove(benmoonDB.tblUserMasters.FirstOrDefault(x => x.UserID == id));
            return ToJson(benmoonDB.SaveChanges());
        }

        
    }
}
