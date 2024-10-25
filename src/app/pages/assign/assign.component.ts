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

  userType = ''
  from_date:string = '';
  to_date :string= '';
  outlet:string ='all';
  filteredAssignments = [];
  pendingAssigns=[];
  scheduledAssigns=[];
  currentDate:Date=new Date();
  
  p= 1;

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
    this.getAssign();
    this.getRestaurant()
  }

  restaurants = [];
 
  getRestaurant() {
    this.restaurants = [];
    let activeRestaurants:any;
    this.apiService.getAPI(this.apiService.BASE_URL + "restaurant/getAllRestaurants").then((result) => {
      if (result.status) {
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
            this.outlet = this.restaurants[this.restaurants.length - 1].id;
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

  userAssign = []

  getAssign() {
    this.userAssign = [];
    this.apiService.getAPI(this.apiService.BASE_URL + "assign/getAllAssignByList").then((result) => {
      console.log(result)
      if (result.status == true) {
        this.userAssign = result.result
        this.filteredAssignments = this.userAssign;
        this.pendingAssigns=this.userAssign.filter(assign=>new Date(assign.ass_dt)<this.currentDate);
        this.scheduledAssigns=this.userAssign.filter(assign=>new Date(assign.ass_dt)>=this.currentDate);
        console.log(this.userAssign)
      }
    }, (error) => {
    })
  }

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
    this.getAssign()
    modal.componentInstance.assign = item;
  }

  addAssign() {
    let modal = this.modalService.open(AddAssignComponent, {
      backdrop: 'static',
      size: 'xl',
      keyboard: false,
      centered: true,
      windowClass: 'customm-modal',
    });
    this.getAssign();
  }

  filterAssignments() {
     const fromDate = new Date(this.from_date );
     const toDate = new Date(this.to_date);
    
      console.log(fromDate);
      console.log(toDate);

    // Filter assignments based on date range and outlet
    this.filteredAssignments = this.userAssign.filter(assign => {
      let assignDate = new Date(assign.ass_dt);
      console.log("Prakash",assignDate);
      let isDateInRange = assignDate >= fromDate && assignDate <= toDate;
      let isOutletMatch = this.outlet === 'all' || assign.restaurant === this.outlet;
      return isDateInRange && isOutletMatch;
    });
  }

  // Ensure the filterAssignments method is called whenever the user changes the date or outlet
  onDateOrOutletChange() {
    console.log('Filtering with outlet:', this.outlet, 'From:', this.from_date, 'To:', this.to_date);
    console.log('BeforFiltered Assignments:', this.filteredAssignments);
    this.filterAssignments();
    console.log('Filtered Assignments:', this.filteredAssignments);
  }


}
