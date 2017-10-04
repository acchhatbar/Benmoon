import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseService } from '../../Service/base.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ICategory } from '../../Model/Category';
import { DBOperation } from '../../Shared/enum';
import { Observable } from 'rxjs/Rx';
import { Global } from '../../Shared/global';
import { MdDialog, MdDialogRef } from '@angular/material';
import { FormControl } from '@angular/forms';

@Component({
    templateUrl: 'app/Admin/Catalog/managecategory.component.html'
})

export class ManageCategoryComponent implements OnInit {
    parentCategories: ICategory[];
    selectedParentCategory: ICategory;
    msg: string;
    indLoading: boolean = false;
    categoryFrm: FormGroup;
    dbops: DBOperation;
    modalTitle: string;
    modalBtnTitle: string;
    category: ICategory;

    constructor(private fb: FormBuilder, private _baseService: BaseService, public dialogRef: MdDialogRef<ManageCategoryComponent>) { }

    ngOnInit(): void {
        this.categoryFrm = this.fb.group({
            CategoryID: [''],
            ParentCategoryID: [''],
            CategoryCode: ['', [Validators.required, Validators.maxLength(5)]],
            CategoryName: ['', [Validators.required, Validators.maxLength(50)]],
            CategoryDesc: ['', [Validators.required, Validators.maxLength(200)]],
            CategoryImage: [''],
            DisplayOrder: ['', [Validators.required, Validators.maxLength(5)]],
            IsActive: [''],
            CommandID: [''],
            CreateBy: [''],
            CreateDate: [''],
            CreateIP: [''],
            UpdateBy: [''],
            UpdateDate: [''],
            UpdateIP: ['']
        });
        this.categoryFrm.valueChanges.subscribe(data => this.onValueChanged(data));
        this.onValueChanged();
        this.LoadParentCategories();

        if (this.dbops == DBOperation.create)
            this.categoryFrm.reset();
        else
            this.categoryFrm.setValue(this.category);


        this.SetControlsState(this.dbops == DBOperation.delete ? false : true);

    }

    onValueChanged(data?: any) {

        if (!this.categoryFrm) { return; }
        const form = this.categoryFrm;

        for (const field in this.formErrors) {
            // clear previous error message (if any)
            this.formErrors[field] = '';
            const control = form.get(field);

            if (control && control.dirty && !control.valid) {
                const messages = this.validationMessages[field];
                for (const key in control.errors) {
                    this.formErrors[field] += messages[key] + ' ';
                }
            }
        }
    }

    formErrors = {
        'CategoryCode': '',
        'CategoryName': '',
        'CategoryDesc': '',
        'DisplayOrder': '',
        'IsActive': ''
    };

    validationMessages = {
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
        }
        ,
        'DisplayOrder': {
            'maxlength': 'Display Order cannot be more than 5 digits long.',
            'required': 'Display Order is required.'
        }
    };

    onSubmit(formData: any) {
        switch (this.dbops) {
            case DBOperation.create:
                //this.roleFrm.setValue({ RoleID: 0, CommandID: 0, CreateBy: localStorage.getItem(Global.ADMIN_CURRENT_USER_SESSION), CreateDate: '', CreateIP: '', UpdateBy: localStorage.getItem(Global.ADMIN_CURRENT_USER_SESSION), UpdateDate: '', UpdateIP: '' });
                this._baseService.post(Global.BASE_CATEGORY_ENDPOINT, formData.value).subscribe(
                    data => {
                        if (data == 1) //Success
                        {
                            this.dialogRef.close("success");
                        }
                        else {
                            this.dialogRef.close("error");
                        }
                    },
                    error => {
                        this.dialogRef.close("error");
                    }
                );
                break;
            case DBOperation.update:
                this._baseService.put(Global.BASE_CATEGORY_ENDPOINT, formData._value.CategoryID, formData._value).subscribe(
                    data => {
                        if (data == 1) //Success
                        {
                            this.dialogRef.close("success");
                        }
                        else {
                            this.dialogRef.close("error");
                        }
                    },
                    error => {
                        this.dialogRef.close("error");
                    }
                );
                break;
            case DBOperation.delete:
                this._baseService.delete(Global.BASE_CATEGORY_ENDPOINT, formData._value.CategoryID).subscribe(
                    data => {
                        if (data == 1) //Success
                        {
                            this.dialogRef.close("success");
                        }
                        else {
                            this.dialogRef.close("error");
                        }
                    },
                    error => {
                        this.dialogRef.close("error");
                    }
                );
                break;

        }
    }

    SetControlsState(isEnable: boolean) {
        isEnable ? this.categoryFrm.enable() : this.categoryFrm.disable();
    }

    LoadParentCategories(): void {
        this._baseService.get(Global.BASE_CATEGORY_ENDPOINT)
            .subscribe(parentCategories => { this.parentCategories = parentCategories; }
            );
    }
}