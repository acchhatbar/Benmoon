"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var router_1 = require("@angular/router");
var home_component_1 = require("./admin/home/home.component");
var login_component_1 = require("./admin/user/login.component");
var logout_component_1 = require("./admin/user/logout.component");
var role_component_1 = require("./admin/user/role.component");
var appRoutes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: login_component_1.LoginComponent },
    { path: 'home', component: home_component_1.HomeComponent },
    { path: 'logout', component: logout_component_1.LogoutComponent },
    { path: 'role', component: role_component_1.RoleComponent }
];
exports.routing = router_1.RouterModule.forRoot(appRoutes);
//# sourceMappingURL=app.routing.js.map