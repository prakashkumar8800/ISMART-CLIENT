import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../../services/api.service';
import { EmitEvent, Events, HeaderService } from '../../services/header.service';
import { UtilService } from '../../services/util.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
 
 
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

    signin() {
        console.log("Here are my credtials",this.email,this.password);
        if (this.email == '') {
            this.toaster.error("Please enter email");
            return;
        }
        if (!this.utilService.validateEmail(this.email)) {
            this.toaster.error("Please enter valid email");
            return;
        }
        if (this.password == '') {
            this.toaster.error("Please enter password");
            return;
        }

        let url = this.apiService.BASE_URL + 'user/adminLogin';
        let postData = {
            email: this.email,
            password: this.password
        }
        this.apiService.postAPI(url, postData).then((result) => {
            if (result.status) {
                if (result.result.type == 'admin') {
                    this.utilService.setItem(this.utilService.USER_LOGIN, "1");
                    this.utilService.setItem(this.utilService.USER_PROFILE, JSON.stringify(result.result.user));
                    this.email = ''
                    this.password = ''
                    this.utilService.setItem(this.utilService.USER_TYPE, 'admin');
                    this.router.navigateByUrl("/audit");
                } else if (result.result.type == 'store_manager') {
                    this.utilService.setItem(this.utilService.USER_LOGIN, "1");
                    this.utilService.setItem(this.utilService.USER_PROFILE, JSON.stringify(result.result.user));
                    this.email = ''
                    this.password = ''
                    this.utilService.setItem(this.utilService.USER_TYPE, 'store_manager');
                    this.router.navigateByUrl("/audit");
                } else if (result.result.type == 'csc_member') {
                    this.utilService.setItem(this.utilService.USER_LOGIN, "1");
                    this.utilService.setItem(this.utilService.USER_PROFILE, JSON.stringify(result.result.user));
                    this.email = ''
                    this.password = ''
                    this.utilService.setItem(this.utilService.USER_TYPE, 'csc_member');
                    this.router.navigateByUrl("/csc-orders");
                }
            } else {
                this.toaster.error(result.message);
            }
        }, (error) => {
            console.log("error:-" + JSON.stringify(error));
            this.toaster.error(error.error.message);
        })

    }

}
