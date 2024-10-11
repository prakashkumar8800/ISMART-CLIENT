import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SlickCarouselModule } from 'ngx-slick-carousel';

import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { CommonModule, DatePipe } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { PopupalertComponent } from './modals/popupalert/popupalert.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
// import { AngularFirestore, AngularFirestoreCollection } from "@angular/fire/firestore";
import { NavbarModule } from './shared/navbar/navbar.module';

import { AngularEditorModule } from '@kolkov/angular-editor';
import { LoaderComponent } from './modals/loader/loader.component';

import { UpdateUserComponent } from './modals/update-user/update-user.component';
import { UpdateRoleComponent } from './modals/update-role/update-role.component';
import { ViewRoleComponent } from './modals/view-role/view-role.component';
import { ViewAuditComponent } from './modals/view-audit/view-audit.component';
import { UpdateAuditComponent } from './modals/update-audit/update-audit.component';
import { UpdateServiceComponent } from './modals/update-service/update-service.component';
import { ViewServiceComponent } from './modals/view-service/view-service.component';
import { ToastrModule } from 'ngx-toastr';
import { UpdateCheckListComponent } from './modals/update-check-list/update-check-list.component';
import { AddUserComponent } from './modals/add-user/add-user.component';
import { AddRoleComponent } from './modals/add-role/add-role.component';
import { AddChecklistComponent } from './modals/add-checklist/add-checklist.component';
import { AddAssignComponent } from './modals/add-assign/add-assign.component';
import { AddRestaurantComponent } from './modals/add-restaurant/add-restaurant.component';
import { UpdateRestaurantComponent } from './modals/update-restaurant/update-restaurant.component';
// import { OrderModule } from 'ngx-order-pipe';
// import { OrderByModule } from 'ng-orderby-pipe';

// import { NgxEditorModule } from 'ngx-editor';


@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ComponentsModule,
    CommonModule,
    SlickCarouselModule,
    BrowserModule,
    NgbModule,
    RouterModule,
    AppRoutingModule,
    NgxPaginationModule,
    NgMultiSelectDropDownModule,
    NavbarModule,
    // OrderModule,
    AngularEditorModule,
    ToastrModule.forRoot()
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    AuthLayoutComponent,
    PopupalertComponent,
    LoaderComponent,
    UpdateUserComponent,
    UpdateRoleComponent,
    ViewRoleComponent,
    ViewAuditComponent,
    UpdateAuditComponent,
    UpdateServiceComponent,
    ViewServiceComponent,
    UpdateCheckListComponent,
    AddUserComponent,
    AddRoleComponent,
    AddChecklistComponent,
    AddAssignComponent,
    AddRestaurantComponent,
    UpdateRestaurantComponent,
    
    
  ],
  providers: [DatePipe, 
    // OrderByModule,
    ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
function getFirestore() {
  throw new Error('Function not implemented.');
}

function provideFirebaseApp(arg0: () => any): any[] | import("@angular/core").Type<any> | import("@angular/core").ModuleWithProviders<{}> {
  throw new Error('Function not implemented.');
}

function initializeApp(firebase: any): any {
  throw new Error('Function not implemented.');
}

function provideFirestore(arg0: () => void): any[] | import("@angular/core").Type<any> | import("@angular/core").ModuleWithProviders<{}> {
  throw new Error('Function not implemented.');
}

