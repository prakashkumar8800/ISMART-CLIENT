import { Component, Input, OnInit } from '@angular/core';
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
  ass_dt = '';
  restaurant = '';
  status = '1';

  userdetail = []

  constructor(public utilService: UtilService,
    public apiService: ApiService,
    private headerService: HeaderService,
    private modalService: NgbModal,
    private activeModal: NgbActiveModal,
    private toaster: ToastrService) { }

  ngOnInit(): void {
    if (this.assign != null && this.assign != undefined) {
      this.name = this.assign.name,
      this.auditor= this.assign.auditor,
      this.restaurant = this.assign.restaurant
      this.ass_dt = this.assign.ass_dt,
      this.status = this.assign.status
    }
    this.getRestaurant();
    this.getUser()
    this.getChecklist();
    console.log(this.assign)
  }

  getUser(){
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

  restaurants = []

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


  close() {
    this.activeModal.close()
  }

  checklist=[];
  getChecklist() {
    this.apiService.getAPI(this.apiService.BASE_URL + "checklist/getAllCheckList").then ((result) =>{
      if (result.status){
       this.checklist = result.result
       console.log(this.checklist)
      }
    }) 
   }

  add() {

    console.log("user")
    if (this.name == '') {
      this.toaster.error("Please enter name");
      return;
    }

     if (this.restaurant == '') {
       this.toaster.error("please enter restaurant")
   }

    if (this.auditor == '') {
      this.toaster.error("Please enter auditor name");
      return;
    }

    if (this.ass_dt == '') {
      this.toaster.error("Please enter assign date");
      return;
    }

    if (this.service == '') {
      this.toaster.error("Please select service");
      return;
    }

    this.apiService.postAPI(this.apiService.BASE_URL + "assign/createAssign", {
      name: this.name,
      restaurant: this.restaurant,
      auditor: this.auditor,
      service: this.service,
      ass_dt: this.ass_dt,
      status: this.status
    }).then((result) => {
      if (result.status) {
        this.activeModal.close()
      } else {
        alert(result.message)
      }
    }, (error) => {
      console.log(error.error.message);
      alert(error.error.message)
    })
  }


}
