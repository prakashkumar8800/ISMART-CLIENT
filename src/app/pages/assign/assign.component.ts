import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AddAssignComponent } from 'src/app/modals/add-assign/add-assign.component';
import { UpdateAuditComponent } from 'src/app/modals/update-audit/update-audit.component';
import { ViewAuditComponent } from 'src/app/modals/view-audit/view-audit.component';
import { ApiService } from 'src/app/services/api.service';
import { HeaderService } from 'src/app/services/header.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-assign',
  templateUrl: './assign.component.html',
  styleUrls: ['./assign.component.scss']
})
export class AssignComponent implements OnInit {

  scheduledTab = true;
  completeTab = false;
  cancleTab = false;
  pendingTab = false;

  restaurant_id = -1;
  selected_restaurant = '';
  userType = ''
  from_date = '';
  to_date = '';

  selectedType = 'scheduled';

  constructor(public utilService: UtilService,
    public apiService: ApiService,
    private headerService: HeaderService,
    private modalService: NgbModal,
    private datePipe: DatePipe,
    private toaster: ToastrService) {

    this.from_date = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    this.to_date = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
  }

  ngOnInit(): void {
    this.userType = this.utilService.getItem(this.utilService.USER_TYPE)
    // this.from_date = this.datePipe.transform(new Date(), 'yyyy-MM-dd')
    // this.to_date = this.datePipe.transform(new Date(), 'yyyy-MM-dd')

    this.getAssign();
    this.getRestaurant()
  }

  onOutletSelected() {
    this.OrderList(this.selectedType)
  }

  // getRestaurant() {
  //   this.apiService.getAPI(this.apiService.BASE_URL + "restaurant/getAllRestaurants").then((result) => {
  //     if (result.status) {
  //       if (this.utilService.getItem(this.utilService.USER_TYPE) == 'admin') {
  //           this.restaurants = result.result;
  //       } 
  //       else {
  //           let profile = this.utilService.getUserProfile();
  //           for (let i = 0; i < result.result.length; i++) {
  //               if (result.result[i].id == profile.restaurants && result.result[i].status!="inactive") {
  //                   this.restaurants.push(result.result[i]);
  //               }
  //           }
  //           if (this.restaurants.length > 0) {
  //               this.selected_restaurant = this.restaurants[this.restaurants.length - 1].id;
  //           }
  //       }

  //       if (this.restaurants.length > 0) {
  //           this.OrderList('scheduled');
  //       }
  //   } else {
  //       this.toaster.error('No Outlets Found');
  //   }
  //     console.log(result)
  //     if (result.status == true) {
  //        this.restaurants = result.result;
  //        console.log(this.restaurants);
  //     }
  //   }, (error) => {

  //   })
  // }

 
  getRestaurant() {
    let activeRestaurants:any;
    this.apiService.getAPI(this.apiService.BASE_URL + "restaurant/getAllRestaurants").then((result) => {
      if (result.status) {
        // Filter only active restaurants
        //  activeRestaurants = result.result.filter(restaurant => restaurant.status === "active");
        this.restaurants = result.result.filter( x=> 
          x.status == 1 ?x.name:'' 
        );
        if (this.utilService.getItem(this.utilService.USER_TYPE) == 'admin') {
          // For admin, show all active restaurants
          this.restaurants = activeRestaurants;
        } else {
          // For non-admin users, filter based on their associated restaurant and active status
          let profile = this.utilService.getUserProfile();
          for (let i = 0; i < activeRestaurants.length; i++) {
            if (activeRestaurants[i].id == profile.restaurants) {
              this.restaurants.push(activeRestaurants[i]);
            }
          }
          if (this.restaurants.length > 0) {
            this.selected_restaurant = this.restaurants[this.restaurants.length - 1].id;
          }
        }

        if (this.restaurants.length > 0) {
          this.OrderList('scheduled');
        } else {
          this.toaster.error('No Active Outlets Found');
        }
      } else {
        this.toaster.error('No Outlets Found');
      }

      console.log(result);
      if (result.status == true) {
        this.restaurants = activeRestaurants;
        console.log(this.restaurants);
      }
    }, (error) => {
      console.error('Error fetching restaurants:', error);
    });
  }
  outlet:string='';


  onDateSelected() {
    setTimeout(() => {
      console.log(this.from_date)
      console.log(this.to_date)

      let fromDate = new Date(this.from_date + ' 00:00:00');
      let toDate = new Date(this.to_date + ' 23:59:59');

      if (fromDate.getTime() > toDate.getTime()) {
        this.toaster.error('From date must be less than to date')
        return;
      }

      this.OrderList(this.selectedType)

    }, 300)
  }

  userAssign = []

  getAssign() {
    this.userAssign = [];
    this.apiService.getAPI(this.apiService.BASE_URL + "assign/getAllAssignByList").then((result) => {
      console.log(result)
      if (result.status == true) {
        this.userAssign = result.result
        console.log(this.userAssign)
      }
    }, (error) => {
    })
  }

  restaurants = [];


  unSelectAllTab() {
    this.scheduledTab = false;
    this.pendingTab = false;
    this.cancleTab = false;
    this.completeTab = false;
  }

  OrderList(type) {
    this.unSelectAllTab()
    this.selectedType = type;
    switch (type) {
      case 'scheduled':
        this.scheduledTab = true;
        break;
      case 'pending':
        this.pendingTab = true;
        break;
      case 'cancle':
        this.cancleTab = true;
        break;
      case 'complete':
        this.completeTab = true;
        break;
    }
  }

  updateAudit(item: any) {
    let modal = this.modalService.open(UpdateAuditComponent, {
      backdrop: 'static',
      size: 'xl',
      keyboard: false,
      centered: true,
      windowClass: 'customm-modal',
    });
    modal.componentInstance.assign = item;
  }

  addAudit() {
    let modal = this.modalService.open(AddAssignComponent, {
      backdrop: 'static',
      size: 'xl',
      keyboard: false,
      centered: true,
      windowClass: 'customm-modal',
    });
  }

}
