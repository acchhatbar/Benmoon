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
    templateUrl: 'app/Admin/User/logout.component.html',
})

export class LogoutComponent implements OnInit {

    constructor(private fb: FormBuilder, private router: Router) { }

    ngOnInit(): void {
        localStorage.removeItem(Global.ADMIN_CURRENT_USER_SESSION);
        this.router.navigate(['login']);
    }
}