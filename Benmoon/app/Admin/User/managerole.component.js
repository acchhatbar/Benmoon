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
var ManageRoleComponent = (function () {
    function ManageRoleComponent(fb, _roleService, dialogRef) {
        this.fb = fb;
        this._roleService = _roleService;
        this.dialogRef = dialogRef;
        this.indLoading = false;
        this.formErrors = {
            'RoleName': '',
            'RoleDesc': '',
            'IsActive': ''
        };
        this.validationMessages = {
            'RoleName': {
                'maxlength': 'Role Name cannot be more than 20 characters long.',
                'required': 'Role Name is required.'
            },
            'RoleDesc': {
                'maxlength': 'Role Desc cannot be more than 200 characters long.',
                'required': 'Role Desc is required.'
            }
        };
    }
    ManageRoleComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.roleFrm = this.fb.group({
            RoleID: [''],
            RoleName: ['', [forms_1.Validators.required, forms_1.Validators.maxLength(20)]],
            RoleDesc: ['', [forms_1.Validators.required, forms_1.Validators.maxLength(200)]],
            IsActive: [''],
            CommandID: [''],
            CreateBy: [''],
            CreateDate: [''],
            CreateIP: [''],
            UpdateBy: [''],
            UpdateDate: [''],
            UpdateIP: ['']
        });
        this.roleFrm.valueChanges.subscribe(function (data) { return _this.onValueChanged(data); });
        this.onValueChanged();
        if (this.dbops == enum_1.DBOperation.create)
            this.roleFrm.reset();
        else
            this.roleFrm.setValue(this.role);
        this.SetControlsState(this.dbops == enum_1.DBOperation.delete ? false : true);
    };
    ManageRoleComponent.prototype.onValueChanged = function (data) {
        if (!this.roleFrm) {
            return;
        }
        var form = this.roleFrm;
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
    ManageRoleComponent.prototype.onSubmit = function (formData) {
        var _this = this;
        switch (this.dbops) {
            case enum_1.DBOperation.create:
                //this.roleFrm.setValue({ RoleID: 0, CommandID: 0, CreateBy: localStorage.getItem(Global.ADMIN_CURRENT_USER_SESSION), CreateDate: '', CreateIP: '', UpdateBy: localStorage.getItem(Global.ADMIN_CURRENT_USER_SESSION), UpdateDate: '', UpdateIP: '' });
                this._roleService.post(global_1.Global.BASE_ROLE_ENDPOINT, formData.value).subscribe(function (data) {
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
                this._roleService.put(global_1.Global.BASE_ROLE_ENDPOINT, formData._value.RoleID, formData._value).subscribe(function (data) {
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
                this._roleService.delete(global_1.Global.BASE_ROLE_ENDPOINT, formData._value.RoleID).subscribe(function (data) {
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
    ManageRoleComponent.prototype.SetControlsState = function (isEnable) {
        isEnable ? this.roleFrm.enable() : this.roleFrm.disable();
    };
    return ManageRoleComponent;
}());
ManageRoleComponent = __decorate([
    core_1.Component({
        templateUrl: 'app/Admin/User/managerole.component.html'
    }),
    __metadata("design:paramtypes", [forms_1.FormBuilder, base_service_1.BaseService, material_1.MdDialogRef])
], ManageRoleComponent);
exports.ManageRoleComponent = ManageRoleComponent;
//# sourceMappingURL=managerole.component.js.map