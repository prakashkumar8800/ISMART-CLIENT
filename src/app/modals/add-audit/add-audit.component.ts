import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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

  @Input() auditdetail;

    name : ''
    shift_manager: '';
    audit_dt : ''
    restaurant_manager: '';
    checklist_item : ''
    attachment_path : ''

  userForm: FormGroup

  userdetail = []

  constructor(public utilService: UtilService,
    public apiService: ApiService,
    private headerService: HeaderService,
    private fb: FormBuilder,
    private modalService: NgbModal,
    private activeModal: NgbActiveModal,
    private toaster: ToastrService) { 

      this.userForm = this.fb.group({});
    }

  ngOnInit(): void {
    if (this.auditdetail != null && this.auditdetail != undefined) {
      this.name = this.auditdetail.name,
      this.shift_manager= this.auditdetail.shift_manager,
      this.restaurant_manager = this.auditdetail.restaurant_manager,
      this.audit_dt = this.auditdetail.audit_dt,
      this.checklist_item = this.auditdetail.cheklist_item,
      this.attachment_path = this.auditdetail.attachment_path
    }
    this.getUser()
    this.getChecklist();
    console.log(this.auditdetail);
  }

  getUser(){
    this.userdetail = [];
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
    this.checklist=[];
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
       this.toaster.error("please select restaurant")
    }

    if (this.audit_dt == '') {
      this.toaster.error("Please select datetime");
      return;
    }

    if (this.restaurant_manager == '') {
      this.toaster.error("Please select restaurant manager");
      return;
    }

    if (this.checklist_item == '') {
      this.toaster.error("Please select service");
      return;
    }

    this.apiService.postAPI(this.apiService.BASE_URL + "audit/createAudit", {
      name: this.name,
      shift_manager: this.shift_manager,
      restaurant_manager: this.restaurant_manager,
      audit_dt: this.audit_dt,
      checklist_item: this.checklist_item,
      attachment_path: this.attachment_path
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
