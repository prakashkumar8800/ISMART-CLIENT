import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from './navbar.component';



@NgModule({
  declarations: [NavbarComponent],
  imports: [
    CommonModule, RouterModule, NgbModule, FormsModule
  ],
  exports: [NavbarComponent]
})
export class NavbarModule { }
