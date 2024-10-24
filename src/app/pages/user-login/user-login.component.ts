import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss']
})
export class UserLoginComponent implements OnInit {

  email = '';
  password = '';

  constructor(
      public utilService: UtilService,
      public apiService: ApiService,
      private router: Router,
      private toaster: ToastrService
  ) {
  }

  ngOnInit() {
      document.querySelector('body').setAttribute('themebg-pattern', 'theme1');
  }

  onSubmit(Form){
    if(Form.valid){
       console.log('Form Submitted', Form.value);
       this.router.navigateByUrl("/assign");
    }else{
      console.log("Form is Invalid");
    }
  }

  // userSignin() {
  //     if (this.email == '') {
  //         this.toaster.error("Please enter email");
  //         return;
  //     }
  //     if (!this.utilService.validateEmail(this.email)) {
  //         this.toaster.error("Please enter valid email");
  //         return;
  //     }
  //     if (this.password == '') {
  //         this.toaster.error("Please enter password");
  //         return;
  //     }

  //     let url = this.apiService.BASE_URL + 'user/adminLogin';
  //     let postData = {
  //         email: this.email,
  //         password: this.password
  //     }
  //     this.apiService.postAPI(url, postData).then((result) => {
  //         if (result.status) {
  //             if (result.result.type == 'user') {
  //                 this.utilService.setItem(this.utilService.USER_LOGIN, "1");
  //                 this.utilService.setItem(this.utilService.USER_PROFILE, JSON.stringify(result.result.user));
  //                 this.email = ''
  //                 this.password = ''
  //                 this.utilService.setItem(this.utilService.USER_TYPE, 'user');
  //                 this.router.navigateByUrl("/assign");
  //             }
  //         } else {
  //             this.toaster.error(result.message);
  //         }
  //     }, (error) => {
  //         console.log("error:-" + JSON.stringify(error));
  //         this.toaster.error(error.error.message);
  //     })

  // }

}
