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
    public class RoleAPIController : BaseAPIController
    {
        public HttpResponseMessage Get()
        {
            return ToJson(benmoonDB.tblRoleMasters.AsEnumerable());
        }

        public HttpResponseMessage Post([FromBody]tblRoleMaster value)
        {
            int intRoleID = benmoonDB.tblRoleMasters.Max(x => x.RoleID) + 1;
            value.RoleID = intRoleID;
            value.CommandID = 1;
            value.CreateDate = DateTime.Now;
            value.UpdateDate = DateTime.Now;
            value.CreateIP = "";
            value.UpdateIP = "";

            benmoonDB.tblRoleMasters.Add(value);
            return ToJson(benmoonDB.SaveChanges());
        }

        public HttpResponseMessage Put(int id, [FromBody]tblRoleMaster value)
        {
            benmoonDB.tblRoleMasters.Attach(value);
            value.CommandID = 2;
            value.UpdateDate = DateTime.Now;
            value.UpdateIP = "";

            benmoonDB.Entry(value).Property(x => x.RoleName).IsModified = true;
            benmoonDB.Entry(value).Property(x => x.RoleDesc).IsModified = true;
            benmoonDB.Entry(value).Property(x => x.IsActive).IsModified = true;
            benmoonDB.Entry(value).Property(x => x.CommandID).IsModified = true;
            benmoonDB.Entry(value).Property(x => x.UpdateDate).IsModified = true;
            benmoonDB.Entry(value).Property(x => x.UpdateIP).IsModified = true;
            return ToJson(benmoonDB.SaveChanges());
        }
        public HttpResponseMessage Delete(int id)
        {
            benmoonDB.tblRoleMasters.Remove(benmoonDB.tblRoleMasters.FirstOrDefault(x => x.RoleID == id));
            return ToJson(benmoonDB.SaveChanges());
        }
    }
}
