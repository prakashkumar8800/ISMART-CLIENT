import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { UpdateAuditComponent } from '../../modals/update-audit/update-audit.component';
import { ViewAuditComponent } from '../../modals/view-audit/view-audit.component';
import { ApiService } from '../../services/api.service';
import { HeaderService } from '../../services/header.service';
import { UtilService } from '../../services/util.service';
import { UpdateServiceComponent } from 'src/app/modals/update-service/update-service.component';
import { ViewServiceComponent } from 'src/app/modals/view-service/view-service.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AddAuditComponent } from 'src/app/modals/add-audit/add-audit.component';

@Component({
  selector: 'app-audit',
  templateUrl: './audit.component.html',
  styleUrls: ['./audit.component.scss']
})

export class AuditComponent implements OnInit {''

//  audits = {
//   name : '',
//   shift_manager : '',
//   audit_dt : '',
//   restaurant_manager : '',
//   checklist_item : ''
//  }
 audits=[];
 pendingAudits=[];
 scheduledAudits=[];
 completeTab = false;
 pendingTab = true;
 filteredAssignments = [];
 pendingAssigns=[];
 scheduledAssigns=[];

 currentDate:Date=new Date();

  p= 1;

  userForm: FormGroup;

  constructor(public utilService: UtilService,
    public apiService: ApiService,
    private fb: FormBuilder,
    private headerService: HeaderService,
    private modalService: NgbModal,
    private toaster: ToastrService) {

      this.userForm = this.fb.group({
        name: [''],
        shift_manager: [''],
        restaurant_manager: [''],
        audit_dt: [''],
        cheklist_name: [''],
        attachment_path: ['']
      });
  }

  ngOnInit(): void {
    this.getAudit();
    console.log("this is data",this.audits);
    this.getUser()
  }

  selectedType = 'pending';

  unSelectAllTab() {
    this.pendingTab = false;
    this.completeTab = false;
  }

  OrderList(type) {
    this.unSelectAllTab()
    this.selectedType = type;
    switch (type) {
      case 'pending':
        this.pendingTab = true;
        break;
      case 'complete':
        this.completeTab = true;
        break;
    }
  }

  userdetail = [];

  getUser(){
    this.userdetail = [];
    this.apiService.getAPI(this.apiService.BASE_URL + "user/getAllusers").then((result)=>{
      console.log(result)

      if(result.status){
        this.userdetail = result.result
        // this.pendingAudits=this.userdetail.filter(audit=>new Date(audit.audit_dt)<this.currentDate);
        // this.scheduledAudits=this.userdetail.filter(audit=>new Date(audit.audit_dt)>=this.currentDate);
        // console.log("Pending Audits:",this.pendingAudits);
        // console.log("Scheduled Audits:",this.scheduledAudits);
        console.log(this.userdetail)
      }

    }, (error)=>{
      console.log(error.error.message);
      this.toaster.error(error.error.message)
    })
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

  onSubmit(){ 
    console.log('Form submitted:', this.userForm.value);
  }

  uploadFile($event){
    console.log($event.target.files[0]);
    alert('File uploaded')
  }

  userAssign = []
  getAssign() {
    this.userAssign = [];
    this.apiService.getAPI(this.apiService.BASE_URL + "assign/getAllAssignByList").then((result) => {
      console.log(result)
      if (result.status == true) {
        this.userAssign = result.result
        this.filteredAssignments = this.userAssign;
        this.pendingAssigns=this.userAssign.filter(assign=>new Date(assign.ass_dt)<this.currentDate);
        this.scheduledAssigns=this.userAssign.filter(assign=>new Date(assign.ass_dt)>=this.currentDate);
        console.log(this.userAssign)
      }
    }, (error) => {
    })
  }

  getAudit(){
    this.apiService.getAPI(this.apiService.BASE_URL + "audit/getAllAuditByList").then (( result) =>{
      console.log(result);
       if (result.status == true){
          this.audits = result.result
          this.pendingAudits=this.audits.filter(audit=>new Date(audit.audit_dt)<this.currentDate);
          this.scheduledAudits=this.audits.filter(audit=>new Date(audit.audit_dt)>=this.currentDate);
          console.log("Pending Audits:",this.pendingAudits);
          console.log("Scheduled Audits:",this.scheduledAudits);
          console.log("current data",this.currentDate);
          console.log("audits date",new Date(this.audits[0].audit_dt))
          console.log("all my audits list",this.audits);
       }
    },(error) => {
      console.log(error.error.message);
      this.toaster.error(error.error.message);
    })
  }

  calculateScore() {
    let completedAudits = this.audits.filter(audit => {
      let auditDate = new Date(audit.audit_dt);
      let today = new Date();
      // Check if the audit was completed today
      return auditDate.toDateString() === today.toDateString();
    });

    // For example, set score based on the number of completed audits
    this.score = completedAudits.length * 10; // Arbitrary scoring logic (e.g., 10 points per completed audit)
  }

  viewAudit(item: any) {
    let modal = this.modalService.open(ViewAuditComponent, {
      backdrop: 'static',
      size: 'xl',
      keyboard: false,
      centered: true,
      windowClass: 'customm-modal',
    });
    modal.componentInstance.viewaudit = item;
  }

  addAudit() {
    let modal = this.modalService.open(AddAuditComponent, {
      backdrop: 'static',
      size: 'xl',
      keyboard: false,
      centered: true,
      windowClass: 'customm-modal',
    });
  }

}
