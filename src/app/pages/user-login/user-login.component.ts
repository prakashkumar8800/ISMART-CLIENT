import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';
import { UtilService } from 'src/app/services/util.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss']
})
export class UserLoginComponent implements OnInit {

  
  error:string='';
  constructor(
      public utilService: UtilService,
      public apiService: ApiService,
      private router: Router,
      private toaster: ToastrService,
      private authService: AuthService
  ){}

  ngOnInit() {
      document.querySelector('body').setAttribute('themebg-pattern', 'theme1');
  }

  onSubmit(form: NgForm): void {
    if (form.valid) {
      const { email, password } = form.value;
      this.login(email, password);
    }
  }

  
  login(email: string, password: string): void {
    if (email === '') {
      this.toaster.error("Please enter email");
      return;
    }
    if (!this.utilService.validateEmail(email)) {
      this.toaster.error("Please enter valid email");
      return;
    }
    if (password === '') {
      this.toaster.error("Please enter password");
      return;
    }

    this.authService.login(email, password).subscribe(
      (result) => {
        if (result.status) {
          if (result.result.type === 'user') {
            this.utilService.setItem(this.utilService.USER_LOGIN, "1");
            this.utilService.setItem(this.utilService.USER_PROFILE, JSON.stringify(result.result.user));
            this.utilService.setItem(this.utilService.USER_TYPE, 'user');
            this.router.navigateByUrl("/assign");
            this.toaster.success("Login successful!");
          } else {
            this.toaster.error("Invalid user type");
          }
        } else {
          this.toaster.error(result.message);
        }
      },
      (error) => {
        console.error("Login error:", error);
        this.toaster.error(error.error.message || "An error occurred during login");
      }
    )}    }
