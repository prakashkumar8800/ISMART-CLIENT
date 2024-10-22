import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';
import { HeaderService } from 'src/app/services/header.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-view-audit',
  templateUrl: './view-audit.component.html',
  styleUrls: ['./view-audit.component.scss']
})
export class ViewAuditComponent implements OnInit {

  @Input() viewaudit;

  name = '';
  shift_manager = '';
  audit_dt = '';
  resturant_manager = '';
  checklist_item = '';
  attachment_path = '';

  userForm: FormGroup;

  userdetail = []

  constructor(public utilService: UtilService,
    public apiService: ApiService,
    private fb: FormBuilder,
    private headerService: HeaderService,
    private modalService: NgbModal,
    private activeModal: NgbActiveModal,
    private toaster: ToastrService) { 

      this.userForm = this.fb.group({
        name: [''],
        shift_manager: [''],
        audit_dt: [''],
        resturant_name: [''],
        checklist_item: [''],
        attachment_path: ['']
      });
     }

  ngOnInit(): void {
    if (this.viewaudit != null && this.viewaudit != undefined) {
      this.name = this.viewaudit.name,
      this.shift_manager= this.viewaudit.shift_manager,
      this.resturant_manager = this.viewaudit.restaurant_manager
      this.audit_dt = this.viewaudit.audit_dt,
      this.checklist_item = this.viewaudit.cheklist_item,
      this.attachment_path = this.viewaudit.attachment_path
    }
    this.getUser()
    this.getChecklist();
    this.getAudit();
    console.log(this.viewaudit);
  }

  audits = [];

  getAudit(){
    this.audits = [];
    this.apiService.getAPI(this.apiService.BASE_URL + "audit/getAllAuditByList").then (( result) =>{
      console.log(result);
       if (result.status == true){
          this.audits = result.result
       }
    },(error) => {
      console.log(error.error.message);
      this.toaster.error(error.error.message);
    })
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

  onSubmit() {
    console.log('Form submitted:', this.userForm.value);
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
    console.log("user")
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

    if (this.checklist_item == '') {
      this.toaster.error("Please select service");
      return;
    }

    this.apiService.postAPI(this.apiService.BASE_URL + "assign/createAssign", {
      name: this.name,
      shift_manager: this.shift_manager,
      restaurant: this.resturant_manager,
      audit_dt: this.audit_dt,
      checklist_item: this.checklist_item,
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
