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
var manageuser_component_1 = require("./manageuser.component");
var material_1 = require("@angular/material");
var user_pipe_1 = require("../filter/user.pipe");
require("rxjs/add/operator/map");
require("rxjs/add/operator/do");
require("rxjs/add/operator/catch");
var UserComponent = (function () {
    //Grid Vars end
    function UserComponent(fb, router, _userService, dialog, userfilter) {
        this.fb = fb;
        this.router = router;
        this._userService = _userService;
        this.dialog = dialog;
        this.userfilter = userfilter;
        this.isREADONLY = false;
        this.exportFileName = "User_";
        //Grid Vars start
        this.columns = [
            {
                display: 'User Name',
                variable: 'UserName',
                filter: 'text',
            },
            {
                display: 'Login Name',
                variable: 'LoginName',
                filter: 'text'
            },
            {
                display: 'Role',
                variable: 'RoleName',
                filter: 'text',
            },
            {
                display: 'Email',
                variable: 'Email',
                filter: 'text',
            },
            {
                display: 'Mobile',
                variable: 'Mobile',
                filter: 'text'
            }
        ];
        this.sorting = {
            column: 'UserName',
            descending: false
        };
        this.hdrbtns = [];
        this.gridbtns = [];
        this.gridchks = [];
    }
    UserComponent.prototype.initGridButton = function () {
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
                keys: ['UserID'],
                action: enum_1.DBOperation.update,
                ishide: this.isREADONLY
            },
            {
                title: 'X',
                keys: ["UserID"],
                action: enum_1.DBOperation.delete,
                ishide: this.isREADONLY
            }
        ];
        this.gridchks = [{
                title: ''
            }];
    };
    UserComponent.prototype.openDialog = function () {
        var _this = this;
        debugger;
        var dialogRef = this.dialog.open(manageuser_component_1.ManageUserComponent);
        dialogRef.componentInstance.dbops = this.dbops;
        dialogRef.componentInstance.modalTitle = this.modalTitle;
        dialogRef.componentInstance.modalBtnTitle = this.modalBtnTitle;
        dialogRef.componentInstance.user = this.user;
        dialogRef.afterClosed().subscribe(function (result) {
            if (result == "success") {
                _this.LoadUsers();
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
    UserComponent.prototype.ngOnInit = function () {
        if (localStorage.getItem(global_1.Global.ADMIN_CURRENT_USER_SESSION) == undefined) {
            this.router.navigate(['login']);
        }
        this.LoadUsers();
    };
    UserComponent.prototype.LoadUsers = function () {
        var _this = this;
        this._userService.get(global_1.Global.BASE_USER_ENDPOINT)
            .subscribe(function (users) { _this.users = users; _this.initGridButton(); });
    };
    UserComponent.prototype.addUser = function () {
        this.dbops = enum_1.DBOperation.create;
        this.modalTitle = "Add New User";
        this.modalBtnTitle = "Add";
        this.openDialog();
    };
    UserComponent.prototype.editUser = function (id) {
        this.dbops = enum_1.DBOperation.update;
        this.modalTitle = "Edit User";
        this.modalBtnTitle = "Update";
        this.user = this.users.filter(function (x) { return x.UserID == id; })[0];
        this.openDialog();
    };
    UserComponent.prototype.deleteUser = function (id) {
        this.dbops = enum_1.DBOperation.delete;
        this.modalTitle = "Confirm to Delete?";
        this.modalBtnTitle = "Delete";
        this.user = this.users.filter(function (x) { return x.UserID == id; })[0];
        this.openDialog();
    };
    UserComponent.prototype.gridaction = function (gridaction) {
        switch (gridaction.action) {
            case enum_1.DBOperation.create:
                this.addUser();
                break;
            case enum_1.DBOperation.update:
                this.editUser(gridaction.values[0].value);
                break;
            case enum_1.DBOperation.delete:
                this.deleteUser(gridaction.values[0].value);
                break;
        }
    };
    return UserComponent;
}());
UserComponent = __decorate([
    core_1.Component({
        selector: 'user-app',
        templateUrl: 'app/Admin/User/user.component.html'
    }),
    __metadata("design:paramtypes", [forms_1.FormBuilder, router_1.Router, base_service_1.BaseService, material_1.MdDialog, user_pipe_1.UserFilterPipe])
], UserComponent);
exports.UserComponent = UserComponent;
//# sourceMappingURL=user.component.js.map