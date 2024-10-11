import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';
import { HeaderService } from 'src/app/services/header.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-add-role',
  templateUrl: './add-role.component.html',
  styleUrls: ['./add-role.component.scss']
})
export class AddRoleComponent implements OnInit {

 @Input() userRole;

  name = '';
  total_user = '';
  status = '1';

  constructor( public utilService: UtilService,
    public apiService: ApiService,
    private headerService: HeaderService,
    private modalService: NgbModal,
    private activeModal: NgbActiveModal,
    private toaster: ToastrService) { }

  ngOnInit(): void {
    if(this.userRole != null && this.userRole != undefined){
        
      this.name = this.userRole.name,
      this.total_user = this.total_user,
      this.status = this.userRole.status
    }
  }

  close() {
    this.activeModal.close()
  }

  add() {

    if (this.name == '') {
      this.toaster.error("Please enter name");
      return;
    }
    if (this.total_user == ''){
      this.toaster.error("please enter value");
    }

    this.apiService.postAPI(this.apiService.BASE_URL + "user-type/addUserRole", {
      name: this.name,
      total_user: this.total_user
    }).then((result) => {
      if (result.status) {
        this.activeModal.close()
      } else {
        alert(result.message)
      }
    }, (error) => {
      console.log(error.error.message);
      alert(error.error.message)
    })
  }

}
