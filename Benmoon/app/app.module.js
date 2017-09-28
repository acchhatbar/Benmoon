"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var platform_browser_1 = require("@angular/platform-browser");
var animations_1 = require("@angular/platform-browser/animations");
var material_1 = require("@angular/material");
var forms_1 = require("@angular/forms");
var app_component_1 = require("./app.component");
var http_1 = require("@angular/http");
var app_routing_1 = require("./app.routing");
var base_service_1 = require("./Service/base.service");
//import { UserFilterPipe } from './filter/user.pipe'
var search_component_1 = require("./Shared/search.component");
var errorhandler_1 = require("./Shared/errorhandler");
var login_component_1 = require("./admin/user/login.component");
var datagrid_component_1 = require("./Shared/datagrid/datagrid.component");
var format_1 = require("./Shared/datagrid/format");
var orderby_1 = require("./Shared/datagrid/orderby");
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [platform_browser_1.BrowserModule, forms_1.ReactiveFormsModule, http_1.HttpModule, app_routing_1.routing, forms_1.FormsModule,
            animations_1.BrowserAnimationsModule,
            material_1.MaterialModule,
            material_1.MdNativeDateModule],
        declarations: [app_component_1.AppComponent, login_component_1.LoginComponent, search_component_1.SearchComponent,
            datagrid_component_1.DataGrid, format_1.Format, orderby_1.OrderBy
        ],
        providers: [{ provide: core_1.ErrorHandler, useClass: errorhandler_1.default }, { provide: common_1.APP_BASE_HREF, useValue: '/' }, base_service_1.BaseService],
        entryComponents: [],
        bootstrap: [app_component_1.AppComponent]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map