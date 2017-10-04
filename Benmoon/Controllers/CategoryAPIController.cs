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
    public class CategoryAPIController : BaseAPIController
    {
        public HttpResponseMessage Get()
        {
            var categories = (from cm in benmoonDB.tblCategoryMasters
                         select new
                         {
                             CategoryID = cm.CategoryID,
                             CategoryCode = cm.CategoryCode,
                             CategoryName = cm.CategoryName,
                             CategoryDesc = cm.CategoryDesc,
                             CategoryImage = cm.CategoryImage,
                             DisplayOrder = cm.DisplayOrder,
                             ParentCategoryID = cm.ParentCategoryID,
                             IsActive = cm.IsActive,
                             CommandID = cm.CommandID,
                             CreateBy = cm.CreateBy,
                             CreateDate = cm.CreateDate,
                             CreateIP = cm.CreateIP,
                             UpdateBy = cm.UpdateBy,
                             UpdateDate = cm.UpdateDate,
                             UpdateIP = cm.UpdateIP
                         });
            return ToJson(categories);
        }

        public HttpResponseMessage Post([FromBody]tblCategoryMaster value)
        {
            if (benmoonDB.tblCategoryMasters.Any(x => x.CategoryCode == value.CategoryCode))
                return ErrorJson("Record with same Category Code already Exists");

            int intCategoryID = benmoonDB.tblCategoryMasters.Max(x => x.CategoryID) + 1;
            value.CategoryID = intCategoryID;
            value.CategoryImage = "";
            value.CommandID = 1;
            value.CreateDate = DateTime.Now;
            value.UpdateDate = DateTime.Now;
            value.CreateIP = "";
            value.UpdateIP = "";

            benmoonDB.tblCategoryMasters.Add(value);
            return ToJson(benmoonDB.SaveChanges());
        }

        public HttpResponseMessage Put(int id, [FromBody]tblCategoryMaster value)
        {
            if (benmoonDB.tblCategoryMasters.Any(x => x.CategoryCode == value.CategoryCode && x.CategoryID != value.CategoryID))
                return ErrorJson("Record with same Category Code already Exists");

            benmoonDB.tblCategoryMasters.Attach(value);

            value.CategoryImage = "";
            value.CommandID = 2;
            value.UpdateDate = DateTime.Now;
            value.UpdateIP = "";

            benmoonDB.Entry(value).Property(x => x.ParentCategoryID).IsModified = true;
            benmoonDB.Entry(value).Property(x => x.CategoryCode).IsModified = true;
            benmoonDB.Entry(value).Property(x => x.CategoryName).IsModified = true;
            benmoonDB.Entry(value).Property(x => x.CategoryDesc).IsModified = true;
            benmoonDB.Entry(value).Property(x => x.CategoryImage).IsModified = true;
            benmoonDB.Entry(value).Property(x => x.DisplayOrder).IsModified = true;
            benmoonDB.Entry(value).Property(x => x.IsActive).IsModified = true;
            benmoonDB.Entry(value).Property(x => x.CommandID).IsModified = true;
            benmoonDB.Entry(value).Property(x => x.UpdateDate).IsModified = true;
            benmoonDB.Entry(value).Property(x => x.UpdateIP).IsModified = true;
            return ToJson(benmoonDB.SaveChanges());
        }
        public HttpResponseMessage Delete(int id)
        {
            benmoonDB.tblCategoryMasters.Remove(benmoonDB.tblCategoryMasters.FirstOrDefault(x => x.CategoryID == id));
            return ToJson(benmoonDB.SaveChanges());
        }
    }
}
