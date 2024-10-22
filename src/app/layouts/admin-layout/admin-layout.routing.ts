import { Routes } from '@angular/router';

// import { MapsComponent } from '../../pages/maps/maps.component';
import { FaqModalComponent } from '../../modals/faq-modal/faq-modal.component';
import { UserComponent } from '../../pages/user/user.component';
import { AuditComponent } from '../../pages/audit/audit.component';
import { UserRoleComponent } from '../../pages/user-role/user-role.component';
import { AssignComponent } from 'src/app/pages/assign/assign.component';
import { CheckListComponent } from 'src/app/pages/check-list/check-list.component';
import { RestaurantComponent } from 'src/app/pages/restaurant/restaurant.component';

export const AdminLayoutRoutes: Routes = [

    { path: 'audit',       component: AuditComponent },
    { path: 'assign',       component: AssignComponent },
    { path: 'check-list',       component: CheckListComponent },
    { path: 'user-role',       component: UserRoleComponent },
    { path: 'user',       component: UserComponent },
    { path: 'faq-modal',       component: FaqModalComponent },
    { path: 'restaurant', component:RestaurantComponent },
];
