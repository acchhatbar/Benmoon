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
var ManageCategoryComponent = (function () {
    function ManageCategoryComponent(fb, _baseService, dialogRef) {
        this.fb = fb;
        this._baseService = _baseService;
        this.dialogRef = dialogRef;
        this.indLoading = false;
        this.formErrors = {
            'CategoryCode': '',
            'CategoryName': '',
            'CategoryDesc': '',
            'DisplayOrder': '',
            'IsActive': ''
        };
        this.validationMessages = {
            'CategoryCode': {
                'maxlength': 'Category Code cannot be more than 5 characters long.',
                'required': 'Category Code is required.'
            },
            'CategoryName': {
                'maxlength': 'Category Name cannot be more than 50 characters long.',
                'required': 'Category Name is required.'
            },
            'CategoryDesc': {
                'maxlength': 'Category Desc cannot be more than 200 characters long.',
                'required': 'Category Desc is required.'
            },
            'DisplayOrder': {
                'maxlength': 'Display Order cannot be more than 5 digits long.',
                'required': 'Display Order is required.'
            }
        };
    }
    ManageCategoryComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.categoryFrm = this.fb.group({
            CategoryID: [''],
            ParentCategoryID: [''],
            CategoryCode: ['', [forms_1.Validators.required, forms_1.Validators.maxLength(5)]],
            CategoryName: ['', [forms_1.Validators.required, forms_1.Validators.maxLength(50)]],
            CategoryDesc: ['', [forms_1.Validators.required, forms_1.Validators.maxLength(200)]],
            CategoryImage: [''],
            DisplayOrder: ['', [forms_1.Validators.required, forms_1.Validators.maxLength(5)]],
            IsActive: [''],
            CommandID: [''],
            CreateBy: [''],
            CreateDate: [''],
            CreateIP: [''],
            UpdateBy: [''],
            UpdateDate: [''],
            UpdateIP: ['']
        });
        this.categoryFrm.valueChanges.subscribe(function (data) { return _this.onValueChanged(data); });
        this.onValueChanged();
        this.LoadParentCategories();
        if (this.dbops == enum_1.DBOperation.create)
            this.categoryFrm.reset();
        else
            this.categoryFrm.setValue(this.category);
        this.SetControlsState(this.dbops == enum_1.DBOperation.delete ? false : true);
    };
    ManageCategoryComponent.prototype.onValueChanged = function (data) {
        if (!this.categoryFrm) {
            return;
        }
        var form = this.categoryFrm;
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
    ManageCategoryComponent.prototype.onSubmit = function (formData) {
        var _this = this;
        switch (this.dbops) {
            case enum_1.DBOperation.create:
                //this.roleFrm.setValue({ RoleID: 0, CommandID: 0, CreateBy: localStorage.getItem(Global.ADMIN_CURRENT_USER_SESSION), CreateDate: '', CreateIP: '', UpdateBy: localStorage.getItem(Global.ADMIN_CURRENT_USER_SESSION), UpdateDate: '', UpdateIP: '' });
                this._baseService.post(global_1.Global.BASE_CATEGORY_ENDPOINT, formData.value).subscribe(function (data) {
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
                this._baseService.put(global_1.Global.BASE_CATEGORY_ENDPOINT, formData._value.CategoryID, formData._value).subscribe(function (data) {
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
                this._baseService.delete(global_1.Global.BASE_CATEGORY_ENDPOINT, formData._value.CategoryID).subscribe(function (data) {
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
    ManageCategoryComponent.prototype.SetControlsState = function (isEnable) {
        isEnable ? this.categoryFrm.enable() : this.categoryFrm.disable();
    };
    ManageCategoryComponent.prototype.LoadParentCategories = function () {
        var _this = this;
        this._baseService.get(global_1.Global.BASE_CATEGORY_ENDPOINT)
            .subscribe(function (parentCategories) { _this.parentCategories = parentCategories; });
    };
    return ManageCategoryComponent;
}());
ManageCategoryComponent = __decorate([
    core_1.Component({
        templateUrl: 'app/Admin/Catalog/managecategory.component.html'
    }),
    __metadata("design:paramtypes", [forms_1.FormBuilder, base_service_1.BaseService, material_1.MdDialogRef])
], ManageCategoryComponent);
exports.ManageCategoryComponent = ManageCategoryComponent;
//# sourceMappingURL=managecategory.component.js.map