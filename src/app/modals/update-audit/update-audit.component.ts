import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../../services/api.service';
import { HeaderService } from '../../services/header.service';
import { UtilService } from '../../services/util.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-update-audit',
  templateUrl: './update-audit.component.html',
  styleUrls: ['./update-audit.component.scss']
})
export class UpdateAuditComponent implements OnInit {

  @Input() assign;

  name = '';
  service = '';
  auditor = '';
  ass_dt = '';
  restaurant = '';
  added_dt = '';
  type = '0';
  status = '1';

  userForm: FormGroup;

  constructor( public utilService: UtilService,
    public apiService: ApiService,
    private headerService: HeaderService,
    private fb: FormBuilder,
    private modalService: NgbModal,
    private activeModal: NgbActiveModal,
    private toaster: ToastrService) {

      this.userForm = this.fb.group({
        name: [''],
        total_user: ['']
      });
     }

  ngOnInit(): void {
    if (this.assign != null && this.assign != undefined) {
      this.name = this.assign.name,
      this.auditor= this.assign.auditor,
      this.restaurant = this.assign.restaurant
      this.ass_dt = this.assign.ass_dt,
      this.added_dt = this.assign.added_dt,
      // this.type = this.assign.type,
      this.status = this.assign.status
    }
    this.getRestaurant();
    console.log(this.assign)
  }

  onSubmit(){
    console.log('Form submitted:', this.userForm.value);
  }

  // restaurant_id = -1;
  // select_restaurant = '';

  restaurants = []

  getRestaurant() {
    this.restaurants = [];
    this.apiService.getAPI(this.apiService.BASE_URL + "restaurant/getAllRestaurants").then((result) => {
      console.log(result)
      if (result.status == true) {
         this.restaurants = result.result;
         console.log(this.restaurants);
      }
    },error => {
      console.error('Error fetching data', error);
    }
  );
  }

  // onRestaurantSelected() {
  //   // this.opentab(this.selectedType)
  // }

  update() {

    if (this.name == '') {
      this.toaster.error("Please enter name");
      return;
    }

    // if (this.type == '') {
    //   this.toaster.error("Please select type");
    //   return;
    // }

    this.apiService.postAPI(this.apiService.BASE_URL + "assign/updateAssign", {
      name: this.name,
      restaurant : this.assign.restaurant,
      service : this.assign.service,
      auditor : this.auditor,
      added_dt : this.added_dt,
      ass_dt : this.ass_dt,
      // type: this.type,
      status: this.assign.status,
      id:this.assign.id
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

  close() {
    this.activeModal.close()
  }
}
