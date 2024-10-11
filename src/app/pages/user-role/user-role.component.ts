import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { UpdateRoleComponent } from '../../modals/update-role/update-role.component';
import { ViewRoleComponent } from '../../modals/view-role/view-role.component';
import { ApiService } from '../../services/api.service';
import { HeaderService } from '../../services/header.service';
import { UtilService } from '../../services/util.service';
import { AddRoleComponent } from 'src/app/modals/add-role/add-role.component';

@Component({
  selector: 'app-user-role',
  templateUrl: './user-role.component.html',
  styleUrls: ['./user-role.component.scss']
})
export class UserRoleComponent implements OnInit {

  constructor(public utilService: UtilService,
    public apiService: ApiService,
    private headerService: HeaderService,
    private modalService: NgbModal,
    private toaster: ToastrService) { }

    userRoles = []

  ngOnInit(): void {
    this.getUserDetails();
  }

  getUserDetails(){
    this.userRoles = []
    this.apiService.getAPI(this.apiService.BASE_URL + "user-type/getAllUserRole").then((result)=>{
      console.log(result)
      if(result.status == true){
        this.userRoles = result.result
        console.log(this.userRoles)
      }
    }, (error)=> {

    })
  }

  updaterole(item: any) {
    console.log(item)
    let modal = this.modalService.open(UpdateRoleComponent, {
      backdrop: 'static',
      size: 'xl',
      keyboard: false,
      centered: true,
      windowClass: 'customm-modal',
   })
   modal.result.then((result)=>{
    this.getUserDetails()
   });
   modal.componentInstance.user_role = item;
  }

  addrole() {
    let modal = this.modalService.open(AddRoleComponent, {
      backdrop: 'static',
      size: 'xl',
      keyboard: false,
      centered: true,
      windowClass: 'customm-modal',
   })
    modal.result.then((result)=>{
    this.getUserDetails()
   });
  }
}
