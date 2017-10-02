"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var base_service_1 = require("../../Service/base.service");
var router_1 = require("@angular/router");
var forms_1 = require("@angular/forms");
var enum_1 = require("../../Shared/enum");
var global_1 = require("../../Shared/global");
var managerole_component_1 = require("./managerole.component");
var material_1 = require("@angular/material");
var role_pipe_1 = require("../filter/role.pipe");
require("rxjs/add/operator/map");
require("rxjs/add/operator/do");
require("rxjs/add/operator/catch");
var RoleComponent = (function () {
    //Grid Vars end
    function RoleComponent(fb, router, _roleService, dialog, rolefilter) {
        this.fb = fb;
        this.router = router;
        this._roleService = _roleService;
        this.dialog = dialog;
        this.rolefilter = rolefilter;
        this.isREADONLY = false;
        this.exportFileName = "Role_";
        //Grid Vars start
        this.columns = [
            {
                display: 'Role Name',
                variable: 'RoleName',
                filter: 'text',
            },
            {
                display: 'Role Desc',
                variable: 'RoleDesc',
                filter: 'text'
            }
        ];
        this.sorting = {
            column: 'FirstName',
            descending: false
        };
        this.hdrbtns = [];
        this.gridbtns = [];
        this.gridchks = [];
    }
    RoleComponent.prototype.initGridButton = function () {
        this.hdrbtns = [
            {
                title: 'Add',
                keys: [''],
                action: enum_1.DBOperation.create,
                ishide: this.isREADONLY
            }
        ];
        this.gridbtns = [
            {
                title: 'Edit',
                keys: ['RoleID'],
                action: enum_1.DBOperation.update,
                ishide: this.isREADONLY
            },
            {
                title: 'X',
                keys: ["RoleID"],
                action: enum_1.DBOperation.delete,
                ishide: this.isREADONLY
            }
        ];
        this.gridchks = [{
                title: ''
            }];
    };
    RoleComponent.prototype.openDialog = function () {
        var _this = this;
        var dialogRef = this.dialog.open(managerole_component_1.ManageRoleComponent);
        dialogRef.componentInstance.dbops = this.dbops;
        dialogRef.componentInstance.modalTitle = this.modalTitle;
        dialogRef.componentInstance.modalBtnTitle = this.modalBtnTitle;
        dialogRef.componentInstance.role = this.role;
        dialogRef.afterClosed().subscribe(function (result) {
            if (result == "success") {
                _this.LoadRoles();
                switch (_this.dbops) {
                    case enum_1.DBOperation.create:
                        _this.msg = "Data successfully added.";
                        break;
                    case enum_1.DBOperation.update:
                        _this.msg = "Data successfully updated.";
                        break;
                    case enum_1.DBOperation.delete:
                        _this.msg = "Data successfully deleted.";
                        break;
                }
            }
            else if (result == "error")
                _this.msg = "There is some issue in saving records, please contact to system administrator!";
            else
                _this.msg = result;
        });
    };
    RoleComponent.prototype.ngOnInit = function () {
        if (localStorage.getItem(global_1.Global.ADMIN_CURRENT_USER_SESSION) == undefined) {
            this.router.navigate(['login']);
        }
        this.LoadRoles();
    };
    RoleComponent.prototype.LoadRoles = function () {
        var _this = this;
        this._roleService.get(global_1.Global.BASE_ROLE_ENDPOINT)
            .subscribe(function (roles) { _this.roles = roles; _this.initGridButton(); });
    };
    RoleComponent.prototype.addRole = function () {
        this.dbops = enum_1.DBOperation.create;
        this.modalTitle = "Add New Role";
        this.modalBtnTitle = "Add";
        this.openDialog();
    };
    RoleComponent.prototype.editRole = function (id) {
        this.dbops = enum_1.DBOperation.update;
        this.modalTitle = "Edit Role";
        this.modalBtnTitle = "Update";
        this.role = this.roles.filter(function (x) { return x.RoleID == id; })[0];
        this.openDialog();
    };
    RoleComponent.prototype.deleteRole = function (id) {
        this.dbops = enum_1.DBOperation.delete;
        this.modalTitle = "Confirm to Delete?";
        this.modalBtnTitle = "Delete";
        this.role = this.roles.filter(function (x) { return x.RoleID == id; })[0];
        this.openDialog();
    };
    RoleComponent.prototype.gridaction = function (gridaction) {
        switch (gridaction.action) {
            case enum_1.DBOperation.create:
                this.addRole();
                break;
            case enum_1.DBOperation.update:
                this.editRole(gridaction.values[0].value);
                break;
            case enum_1.DBOperation.delete:
                this.deleteRole(gridaction.values[0].value);
                break;
        }
    };
    return RoleComponent;
}());
RoleComponent = __decorate([
    core_1.Component({
        selector: 'user-app',
        templateUrl: 'app/Admin/User/role.component.html'
    }),
    __metadata("design:paramtypes", [forms_1.FormBuilder, router_1.Router, base_service_1.BaseService, material_1.MdDialog, role_pipe_1.RoleFilterPipe])
], RoleComponent);
exports.RoleComponent = RoleComponent;
//# sourceMappingURL=role.component.js.map