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
var managecategory_component_1 = require("./managecategory.component");
var material_1 = require("@angular/material");
var category_pipe_1 = require("../filter/category.pipe");
require("rxjs/add/operator/map");
require("rxjs/add/operator/do");
require("rxjs/add/operator/catch");
var CategoryComponent = (function () {
    //Grid Vars end
    function CategoryComponent(fb, router, _baseService, dialog, categoryfilter) {
        this.fb = fb;
        this.router = router;
        this._baseService = _baseService;
        this.dialog = dialog;
        this.categoryfilter = categoryfilter;
        this.isREADONLY = false;
        this.exportFileName = "Category_";
        //Grid Vars start
        this.columns = [
            {
                display: 'Category Code',
                variable: 'CategoryCode',
                filter: 'text',
            },
            {
                display: 'Category Name',
                variable: 'CategoryName',
                filter: 'text'
            },
            {
                display: 'Display Order',
                variable: 'DisplayOrder',
                filter: 'text',
            }
        ];
        this.sorting = {
            column: 'CategoryCode',
            descending: false
        };
        this.hdrbtns = [];
        this.gridbtns = [];
        this.gridchks = [];
    }
    CategoryComponent.prototype.initGridButton = function () {
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
                keys: ['CategoryID'],
                action: enum_1.DBOperation.update,
                ishide: this.isREADONLY
            },
            {
                title: 'X',
                keys: ["CategoryID"],
                action: enum_1.DBOperation.delete,
                ishide: this.isREADONLY
            }
        ];
        this.gridchks = [{
                title: ''
            }];
    };
    CategoryComponent.prototype.openDialog = function () {
        var _this = this;
        debugger;
        var dialogRef = this.dialog.open(managecategory_component_1.ManageCategoryComponent);
        dialogRef.componentInstance.dbops = this.dbops;
        dialogRef.componentInstance.modalTitle = this.modalTitle;
        dialogRef.componentInstance.modalBtnTitle = this.modalBtnTitle;
        dialogRef.componentInstance.category = this.category;
        dialogRef.afterClosed().subscribe(function (result) {
            if (result == "success") {
                _this.LoadCategories();
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
    CategoryComponent.prototype.ngOnInit = function () {
        if (localStorage.getItem(global_1.Global.ADMIN_CURRENT_USER_SESSION) == undefined) {
            this.router.navigate(['login']);
        }
        this.LoadCategories();
    };
    CategoryComponent.prototype.LoadCategories = function () {
        var _this = this;
        this._baseService.get(global_1.Global.BASE_CATEGORY_ENDPOINT)
            .subscribe(function (categories) { _this.categories = categories; _this.initGridButton(); });
    };
    CategoryComponent.prototype.addCategory = function () {
        this.dbops = enum_1.DBOperation.create;
        this.modalTitle = "Add New Category";
        this.modalBtnTitle = "Add";
        this.openDialog();
    };
    CategoryComponent.prototype.editCategory = function (id) {
        this.dbops = enum_1.DBOperation.update;
        this.modalTitle = "Edit Category";
        this.modalBtnTitle = "Update";
        this.category = this.categories.filter(function (x) { return x.CategoryID == id; })[0];
        this.openDialog();
    };
    CategoryComponent.prototype.deleteCategory = function (id) {
        this.dbops = enum_1.DBOperation.delete;
        this.modalTitle = "Confirm to Delete?";
        this.modalBtnTitle = "Delete";
        this.category = this.categories.filter(function (x) { return x.CategoryID == id; })[0];
        this.openDialog();
    };
    CategoryComponent.prototype.gridaction = function (gridaction) {
        switch (gridaction.action) {
            case enum_1.DBOperation.create:
                this.addCategory();
                break;
            case enum_1.DBOperation.update:
                this.editCategory(gridaction.values[0].value);
                break;
            case enum_1.DBOperation.delete:
                this.deleteCategory(gridaction.values[0].value);
                break;
        }
    };
    return CategoryComponent;
}());
CategoryComponent = __decorate([
    core_1.Component({
        selector: 'user-app',
        templateUrl: 'app/Admin/Catalog/category.component.html'
    }),
    __metadata("design:paramtypes", [forms_1.FormBuilder, router_1.Router, base_service_1.BaseService, material_1.MdDialog, category_pipe_1.CategoryFilterPipe])
], CategoryComponent);
exports.CategoryComponent = CategoryComponent;
//# sourceMappingURL=category.component.js.map