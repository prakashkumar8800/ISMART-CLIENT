import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AddRestaurantComponent } from 'src/app/modals/add-restaurant/add-restaurant.component';
import { UpdateRestaurantComponent } from 'src/app/modals/update-restaurant/update-restaurant.component';
import { ApiService } from 'src/app/services/api.service';
import { HeaderService } from 'src/app/services/header.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.scss']
})
export class RestaurantComponent implements OnInit {

  p = 1

  key: string = 'name';
  reverse: boolean = false;

  sort(key) {
    this.key = key;
    this.reverse = !this.reverse;
  }

  constructor(
    public utilService: UtilService,
    public apiService: ApiService,
    private headerService: HeaderService,
    private modalService: NgbModal,
    private toast: ToastrService
  ) { 

  }
  
  restaurants=[];
  ngOnInit(): void {
    this.getRestaurant();
  }
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

  addrestaurant(){
    let modal = this.modalService.open(AddRestaurantComponent, {
      backdrop: 'static',
      size: 'xl',
      keyboard: false,
      centered: true,
      windowClass: 'customm-modal',
   });
   this.getRestaurant();
  }

  updaterestaurant(item: any) {
    console.log(item)
    let modal = this.modalService.open(UpdateRestaurantComponent, {
      backdrop: 'static',
      size: 'xl',
      keyboard: false,
      centered: true,
      windowClass: 'customm-modal'
    });
    modal.result.then((result) => {
      this.getRestaurant();
    })
     modal.componentInstance.restaurant = item;
  }
}
