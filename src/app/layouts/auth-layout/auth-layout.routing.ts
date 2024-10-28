import { Routes } from '@angular/router';

import { UserLoginComponent } from 'src/app/pages/user-login/user-login.component';

export const AuthLayoutRoutes: Routes = [
    { path: 'user-login',          component: UserLoginComponent },
];
