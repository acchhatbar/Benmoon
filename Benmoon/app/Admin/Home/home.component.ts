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
    templateUrl: 'app/Admin/Home/home.component.html',
})

export class HomeComponent implements OnInit {

    constructor(private fb: FormBuilder, private router: Router) { }

    ngOnInit(): void {
        if (localStorage.getItem(Global.ADMIN_CURRENT_USER_SESSION) == undefined)
        {
            this.router.navigate(['login']);
        }
    }
}