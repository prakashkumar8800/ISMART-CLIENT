import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthServiceService } from 'src/app/auth-service.service';
import { ApiService } from 'src/app/services/api.service';
import { UtilService } from 'src/app/services/util.service';


@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss']
})
export class UserLoginComponent implements OnInit {
  //  formGroup:FormGroup
  
  // error:string='';
  // constructor(
  //     public utilService: UtilService,
  //     public apiService: ApiService,
  //     private router: Router,
  //     private toaster: ToastrService,
  //     private fb: FormBuilder
  // ){}
  //  constructor(private authService:AuthServiceService,
  //   private router: Router,
  //  ){}
  ngOnInit() {
    //  this.initForm();
  }
  // Hardcoded login credentials
  readonly validEmail = 'admin@gmail.com';
  readonly validPassword = '654321';

  constructor(
      private router: Router,
      private toaster: ToastrService
  ) {}

  onSubmit(form: any) {
      if (form.valid) {
          const { email, password } = form.value;

          if (email === this.validEmail && password === this.validPassword) {
              this.toaster.success('Login successful!', 'Success');
              this.router.navigateByUrl('/audit'); // Navigate to audit page after successful login
          } else {
              this.toaster.error('Invalid email or password', 'Error');
              alert("Wrong Credentials");
          }
      } else {
          this.toaster.error('Please fill in all required fields', 'Error');
          alert('Please Enter the details');
      }
  }
  // initForm(){
  //   this.formGroup=new FormGroup({
  //     username:new FormControl('', Validators.required),
  //     password:new FormControl('', Validators.required)
  //   })
  // }

  // loginProcess(){
  //   if(this.formGroup.valid){
  //     this.authService.login(this.formGroup.value).subscribe(
  //       result=>{
  //         if(result.success){
  //           console.log(result);
  //           alert(result.message);
  //         }else{
  //           console.log(result.message);
  //         }
  //       }
  //     )
  //   }
  // }
  // loginProcess() {
  //   // Define the hard-coded credentials
  //   const hardCodedEmail = 'test@example.com';
  //   const hardCodedPassword = '123456';
  //   console.log("the credentials are",this.formGroup.value);
  
  //   // Check if form values match the hard-coded credentials
  //   if (this.formGroup.valid) {
  //     const { email, password } = this.formGroup.value;
  
  //     if (email === hardCodedEmail && password === hardCodedPassword) {
  //       // If credentials are correct, simulate login success
  //       console.log('Login successful');
  //       alert('Login successful!');
  //       this.router.navigateByUrl("/audit");
  //       // Perform additional success actions, like navigation, here
  //     } else {
  //       // If credentials are incorrect, show error message
  //       console.log('Invalid email or password');
  //       alert('Invalid email or password');
  //     }
  //   }
  // }



  // onSubmit(form: NgForm): void {
  //   if (form.valid) {
  //     const { email, password } = form.value;
  //     this.login(email, password);
  //   }
  // }

  
  // login(email: string, password: string): void {
  //   if (email === '') {
  //     this.toaster.error("Please enter email");
  //     return;
  //   }
  //   if (!this.utilService.validateEmail(email)) {
  //     this.toaster.error("Please enter valid email");
  //     return;
  //   }
  //   if (password === '') {
  //     this.toaster.error("Please enter password");
  //     return;
  //   }

    // this.authService.login(email, password).subscribe(
    //   (result) => {
    //     if (result.status) {
    //       if (result.result.type === 'user') {
    //         this.utilService.setItem(this.utilService.USER_LOGIN, "1");
    //         this.utilService.setItem(this.utilService.USER_PROFILE, JSON.stringify(result.result.user));
    //         this.utilService.setItem(this.utilService.USER_TYPE, 'user');
    //         this.router.navigateByUrl("/audit");
    //         this.toaster.success("Login successful!");
    //       } else {
    //         this.toaster.error("Invalid user type");
    //       }
    //     } else {
    //       this.toaster.error(result.message);
    //     }
    //   },
    //   (error) => {
    //     console.error("Login error:", error);
    //     this.toaster.error(error.error.message || "An error occurred during login");
    //   }
    // )}    
}