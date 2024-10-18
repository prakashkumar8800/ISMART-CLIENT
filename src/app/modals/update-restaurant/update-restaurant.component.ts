import { Component, OnInit,Input} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';
import { HeaderService } from 'src/app/services/header.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-update-restaurant',
  templateUrl: './update-restaurant.component.html',
  styleUrls: ['./update-restaurant.component.scss']
})
export class UpdateRestaurantComponent implements OnInit {

  @Input() restaurant;

     name : '';
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
    }); }

  ngOnInit(): void {
    if (this.restaurant != null && this.restaurant != undefined) {
      this.name = this.restaurant.name;
      this.status = this.restaurant.status;
    }

    console.log(this.restaurant)
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
    // if (this.status == '') {
    //   this.toaster.error("Please select value");
    //   return;
    // }
        this.apiService.postAPI(this.apiService.BASE_URL + 'restaurant/updateRestaurant',{
          name: this.restaurant.name,
          status: this.restaurant.status,
          id: this.restaurant.id
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
