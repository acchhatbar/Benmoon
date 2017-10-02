import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './admin/home/home.component';
import { LoginComponent } from './admin/user/login.component';
import { LogoutComponent } from './admin/user/logout.component';
import { RoleComponent } from './admin/user/role.component';

const appRoutes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'home', component: HomeComponent },
    { path: 'logout', component: LogoutComponent },
    { path: 'role', component: RoleComponent }
];

export const routing: ModuleWithProviders =
    RouterModule.forRoot(appRoutes);