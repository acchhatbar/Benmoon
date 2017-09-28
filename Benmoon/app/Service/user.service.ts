import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { BaseService } from "./base.service";

@Injectable()
export class UserService extends BaseService {
    
    //verifyLogin(url: string, loginName: string, pwd: string): Observable<any> {
    //    let body = JSON.stringify({ loginname: loginName, pwd: pwd });
    //    let headers = new Headers({ 'Content-Type': 'application/json' });
    //    let options = new RequestOptions({ headers: headers });

    //}
}