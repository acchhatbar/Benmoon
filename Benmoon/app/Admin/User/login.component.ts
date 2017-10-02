import { Component, OnInit, ViewChild } from "@angular/core";
import { BaseService } from '../../Service/base.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { IUser } from '../../Model/user';
import { DBOperation } from '../../Shared/enum';
import { Global } from '../../Shared/global';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

@Component({
    templateUrl: 'app/Admin/User/login.component.html',
})

export class LoginComponent implements OnInit {

    msg: string;
    BtnTitle: string = "Login";
    indLoading: boolean = false;
    loginFrm: FormGroup;
    user: IUser;
    dbops: DBOperation;

    constructor(private fb: FormBuilder, private router: Router, private _userService: BaseService) { }

    ngOnInit(): void {
        this.loginFrm = this.fb.group({
            LoginName: ['', [Validators.required, Validators.maxLength(10)]],
            Pwd: ['', [Validators.required, Validators.maxLength(10)]]
        });
        this.loginFrm.valueChanges.subscribe(data => this.onValueChanged(data));
        this.onValueChanged();
    }

    formErrors = {
        'LoginName': '',
        'Pwd': ''
    }

    validationMessages = {
        'LoginName': {
            'maxlength': 'Login Name cannot be more than 10 characters long.',
            'required': 'Login Name is required.'
        },
        'Pwd': {
            'maxlength': 'Password cannot be more than 10 characters long.',
            'required': 'Password is required.'
        }
    }

    onValueChanged(data?: any) {

        if (!this.loginFrm) { return; }
        const form = this.loginFrm;

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

    onSubmit(formData: any) {
        return this._userService.post(Global.LOGIN_ENDPOINT, formData.value).subscribe(
            data => {
                localStorage.setItem(Global.ADMIN_CURRENT_USER_SESSION, JSON.stringify(data));
                //localStorage.removeItem('currentUser');
                this.router.navigate(['home']);
            }
        );
        
    }
}