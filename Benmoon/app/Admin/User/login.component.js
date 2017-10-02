"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var base_service_1 = require("../../Service/base.service");
var router_1 = require("@angular/router");
var forms_1 = require("@angular/forms");
var global_1 = require("../../Shared/global");
require("rxjs/add/operator/map");
require("rxjs/add/operator/do");
require("rxjs/add/operator/catch");
var LoginComponent = (function () {
    function LoginComponent(fb, router, _userService) {
        this.fb = fb;
        this.router = router;
        this._userService = _userService;
        this.BtnTitle = "Login";
        this.indLoading = false;
        this.formErrors = {
            'LoginName': '',
            'Pwd': ''
        };
        this.validationMessages = {
            'LoginName': {
                'maxlength': 'Login Name cannot be more than 10 characters long.',
                'required': 'Login Name is required.'
            },
            'Pwd': {
                'maxlength': 'Password cannot be more than 10 characters long.',
                'required': 'Password is required.'
            }
        };
    }
    LoginComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.loginFrm = this.fb.group({
            LoginName: ['', [forms_1.Validators.required, forms_1.Validators.maxLength(10)]],
            Pwd: ['', [forms_1.Validators.required, forms_1.Validators.maxLength(10)]]
        });
        this.loginFrm.valueChanges.subscribe(function (data) { return _this.onValueChanged(data); });
        this.onValueChanged();
    };
    LoginComponent.prototype.onValueChanged = function (data) {
        if (!this.loginFrm) {
            return;
        }
        var form = this.loginFrm;
        for (var field in this.formErrors) {
            // clear previous error message (if any)
            this.formErrors[field] = '';
            var control = form.get(field);
            if (control && control.dirty && !control.valid) {
                var messages = this.validationMessages[field];
                for (var key in control.errors) {
                    this.formErrors[field] += messages[key] + ' ';
                }
            }
        }
    };
    LoginComponent.prototype.onSubmit = function (formData) {
        var _this = this;
        return this._userService.post(global_1.Global.LOGIN_ENDPOINT, formData.value).subscribe(function (data) {
            localStorage.setItem(global_1.Global.ADMIN_CURRENT_USER_SESSION, JSON.stringify(data));
            //localStorage.removeItem('currentUser');
            _this.router.navigate(['home']);
        });
    };
    return LoginComponent;
}());
LoginComponent = __decorate([
    core_1.Component({
        templateUrl: 'app/Admin/User/login.component.html',
    }),
    __metadata("design:paramtypes", [forms_1.FormBuilder, router_1.Router, base_service_1.BaseService])
], LoginComponent);
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map