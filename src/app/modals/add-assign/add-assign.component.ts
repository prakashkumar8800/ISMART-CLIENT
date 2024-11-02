import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
// import { log } from 'console';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';
import { HeaderService } from 'src/app/services/header.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-add-assign',
  templateUrl: './add-assign.component.html',
  styleUrls: ['./add-assign.component.scss']
})
export class AddAssignComponent implements OnInit {

  @Input() assign;

  name = '';
  service = '';
  auditor = '';
  ass_DT = '';
  restaurant = '';
  status = '1';

  constructor(public utilService: UtilService,
    public apiService: ApiService,
    private headerService: HeaderService,
    private modalService: NgbModal,
    private activeModal: NgbActiveModal,
    private toaster: ToastrService) { 

    }

  ngOnInit(): void {
    if (this.assign != null && this.assign != undefined) {
      this.name = this.assign.name,
      this.auditor = this.assign.auditor,
      this.restaurant = this.assign.restaurant,
      this.service = this.assign.service,
      this.ass_DT = this.assign.ass_DT,
      this.status = this.assign.status
    }
    console.log(this.assign);
    this.getRestaurant();
    this.getUser()
    this.getChecklist();
  }

  userdetail = [];

  getUser(){
    this.userdetail = [];
    this.apiService.getAPI(this.apiService.BASE_URL + "user/getAllusers").then((result)=>{
      console.log(result)
      if(result.status == true){
        this.userdetail = result.result.filter(user =>
          user.role == 'Auditor' ?user.name: ''
        );
        console.log(this.userdetail);
      }
    }, (error)=>{
      console.log(error.error.message);
      this.toaster.error(error.error.message)
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

  close() {
    this.activeModal.close()
  }

  checklist = [];

  getChecklist() {
    this.checklist=[];
    this.apiService.getAPI(this.apiService.BASE_URL + "checklist/getAllCheckList").then ((result) =>{
      if (result.status){
       this.checklist = result.result
       console.log(this.checklist)
      }
    }) 
   }


  add() {

  let post = {
    name: this.name,
    restaurant: this.restaurant,
    auditor: this.auditor,
    service: this.service,
    ass_DT: this.ass_DT,
    // status: this.status,
  }

    this.apiService.postAPI(this.apiService.BASE_URL + "assign/createAssign", post).then((result) => {
      if (result.status) {
        this.activeModal.close()
      } else {
        alert(result.message)
      }
      window.location.reload();  // Trigger page refresh
    }, (error) => {
      console.log(error.error.message);
      alert(error.error.message)
    })
  }

  update() {
    let post = {
      id: this.assign.id,
      name: this.name,
      restaurant: this.restaurant,
      auditor: this.auditor,
      service: this.service,
      ass_DT: this.ass_DT,
      status: this.status == '1',
    }

    this.apiService.postAPI(this.apiService.BASE_URL + "assign/updateAssign", post).then((result) => {
      if (result.status) {
        this.activeModal.close();
        window.location.reload();
      } else {
        alert(result.message)
      }
    }, (error) => {
      console.log(error.error.message);
      alert(error.error.message)
    })
  }


}
