import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseService } from '../../Service/base.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ICategory } from '../../Model/Category';
import { DBOperation } from '../../Shared/enum';
import { Observable } from 'rxjs/Rx';
import { Global } from '../../Shared/global';
import { ManageCategoryComponent } from './managecategory.component';
import { MdDialog, MdDialogRef } from '@angular/material';
import { CategoryFilterPipe } from '../filter/category.pipe'
import { AdminHeaderComponent } from '../adminheader.component';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

@Component({
    selector: 'user-app',
    templateUrl: 'app/Admin/Catalog/category.component.html'
})

export class CategoryComponent implements OnInit {
    isREADONLY: boolean = false;
    exportFileName: string = "Category_";

    categories: ICategory[];
    category: ICategory;
    msg: string;
    dbops: DBOperation;
    modalTitle: string;
    modalBtnTitle: string;

    //Grid Vars start
    columns: any[] = [
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
    sorting: any = {
        column: 'CategoryCode',
        descending: false
    };
    hdrbtns: any[] = [];
    gridbtns: any[] = [];
    gridchks: any[] = [];
    initGridButton() {

        this.hdrbtns = [
            {
                title: 'Add',
                keys: [''],
                action: DBOperation.create,
                ishide: this.isREADONLY

            }];
        this.gridbtns = [
            {
                title: 'Edit',
                keys: ['CategoryID'],
                action: DBOperation.update,
                ishide: this.isREADONLY
            },
            {
                title: 'X',
                keys: ["CategoryID"],
                action: DBOperation.delete,
                ishide: this.isREADONLY
            }

        ];
        this.gridchks = [{
            title: ''
        }];

    }
    //Grid Vars end

    constructor(private fb: FormBuilder, private router: Router, private _baseService: BaseService, private dialog: MdDialog, private categoryfilter: CategoryFilterPipe) { }

    openDialog() {
        debugger;
        let dialogRef = this.dialog.open(ManageCategoryComponent);
        dialogRef.componentInstance.dbops = this.dbops;
        dialogRef.componentInstance.modalTitle = this.modalTitle;
        dialogRef.componentInstance.modalBtnTitle = this.modalBtnTitle;
        dialogRef.componentInstance.category = this.category;

        dialogRef.afterClosed().subscribe(result => {
            if (result == "success") {
                this.LoadCategories();
                switch (this.dbops) {
                    case DBOperation.create:
                        this.msg = "Data successfully added.";
                        break;
                    case DBOperation.update:
                        this.msg = "Data successfully updated.";
                        break;
                    case DBOperation.delete:
                        this.msg = "Data successfully deleted.";
                        break;
                }
            }
            else if (result == "error")
                this.msg = "There is some issue in saving records, please contact to system administrator!"
            else
                this.msg = result;
        });
    }

    ngOnInit(): void {
        if (localStorage.getItem(Global.ADMIN_CURRENT_USER_SESSION) == undefined) {
            this.router.navigate(['login']);
        }
        this.LoadCategories();
    }
    LoadCategories(): void {
        this._baseService.get(Global.BASE_CATEGORY_ENDPOINT)
            .subscribe(categories => { this.categories = categories; this.initGridButton(); }
            );
    }

    addCategory() {
        this.dbops = DBOperation.create;
        this.modalTitle = "Add New Category";
        this.modalBtnTitle = "Add";
        this.openDialog();
    }
    editCategory(id: number) {
        this.dbops = DBOperation.update;
        this.modalTitle = "Edit Category";
        this.modalBtnTitle = "Update";
        this.category = this.categories.filter(x => x.CategoryID == id)[0];
        this.openDialog();
    }
    deleteCategory(id: number) {
        this.dbops = DBOperation.delete;
        this.modalTitle = "Confirm to Delete?";
        this.modalBtnTitle = "Delete";
        this.category = this.categories.filter(x => x.CategoryID == id)[0];
        this.openDialog();
    }

    gridaction(gridaction: any): void {

        switch (gridaction.action) {
            case DBOperation.create:
                this.addCategory();
                break;
            case DBOperation.update:
                this.editCategory(gridaction.values[0].value);
                break;
            case DBOperation.delete:
                this.deleteCategory(gridaction.values[0].value);
                break;
        }
    }
}