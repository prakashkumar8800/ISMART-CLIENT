import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../../services/api.service';
import { HeaderService } from '../../services/header.service';
import { UtilService } from '../../services/util.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-update-role',
  templateUrl: './update-role.component.html',
  styleUrls: ['./update-role.component.scss']
})
export class UpdateRoleComponent implements OnInit {

  @Input() user_role;

  name = '';
  status = '1';

  userForm: FormGroup;


  constructor( public utilService: UtilService,
    public apiService: ApiService,
    private headerService: HeaderService,
    private fb: FormBuilder,
    private modalService: NgbModal,
    private activeModal: NgbActiveModal,
    private toaster: ToastrService) { 

      this.userForm = this.fb.group({
        name: [''],
      });
    }

  ngOnInit(): void {
    if (this.user_role != null && this.user_role != undefined) {
      this.name = this.user_role.name;
      this.status = this.user_role.status;
    }
    console.log(this.user_role);
  }

  onSubmit(){
    console.log('Form submitted:', this.userForm.value);
  }

  update() { 
  
    if (this.name == '') {
      this.toaster.error("Please enter name");
      return;
    }

    // if(this.status == ''){
    //   this.toaster.error("please select value")
    // }

    this.apiService.postAPI(this.apiService.BASE_URL + "user-type/updateUserRole", {
      name: this.name,
      status: this.user_role.status,
      id:this.user_role.id
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

  close() {
    this.activeModal.close()
  }

}
