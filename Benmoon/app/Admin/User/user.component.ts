import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseService } from '../../Service/base.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { IUser } from '../../Model/user';
import { DBOperation } from '../../Shared/enum';
import { Observable } from 'rxjs/Rx';
import { Global } from '../../Shared/global';
import { ManageUserComponent } from './manageuser.component';
import { MdDialog, MdDialogRef } from '@angular/material';
import { UserFilterPipe } from '../filter/user.pipe'
import { AdminHeaderComponent } from '../adminheader.component';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

@Component({
    selector: 'user-app',
    templateUrl: 'app/Admin/User/user.component.html'
})

export class UserComponent implements OnInit {
    isREADONLY: boolean = false;
    exportFileName: string = "User_";

    users: IUser[];
    user: IUser;
    msg: string;
    dbops: DBOperation;
    modalTitle: string;
    modalBtnTitle: string;

    //Grid Vars start
    columns: any[] = [
        {
            display: 'User Name',
            variable: 'UserName',
            filter: 'text',
        },
        {
            display: 'Login Name',
            variable: 'LoginName',
            filter: 'text'
        },
        {
            display: 'Role',
            variable: 'RoleName',
            filter: 'text',
        },
        {
            display: 'Email',
            variable: 'Email',
            filter: 'text',
        },
        {
            display: 'Mobile',
            variable: 'Mobile',
            filter: 'text'
        }

    ];
    sorting: any = {
        column: 'UserName',
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
                keys: ['UserID'],
                action: DBOperation.update,
                ishide: this.isREADONLY
            },
            {
                title: 'X',
                keys: ["UserID"],
                action: DBOperation.delete,
                ishide: this.isREADONLY
            }

        ];
        this.gridchks = [{
            title: ''
        }];

    }
    //Grid Vars end

    constructor(private fb: FormBuilder, private router: Router, private _userService: BaseService, private dialog: MdDialog, private userfilter: UserFilterPipe) { }

    openDialog() {
        debugger;
        let dialogRef = this.dialog.open(ManageUserComponent);
        dialogRef.componentInstance.dbops = this.dbops;
        dialogRef.componentInstance.modalTitle = this.modalTitle;
        dialogRef.componentInstance.modalBtnTitle = this.modalBtnTitle;
        dialogRef.componentInstance.user = this.user;

        dialogRef.afterClosed().subscribe(result => {
            if (result == "success") {
                this.LoadUsers();
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
        this.LoadUsers();
    }
    LoadUsers(): void {
        this._userService.get(Global.BASE_USER_ENDPOINT)
            .subscribe(users => { this.users = users; this.initGridButton(); }
            );
    }

    addUser() {
        this.dbops = DBOperation.create;
        this.modalTitle = "Add New User";
        this.modalBtnTitle = "Add";
        this.openDialog();
    }
    editUser(id: number) {
        this.dbops = DBOperation.update;
        this.modalTitle = "Edit User";
        this.modalBtnTitle = "Update";
        this.user = this.users.filter(x => x.UserID == id)[0];
        this.openDialog();
    }
    deleteUser(id: number) {
        this.dbops = DBOperation.delete;
        this.modalTitle = "Confirm to Delete?";
        this.modalBtnTitle = "Delete";
        this.user = this.users.filter(x => x.UserID == id)[0];
        this.openDialog();
    }

    gridaction(gridaction: any): void {

        switch (gridaction.action) {
            case DBOperation.create:
                this.addUser();
                break;
            case DBOperation.update:
                this.editUser(gridaction.values[0].value);
                break;
            case DBOperation.delete:
                this.deleteUser(gridaction.values[0].value);
                break;
        }
    }
}