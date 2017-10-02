import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseService } from '../../Service/base.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { IRole } from '../../Model/role';
import { DBOperation } from '../../Shared/enum';
import { Observable } from 'rxjs/Rx';
import { Global } from '../../Shared/global';
import { ManageRoleComponent } from './managerole.component';
import { MdDialog, MdDialogRef } from '@angular/material';
import { RoleFilterPipe } from '../filter/role.pipe'
import { AdminHeaderComponent } from '../adminheader.component';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

@Component({
    selector: 'user-app',
    templateUrl: 'app/Admin/User/role.component.html'
})

export class RoleComponent implements OnInit {
    isREADONLY: boolean = false;
    exportFileName: string = "Role_";

    roles: IRole[];
    role: IRole;
    msg: string;
    dbops: DBOperation;
    modalTitle: string;
    modalBtnTitle: string;

    //Grid Vars start
    columns: any[] = [
        {
            display: 'Role Name',
            variable: 'RoleName',
            filter: 'text',
        },
        {
            display: 'Role Desc',
            variable: 'RoleDesc',
            filter: 'text'
        }
    ];
    sorting: any = {
        column: 'FirstName',
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
                keys: ['RoleID'],
                action: DBOperation.update,
                ishide: this.isREADONLY
            },
            {
                title: 'X',
                keys: ["RoleID"],
                action: DBOperation.delete,
                ishide: this.isREADONLY
            }

        ];
        this.gridchks = [{
            title: ''
        }];

    }
    //Grid Vars end

    constructor(private fb: FormBuilder, private router: Router, private _roleService: BaseService, private dialog: MdDialog, private rolefilter: RoleFilterPipe) { }

    openDialog() {
        let dialogRef = this.dialog.open(ManageRoleComponent);
        dialogRef.componentInstance.dbops = this.dbops;
        dialogRef.componentInstance.modalTitle = this.modalTitle;
        dialogRef.componentInstance.modalBtnTitle = this.modalBtnTitle;
        dialogRef.componentInstance.role = this.role;

        dialogRef.afterClosed().subscribe(result => {
            if (result == "success") {
                this.LoadRoles();
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
        if (localStorage.getItem(Global.ADMIN_CURRENT_USER_SESSION) == undefined)
        {
            this.router.navigate(['login']);
        }
        this.LoadRoles();
    }
    LoadRoles(): void {
        this._roleService.get(Global.BASE_ROLE_ENDPOINT)
            .subscribe(roles => { this.roles = roles; this.initGridButton(); }
            );
    }

    addRole() {
        this.dbops = DBOperation.create;
        this.modalTitle = "Add New Role";
        this.modalBtnTitle = "Add";
        this.openDialog();
    }
    editRole(id: number) {
        this.dbops = DBOperation.update;
        this.modalTitle = "Edit Role";
        this.modalBtnTitle = "Update";
        this.role = this.roles.filter(x => x.RoleID == id)[0];
        this.openDialog();
    }
    deleteRole(id: number) {
        this.dbops = DBOperation.delete;
        this.modalTitle = "Confirm to Delete?";
        this.modalBtnTitle = "Delete";
        this.role = this.roles.filter(x => x.RoleID == id)[0];
        this.openDialog();
    }

    gridaction(gridaction: any): void {

        switch (gridaction.action) {
            case DBOperation.create:
                this.addRole();
                break;
            case DBOperation.update:
                this.editRole(gridaction.values[0].value);
                break;
            case DBOperation.delete:
                this.deleteRole(gridaction.values[0].value);
                break;
        }
    }
}