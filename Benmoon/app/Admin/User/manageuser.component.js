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
var forms_1 = require("@angular/forms");
var enum_1 = require("../../Shared/enum");
var global_1 = require("../../Shared/global");
var material_1 = require("@angular/material");
var ManageUserComponent = (function () {
    function ManageUserComponent(fb, _userService, dialogRef) {
        this.fb = fb;
        this._userService = _userService;
        this.dialogRef = dialogRef;
        this.indLoading = false;
        this.formErrors = {
            'RoleID': '',
            'LoginName': '',
            'UserName': '',
            'Pwd': '',
            'Email': '',
            'Mobile': '',
            'IsActive': ''
        };
        this.validationMessages = {
            'RoleID': {
                'required': 'Role is required.'
            },
            'LoginName': {
                'maxlength': 'Login Name cannot be more than 10 characters long.',
                'required': 'Login Name is required.'
            },
            'UserName': {
                'maxlength': 'User Name cannot be more than 50 characters long.',
                'required': 'User Name is required.'
            },
            'Pwd': {
                'maxlength': 'Password cannot be more than 10 characters long.',
                'required': 'Password is required.'
            },
            'Email': {
                'maxlength': 'Email cannot be more than 100 characters long.',
                'required': 'Email is required.',
                'email': 'Enter Email in Valid Format'
            },
            'Mobile': {
                'maxlength': 'Mobile cannot be more than 10 characters long.',
                'required': 'Mobile is required.'
            }
        };
    }
    ManageUserComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.userFrm = this.fb.group({
            UserID: [''],
            RoleID: ['', [forms_1.Validators.required]],
            LoginName: ['', [forms_1.Validators.required, forms_1.Validators.maxLength(10)]],
            UserName: ['', [forms_1.Validators.required, forms_1.Validators.maxLength(50)]],
            Pwd: ['', [forms_1.Validators.required, forms_1.Validators.maxLength(10)]],
            Email: ['', [forms_1.Validators.required, forms_1.Validators.maxLength(100), forms_1.Validators.email]],
            Mobile: ['', [forms_1.Validators.required, forms_1.Validators.maxLength(10)]],
            IsActive: [''],
            CommandID: [''],
            CreateBy: [''],
            CreateDate: [''],
            CreateIP: [''],
            UpdateBy: [''],
            UpdateDate: [''],
            UpdateIP: [''],
            RoleName: ['']
        });
        this.userFrm.valueChanges.subscribe(function (data) { return _this.onValueChanged(data); });
        this.onValueChanged();
        this.LoadRoles();
        if (this.dbops == enum_1.DBOperation.create)
            this.userFrm.reset();
        else
            this.userFrm.setValue(this.user);
        this.SetControlsState(this.dbops == enum_1.DBOperation.delete ? false : true);
    };
    ManageUserComponent.prototype.onValueChanged = function (data) {
        if (!this.userFrm) {
            return;
        }
        var form = this.userFrm;
        for (var field in this.formErrors) {
            // clear previous error message (if any)
            this.formErrors[field] = '';
            var control = form.get(field);
            if (control && control.dirty && !control.valid) {
                var messages = this.validationMessages[field];
                for (var key in control.errors) {
                    this.formErrors[field] += messages[key] + ' ';
                }
            }
        }
    };
    ManageUserComponent.prototype.onSubmit = function (formData) {
        var _this = this;
        switch (this.dbops) {
            case enum_1.DBOperation.create:
                //this.roleFrm.setValue({ RoleID: 0, CommandID: 0, CreateBy: localStorage.getItem(Global.ADMIN_CURRENT_USER_SESSION), CreateDate: '', CreateIP: '', UpdateBy: localStorage.getItem(Global.ADMIN_CURRENT_USER_SESSION), UpdateDate: '', UpdateIP: '' });
                this._userService.post(global_1.Global.BASE_USER_ENDPOINT, formData.value).subscribe(function (data) {
                    if (data == 1) {
                        _this.dialogRef.close("success");
                    }
                    else {
                        _this.dialogRef.close("error");
                    }
                }, function (error) {
                    _this.dialogRef.close("error");
                });
                break;
            case enum_1.DBOperation.update:
                this._userService.put(global_1.Global.BASE_USER_ENDPOINT, formData._value.UserID, formData._value).subscribe(function (data) {
                    if (data == 1) {
                        _this.dialogRef.close("success");
                    }
                    else {
                        _this.dialogRef.close("error");
                    }
                }, function (error) {
                    _this.dialogRef.close("error");
                });
                break;
            case enum_1.DBOperation.delete:
                this._userService.delete(global_1.Global.BASE_USER_ENDPOINT, formData._value.UserID).subscribe(function (data) {
                    if (data == 1) {
                        _this.dialogRef.close("success");
                    }
                    else {
                        _this.dialogRef.close("error");
                    }
                }, function (error) {
                    _this.dialogRef.close("error");
                });
                break;
        }
    };
    ManageUserComponent.prototype.SetControlsState = function (isEnable) {
        isEnable ? this.userFrm.enable() : this.userFrm.disable();
    };
    ManageUserComponent.prototype.LoadRoles = function () {
        var _this = this;
        this._userService.get(global_1.Global.BASE_ROLE_ENDPOINT)
            .subscribe(function (roles) { _this.roles = roles; });
    };
    return ManageUserComponent;
}());
ManageUserComponent = __decorate([
    core_1.Component({
        templateUrl: 'app/Admin/User/manageuser.component.html'
    }),
    __metadata("design:paramtypes", [forms_1.FormBuilder, base_service_1.BaseService, material_1.MdDialogRef])
], ManageUserComponent);
exports.ManageUserComponent = ManageUserComponent;
//# sourceMappingURL=manageuser.component.js.map