import { Component, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../../services/api.service';
import { HeaderService } from '../../services/header.service';
import { UtilService } from '../../services/util.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss']
})
export class UpdateUserComponent implements OnInit {

  @Input() details;

     name : '';
     password : '';
     Cpass : '';
     phone : '';
     email : '';
     role : '1';
     status : '1';

     userForm: FormGroup;



  constructor( public utilService: UtilService,
    public apiService: ApiService,
    private headerService: HeaderService,
    private fb: FormBuilder,
    private modalService: NgbModal,
    private activeModal: NgbActiveModal,
    private toaster: ToastrService) 

    { this.userForm = this.fb.group({
      name: [''],
      email: [''],
      phone: [''],
      role: [''],
    }); }

  ngOnInit(): void {
    if (this.details != null && this.details != undefined) {
      this.name = this.details.name;
      this.email = this.details.email;
      this.phone = this.details.phone;
      this.role = this.details.role;
      this.status = this.details.status;
    }

    console.log(this.details)
  }

  userRoles = []

  getUserDetails(){
    this.apiService.getAPI(this.apiService.BASE_URL + "user-type/getAllUserRole").then((result)=>{
      console.log(result)
      if(result.status == true){
        this.userRoles = result.result
        console.log(this.userRoles)
      }
    }, (error)=> {

    })
  }

  onSubmit() {
    console.log('Form submitted:', this.userForm.value);
  }


  update() {
    if (this.name == '') {
      this.toaster.error("Please enter name");
      return;
    }

    if (this.email == '') {
      this.toaster.error("Please enter name");
      return;
    }
    if (this.phone == '') {
      this.toaster.error("Please enter name");
      return;
    }

        this.apiService.postAPI(this.apiService.BASE_URL + 'user/updateUser',{
          name: this.details.name,
          email: this.details.email,
          phone: this.details.phone,
          password: this.details.password,
          role: this.details.role,
          status: this.details.status,
          id: this.details.id
        }).then((result) => {
            if (result.status) {
                this.activeModal.close();
            } else {
                this.toaster.error(result.message)
            }
        }, (error) => {
            console.log(error.error.message);
            this.toaster.error(error.error.message)
        })
  }

  close() {
    this.activeModal.close()
  }
}
