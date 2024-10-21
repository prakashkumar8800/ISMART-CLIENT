import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';
import { HeaderService } from 'src/app/services/header.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {

  @Input() details;

  name = '';
  password = '';
  Cpass = '';
  phone :string= '';
  email= '';
  role = '1';
  status = '1';
  
  userForm: FormGroup
    // name: new name

  constructor( public utilService: UtilService,
    public apiService: ApiService,
    private headerService: HeaderService,
    private modalService: NgbModal,
    private activeModal: NgbActiveModal,
    private toaster: ToastrService,
    private fb: FormBuilder
  ) 

    {this.userForm = this.fb.group({

      // name: [
      //   '',[
      //     Validators.required,
      //     Validators.name
      //   ]
      // ],
      // email: [
      //   '', 
      //   [
      //     Validators.required,  // Email is required
      //     Validators.email      // Validate email format
      //   ]
      // ],
      // phone: [
      //   '', 
      //   [
      //     Validators.required,  // Phone number is required
      //     Validators.pattern('^[0-9]{10}$')  // Regex for 10-digit phone number
      //   ]
      // ],
    //   password: [
    //     '', 
    //     [
    //       Validators.required,
    //       Validators.minLength(8), 
    //       Validators.pattern('(?=.*[0-9])(?=.*[a-zA-Z]).{8,}')  
    //     ]
    //   ],
    //   Cpassword: ['', Validators.required]
    // 
    }, 
    // { validator: this.passwordMatchValidator}
    ) 
  }

  // passwordMatchValidator(form: AbstractControl): { [key: string]: boolean } | null {
  //   const password = form.get('password')?.value;
  //   const Cpassword = form.get('Cpassword')?.value;
  //   if (password !== Cpassword) {
  //     form.get('Cpassword')?.setErrors({ passwordMismatch: true });
  //     return { passwordMismatch: true };
  //   }
  //   return null;
  // }

  // get email() { return this.userForm.get('email'); }
  // get phone() { return this.userForm.get('phone'); }
  // get password() { return this.userForm.get('password'); }

  ngOnInit(): void {
    if (this.details != null && this.details != undefined) {
      this.name = this.details.name.validator.required();
      this.email = this.details.email.validator.required(this.email);
      this.phone = this.details.phone.validator.required();
      this.restaurant = this.details.restaurant,
      this.role = this.details.role;
      this.status = this.details.status;
    }
    this.getUserDetails();
    this.getRestaurant();
  }

  // submit() {
  //   if (this.userForm.valid) {
  //     console.log('Form Data:', this.userForm.value);
  //   } else {
  //     console.log('Form is invalid');
  //   }
  // }

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

  restaurant = '';
  restaurants=[];

  getRestaurant() {
    this.apiService.getAPI(this.apiService.BASE_URL + "restaurant/getAllRestaurants").then((result) => {
      console.log(result)
      if (result.status == true) {
        //  this.restaurants = result.result;
            this.restaurants = result.result.filter( x=> 
              x.status == 1 ?x.name:'' 
            );
          }
         console.log(this.restaurants);
      }
    ,error => {
      console.error('Error fetching data', error);
    }
  );
  }

  submit(form: any) {
    // Check if the form is valid before proceeding
    if (form.valid) {
      console.log('Form Submitted!', form.value);
    } else {
      console.log('Form is invalid');
    }
  }

  add() {
    if (this.name == '') {
      this.toaster.error("Please enter name");
      return;
    }
    if(this.restaurant== ''){
      this.toaster.error("Please select the restaurant");
      return;
    }
    if (this.email == '') {
      this.toaster.error("Please enter address");
      return;
    }
    if (this.phone == '') {
      this.toaster.error("Please enter Phone");
      return;
    }
    if (this.password == '') {
      this.toaster.error("Please enter password");
      return;
    }
    if (this.password != this.Cpass) {
      this.toaster.error("password and confirm password do not match");
      return;
    }
        this.apiService.postAPI(this.apiService.BASE_URL + 'user/addUser',{
        name: this.name,
        email: this.email,
        restaurant:this.restaurant,
        phone: this.phone,
        password: this.password,
        role: this.role,
        status: this.status,
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
