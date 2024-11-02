import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { UpdateRoleComponent } from '../../modals/update-role/update-role.component';
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
    userdetail=[]
  ngOnInit(): void {
    this.getUserDetails();
    this.getUser();
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
  getUserCountByRole(role: string): number {
    return this.userdetail.filter((x) => x.role === role).length;
  }
  getUser(){
    this.apiService.getAPI(this.apiService.BASE_URL + "user/getAllusers").then((result)=>{
      //console.log(result)
      if(result.status){
        this.userdetail = result.result
        console.log(this.userdetail);
      }
      console.log("Jay Shree Ram",this.userdetail);
    }, (error)=>{
      console.log(error.error.message);
      this.toaster.error(error.error.message)
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
  // count:number;
  // updateUserCounts(): void {
  //   this.userRoles.forEach(role => {
  //     // Filter the users by role and count
  //     role.Total_users = this.usertable.filter(user => user.role === role.name).length;
  //   });
  // }

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
