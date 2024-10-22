import { Routes } from '@angular/router';

import { LoginComponent } from '../../pages/login/login.component';
import { UserLoginComponent } from 'src/app/pages/user-login/user-login.component';

export const AuthLayoutRoutes: Routes = [
    { path: 'login',          component: LoginComponent },
    { path: 'user-login',          component: UserLoginComponent },
];
