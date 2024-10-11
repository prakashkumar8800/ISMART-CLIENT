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

@Component({
  selector: 'app-audit',
  templateUrl: './audit.component.html',
  styleUrls: ['./audit.component.scss']
})
export class AuditComponent implements OnInit {

 audits = {
  name : '',
  shift_manager : '',
  audit_dt : '',
  resturant_manager : '',
  checklist_item : ''
 }

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
        resturant_manager: [''],
        audit_dt: [''],
        cheklist_item: ['']
      });
     }

  ngOnInit(): void {
    this.getAudit();
    console.log("this is data",this.audits);
    this.getUser()
  }

  userdetail = [];

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

  onSubmit(){ 
    console.log('Form submitted:', this.userForm.value);
  }

  uploadFile($event){
    console.log($event.target.files[0]);
    alert('File uploaded')
  }


  getAudit(){
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

}
