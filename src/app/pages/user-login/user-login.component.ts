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


export class UserLoginComponent {
    username = '';
    password = '';
  
    
    constructor(private authService: AuthServiceService,private router: Router,private apiService: ApiService,  private toaster: ToastrService,) {}
   
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
    
    onSubmit(form: any) {
      const { email, password } = form.value;
      // this.email = email;
      // this.password = password;
  
      // Fetch all users and check if any user's credentials match
      if(email==="admin@gmail.com" && password==="12345"){
        this.authService.login({ username: email, password: password }).subscribe(
          response => {
          //   if (response.status === 201 || response.status === 200) {  
          //   console.log('Logged in successfully');
          // //   this.router.navigate(['/audit']); // or your protected route
          //   this.router.navigateByUrl('/audit');
          //   }else{
          //     console.log("Yo yo Honey singh");
          //   }
          console.log('Logged in successfully');
          this.router.navigate(['/assign']); // or your protected route
          },
          error => {
            console.error('Login failed', error);
          }
        );
      }else{
      this.authService.getUser().subscribe(
        (users) => {
          const validUser = users.result.find(
            (user: any) => user.email === email && user.password === password
          );
  
          if (validUser) {
            console.log('Login successful');
            this.router.navigate(['/audit']); // Redirect to /audit if credentials match
          } else {
            console.log('Invalid email or password');
            alert("Wrong Credentials");
          }
          //  console.log(users.result);
        },
        (error) => {
          console.error('Error fetching users:', error);
        }
      );}
    }

}




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


  // Hardcoded login credentials
//   readonly validEmail = 'admin@gmail.com';
//   readonly validPassword =
//   onSubmit(form: any) {
//       if (form.valid) {
//           const { email, password } = form.value;


//           if (email === this.validEmail && password === this.validPassword) {
//               this.toaster.success('Login successful!', 'Success');
//               this.router.navigateByUrl('/audit'); // Navigate to audit page after successful login
//           } else {
//               this.toaster.error('Invalid email or password', 'Error');
//               alert("Wrong Credentials");
//           }
//       } else {
//           this.toaster.error('Please fill in all required fields', 'Error');
//           alert('Please Enter the details');
//       }
//   }