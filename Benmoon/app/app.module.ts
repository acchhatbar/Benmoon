import { NgModule, ErrorHandler } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule, MdNativeDateModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HttpModule } from '@angular/http';
import { routing } from './app.routing';
import { BaseService } from './Service/base.service';
import { RoleFilterPipe } from './admin/filter/role.pipe';
import { UserFilterPipe } from './admin/filter/user.pipe';
import { SearchComponent } from './Shared/search.component';
import AppErrorHandler from './Shared/errorhandler';
import { LoginComponent } from './admin/user/login.component';
import { LogoutComponent } from './admin/user/logout.component';
import { RoleComponent } from './admin/user/role.component';
import { ManageRoleComponent } from './admin/user/managerole.component';
import { UserComponent } from './admin/user/user.component';
import { ManageUserComponent } from './admin/user/manageuser.component';
import { HomeComponent } from './admin/home/home.component';
import { DataGrid } from './Shared/datagrid/datagrid.component';
import { DataGridUtil } from './Shared/datagrid/datagrid.util';
import { Format } from './Shared/datagrid/format';
import { OrderBy } from './Shared/datagrid/orderby';
import { AdminHeaderComponent } from './admin/adminheader.component';

import { CategoryComponent } from './admin/catalog/category.component';
import { ManageCategoryComponent } from './admin/catalog/managecategory.component';
import { CategoryFilterPipe } from './admin/filter/category.pipe';

@NgModule({
    imports: [BrowserModule, ReactiveFormsModule, HttpModule, routing, FormsModule,
        BrowserAnimationsModule,
        MaterialModule,
        MdNativeDateModule],
    declarations: [AppComponent, LoginComponent, LogoutComponent, HomeComponent, SearchComponent,
        DataGrid, Format, OrderBy, AdminHeaderComponent, RoleComponent, ManageRoleComponent, UserComponent, ManageUserComponent
        , CategoryComponent, ManageCategoryComponent
                  ],
    providers: [{ provide: ErrorHandler, useClass: AppErrorHandler }, { provide: APP_BASE_HREF, useValue: '/' }, BaseService, RoleFilterPipe, UserFilterPipe, CategoryFilterPipe],
    entryComponents: [ ManageRoleComponent, ManageUserComponent, ManageCategoryComponent ],
    bootstrap: [AppComponent]

})
export class AppModule { }
