import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//import { UserComponent } from './components/user.component';
import { LoginComponent } from './admin/user/login.component';

const appRoutes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent }//,
    //{ path: 'user', component: UserComponent }
];

export const routing: ModuleWithProviders =
    RouterModule.forRoot(appRoutes);