import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseService } from '../../Service/base.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IUser } from '../../Model/User';
import { DBOperation } from '../../Shared/enum';
import { Observable } from 'rxjs/Rx';
import { Global } from '../../Shared/global';
import { MdDialog, MdDialogRef } from '@angular/material';
import { FormControl } from '@angular/forms';

@Component({
    templateUrl: 'app/Admin/User/manageuser.component.html'
})

export class ManageUserComponent implements OnInit {
    msg: string;
    indLoading: boolean = false;
    userFrm: FormGroup;
    dbops: DBOperation;
    modalTitle: string;
    modalBtnTitle: string;
    user: IUser;

    constructor(private fb: FormBuilder, private _userService: BaseService, public dialogRef: MdDialogRef<ManageUserComponent>) { }

    ngOnInit(): void {
        this.userFrm = this.fb.group({
            UserID: [''],
            RoleID: [''],
            LoginName: ['', [Validators.required, Validators.maxLength(10)]],
            UserName: ['', [Validators.required, Validators.maxLength(50)]],
            Pwd: ['', [Validators.required, Validators.maxLength(10)]],
            Email: ['', [[Validators.required, Validators.maxLength(100), Validators.email]]],
            Mobile: ['', [Validators.required, Validators.maxLength(10)]],
            IsActive: [''],
            CommandID: [''],
            CreateBy: [''],
            CreateDate: [''],
            CreateIP: [''],
            UpdateBy: [''],
            UpdateDate: [''],
            UpdateIP: ['']
        });
        debugger;
        this.userFrm.valueChanges.subscribe(data => this.onValueChanged(data));
        this.onValueChanged();

        if (this.dbops == DBOperation.create)
            this.userFrm.reset();
        else
            this.userFrm.setValue(this.user);

        this.SetControlsState(this.dbops == DBOperation.delete ? false : true);
    }

    onValueChanged(data?: any) {

        if (!this.userFrm) { return; }
        const form = this.userFrm;

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
        'LoginName': '',
        'UserName': '',
        'Pwd':'',
        'Email': '',
        'Mobile': '',
        'IsActive': ''
    };

    validationMessages = {
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
        }
        ,
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

    onSubmit(formData: any) {
        switch (this.dbops) {
            case DBOperation.create:
                //this.roleFrm.setValue({ RoleID: 0, CommandID: 0, CreateBy: localStorage.getItem(Global.ADMIN_CURRENT_USER_SESSION), CreateDate: '', CreateIP: '', UpdateBy: localStorage.getItem(Global.ADMIN_CURRENT_USER_SESSION), UpdateDate: '', UpdateIP: '' });
                this._userService.post(Global.BASE_USER_ENDPOINT, formData.value).subscribe(
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
                this._userService.put(Global.BASE_USER_ENDPOINT, formData._value.UserID, formData._value).subscribe(
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
                this._userService.delete(Global.BASE_USER_ENDPOINT, formData._value.UserID).subscribe(
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
        isEnable ? this.userFrm.enable() : this.userFrm.disable();
    }
}