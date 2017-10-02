import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseService } from '../../Service/base.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IRole } from '../../Model/role';
import { DBOperation } from '../../Shared/enum';
import { Observable } from 'rxjs/Rx';
import { Global } from '../../Shared/global';
import { MdDialog, MdDialogRef } from '@angular/material';
import { FormControl } from '@angular/forms';

@Component({
    templateUrl: 'app/Admin/User/managerole.component.html'
})

export class ManageRoleComponent implements OnInit {
    msg: string;
    indLoading: boolean = false;
    roleFrm: FormGroup;
    dbops: DBOperation;
    modalTitle: string;
    modalBtnTitle: string;
    role: IRole;

    constructor(private fb: FormBuilder, private _roleService: BaseService, public dialogRef: MdDialogRef<ManageRoleComponent>) { }

    ngOnInit(): void {
        this.roleFrm = this.fb.group({
            RoleID: [''],
            RoleName: ['', [Validators.required, Validators.maxLength(20)]],
            RoleDesc: ['', [Validators.required, Validators.maxLength(200)]],
            IsActive: [''],
            CommandID: [''],
            CreateBy: [''],
            CreateDate: [''],
            CreateIP: [''],
            UpdateBy: [''],
            UpdateDate: [''],
            UpdateIP: ['']
        });
        
        this.roleFrm.valueChanges.subscribe(data => this.onValueChanged(data));
        this.onValueChanged();

        if (this.dbops == DBOperation.create)
            this.roleFrm.reset();
        else
            this.roleFrm.setValue(this.role);

        this.SetControlsState(this.dbops == DBOperation.delete ? false : true);
    }

    onValueChanged(data?: any) {

        if (!this.roleFrm) { return; }
        const form = this.roleFrm;

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
        'RoleName': '',
        'RoleDesc': '',
        'IsActive': ''
    };

    validationMessages = {
        'RoleName': {
            'maxlength': 'Role Name cannot be more than 20 characters long.',
            'required': 'Role Name is required.'
        },
        'RoleDesc': {
            'maxlength': 'Role Desc cannot be more than 200 characters long.',
            'required': 'Role Desc is required.'
        }
    };

    onSubmit(formData: any) {
        switch (this.dbops) {
            case DBOperation.create:
                //this.roleFrm.setValue({ RoleID: 0, CommandID: 0, CreateBy: localStorage.getItem(Global.ADMIN_CURRENT_USER_SESSION), CreateDate: '', CreateIP: '', UpdateBy: localStorage.getItem(Global.ADMIN_CURRENT_USER_SESSION), UpdateDate: '', UpdateIP: '' });
                this._roleService.post(Global.BASE_ROLE_ENDPOINT, formData.value).subscribe(
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
                this._roleService.put(Global.BASE_ROLE_ENDPOINT, formData._value.RoleID, formData._value).subscribe(
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
                this._roleService.delete(Global.BASE_ROLE_ENDPOINT, formData._value.RoleID).subscribe(
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
        isEnable ? this.roleFrm.enable() : this.roleFrm.disable();
    }
}