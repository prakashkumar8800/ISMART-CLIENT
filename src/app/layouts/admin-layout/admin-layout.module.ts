import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ClipboardModule } from 'ngx-clipboard';

import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
// import { MapsComponent } from '../../pages/maps/maps.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import { NgbModule, NgbPagination, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { FaqModalComponent } from '../../modals/faq-modal/faq-modal.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { ReportComponent } from 'src/app/pages/report/report.component';
import { AssignComponent } from 'src/app/pages/assign/assign.component';
import { CheckListComponent } from 'src/app/pages/check-list/check-list.component';
import { AuditComponent } from 'src/app/pages/audit/audit.component';
import { UserComponent } from 'src/app/pages/user/user.component';
import { UserRoleComponent } from 'src/app/pages/user-role/user-role.component';
import { RestaurantComponent } from 'src/app/pages/restaurant/restaurant.component';

// import { ToastrModule } from 'ngx-toastr';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    SlickCarouselModule,
    ClipboardModule,
    NgxPaginationModule,
    NgMultiSelectDropDownModule
  ],
  declarations: [
    DashboardComponent,
    // TablesComponent,
    // IconsComponent,
    FaqModalComponent,
    ReportComponent,
    AssignComponent,
    CheckListComponent,
    AuditComponent,
    UserComponent,
    UserRoleComponent,
    RestaurantComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class AdminLayoutModule {}
