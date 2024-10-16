import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';
import { HeaderService } from 'src/app/services/header.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-add-audit',
  templateUrl: './add-audit.component.html',
  styleUrls: ['./add-audit.component.scss']
})
export class AddAuditComponent implements OnInit {

  @Input() audit;

  name = '';
  shift_manager = '';
  audit_dt = '';
  resturant_manager = '';
  checklist_name = '';
  attachment_path = '';

  userdetail = []

  constructor(public utilService: UtilService,
    public apiService: ApiService,
    private headerService: HeaderService,
    private modalService: NgbModal,
    private activeModal: NgbActiveModal,
    private toaster: ToastrService) { }

  ngOnInit(): void {
    if (this.audit != null && this.audit != undefined) {
      this.name = this.audit.name,
      this.shift_manager= this.audit.shift_manager,
      this.resturant_manager = this.audit.restaurant_manager
      this.audit_dt = this.audit.audit_dt,
      this.checklist_name = this.audit.cheklist_name,
      this.attachment_path = this.audit.attachment_path
    }
    this.getUser()
    this.getChecklist();
    console.log(this.audit);
  }

  getUser(){
    this.apiService.getAPI(this.apiService.BASE_URL + "user/getAllusers").then((result)=>{
      console.log(result)
      if(result.status){
        this.userdetail = result.result
        console.log(this.userdetail)
      }
    }, (error)=>{
      console.log(error.error.message);
      this.toaster.error(error.error.message)
    })
  }


  close() {
    this.activeModal.close()
  }

  checklist=[];

  getChecklist() {
    this.apiService.getAPI(this.apiService.BASE_URL + "checklist/getAllCheckList").then ((result) =>{
      if (result.status){
       this.checklist = result.result
       console.log(this.checklist)
      }
    }) 
  }

  add() {
    if (this.name == '') {
      this.toaster.error("Please enter name");
      return;
    }

     if (this.shift_manager == '') {
       this.toaster.error("please enter restaurant")
   }

    if (this.audit_dt == '') {
      this.toaster.error("Please enter auditor name");
      return;
    }

    if (this.resturant_manager == '') {
      this.toaster.error("Please enter assign date");
      return;
    }

    if (this.checklist_name == '') {
      this.toaster.error("Please select service");
      return;
    }

    this.apiService.postAPI(this.apiService.BASE_URL + "assign/createAssign", {
      name: this.name,
      shift_manager: this.shift_manager,
      restaurant: this.resturant_manager,
      audit_dt: this.audit_dt,
      checklist_name: this.checklist_name,
      ass_dt: this.attachment_path
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
