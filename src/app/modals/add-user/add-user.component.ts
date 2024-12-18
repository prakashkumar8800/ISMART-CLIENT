import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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
  password: string = '';
  Cpass: string = '';
  phone : number;
  email : string = '';
  role = '';
  status = '1';
  passwordMatch: boolean = true;

  restaurant = '';
  
  // userForm: FormGroup;

  constructor( public utilService: UtilService,
    public apiService: ApiService,
    private headerService: HeaderService,
    private modalService: NgbModal,
    private activeModal: NgbActiveModal,
    private toaster: ToastrService,
    private fb: FormBuilder
  ) 

    { }

    checkPasswords() {
      this.passwordMatch = this.password === this.Cpass;
    }

  ngOnInit(): void {
    if (this.details != null && this.details != undefined) {
      this.name = this.details.name,
      this.email = this.details.email,
      this.phone = this.details.phone,
      this.password = this.details.password,
      this.Cpass = this.details.Cpass,
      this.restaurant = this.details.restaurant,
      this.role = this.details.role;
      this.status = this.details.status;
    }
    this.getUserDetails();
    this.getRestaurant();
    console.log(this.details);
  }

  userRoles = []

  getUserDetails(){
    this.userRoles = [];
    this.apiService.getAPI(this.apiService.BASE_URL + "user-type/getAllUserRole").then((result)=>{
      console.log(result)
      if(result.status == true){
        this.userRoles = result.result
        console.log(this.userRoles)
      }
    }, (error)=> {

    })
  }


  restaurants: any = []

  getRestaurant() {
    this.restaurants = []
    this.apiService.getAPI(this.apiService.BASE_URL + "restaurant/getAllRestaurants").then((result) => {
      console.log(result)
      if (result.status == true) {
            this.restaurants = result.result.filter( x=> 
              x.status == 1 ?x.name:'' 
            );
          }
          else {
            this.restaurant = null;
            this.toaster.error('Restaurant data could not be retrieved');
          }
         console.log(this.restaurants);
      },error => {
        console.error('Error fetching restaurant data:', error);
        this.restaurant = null;
        this.toaster.error('Error fetching restaurant details');
      });
  }

  add() {
    
    let post = {
      name: this.name,
      email: this.email,
      restaurant: this.restaurant,
      phone: this.phone,
      password: this.password,
      Cpass: this.Cpass,
      role: this.role,
      status: this.status,
    }
        this.apiService.postAPI(this.apiService.BASE_URL + 'user/addUser',post).then((result) => {
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

  update() {
    let post = {
      id: this.details.id,
      name: this.name,
      email: this.email,
      restaurant: this.restaurant,
      phone: this.phone,
      password: this.password,
      Cpass: this.Cpass,
      role: this.role,
      status: this.status,
    }

        this.apiService.postAPI(this.apiService.BASE_URL + 'user/updateUser',post).then((result) => {
            if (result.status) {
                this.activeModal.close();
                window.location.reload();
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
