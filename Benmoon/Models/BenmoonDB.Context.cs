﻿//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace Benmoon.Models
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Infrastructure;
    
    public partial class BenmoonEntities : DbContext
    {
        public BenmoonEntities()
            : base("name=BenmoonEntities")
        {
        }
    
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            throw new UnintentionalCodeFirstException();
        }
    
        public virtual DbSet<tblRoleMaster> tblRoleMasters { get; set; }
        public virtual DbSet<tblUnitMaster> tblUnitMasters { get; set; }
        public virtual DbSet<tblUserMaster> tblUserMasters { get; set; }
    }
}