import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AddAssignComponent } from 'src/app/modals/add-assign/add-assign.component';
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
  outlet: string ='all';
  filteredAssignments = [];
  pendingAssigns = [];
  scheduledAssigns = [];
  cancleAssigns = [];
  completeAssigns = [];
  filteredScheduledAssigns = [];
  filteredPendingAssigns = []; 
  filteredCancleAssigns = [];
  filteredCompleteAssigns = [];
  currentDate:Date=new Date();
  checklist: any[] = [];
  
  itemsPerPage = 10;
  currentPage = 1;

  selectedType = 'scheduled';

  constructor(public utilService: UtilService,
    public apiService: ApiService,
    private headerService: HeaderService,
    private modalService: NgbModal,
    private datePipe: DatePipe,
    private toaster: ToastrService) {

  }

   // Method to calculate total pages
   getTotalPages(): number {
    return Math.ceil(this.filteredScheduledAssigns.length / this.itemsPerPage);
  }

  // Method to return an array of page numbers for pagination controls
  getPages(): number[] {
    return Array(this.getTotalPages()).fill(0).map((x, i) => i + 1);
  }

  // Method to change the page when a pagination link is clicked
  changePage(page: number): void {
    if (page >= 1 && page <= this.getTotalPages()) {
        this.currentPage = page;
    }
  }

  ngOnInit(): void {
    this.userType = this.utilService.getItem(this.utilService.USER_TYPE)
    this.getAssign();
    this.getRestaurant()
    this.getChecklist();
   
  }

  restaurants = [];
 
  getRestaurant() {
    this.restaurants = [];
    let activeRestaurants:any = [];
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
        this.pendingAssigns=this.userAssign.filter(assign=>new Date(assign.ass_dt)<this.currentDate && assign.status != '0' && assign.status !== '1');
        this.scheduledAssigns=this.userAssign.filter(assign=>new Date(assign.ass_dt)>=this.currentDate && assign.status != '1' && assign.status !== '1');
        this.cancleAssigns = this.userAssign.filter(assign => assign.status == '0')
        this.completeAssigns = this.userAssign.filter(assign => assign.status == '1')
        console.log(this.userAssign)
        console.log(this.scheduledAssigns)
        console.log(this.pendingAssigns);
        this.onDateOrOutletChange();
        console.log(this.filteredCancleAssigns);
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

  refreshAssignmentsLists() {
    const currentDate = new Date();
    
    this.scheduledAssigns = this.userAssign.filter(assign => 
      new Date(assign.ass_dt) >= currentDate && assign.status !== '0' && assign.status !== '1'
    );
    this.pendingAssigns = this.userAssign.filter(assign => 
      new Date(assign.ass_dt) < currentDate && assign.status !== '0' && assign.status !== '1'
    );
    this.cancleAssigns = this.userAssign.filter(assign => assign.status === '0');
    this.completeAssigns = this.userAssign.filter(assign => assign.status === '1');
  }

  updateAudit(item: any) {
    let modal = this.modalService.open(AddAssignComponent, {
      backdrop: 'static',
      size: 'xl',
      keyboard: false,
      centered: true,
      windowClass: 'customm-modal',
    });
    this.getAssign()
    modal.componentInstance.assign = item;
    modal.result.then((result) => {
      // Assuming result contains updated status and other details
      if (result && result.statusUpdated) {
        item.status = result.newStatus;
        this.refreshAssignmentsLists();
      }
    }).catch((error) => {
      console.error("Error updating assignment:", error);
    });
  }
  
  getChecklist() {
    this.apiService.getAPI(this.apiService.BASE_URL + "checklist/getAllCheckList").then((result) => {
      console.log(result);
      if (result.status) {
        this.checklist = result.result;

        this.checklist.forEach((list: any) => {
          if (typeof list.items === 'string') {
            try {
              list.items = JSON.parse(list.items);
            } catch (e) {
              console.error("Error parsing items", e);
              list.items = []; // Set to empty array on error
            }
          }
        
        });
      }
      this.checklist == result;
    });
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

  updateFilteredAssignments() {
    // Check if the outlet, from_date, and to_date are all unselected/empty
    console.log("Informations",this.from_date,this.to_date,this.outlet)
    const noOutletFilter = !this.outlet || this.outlet === 'all';
    const noDateFilter = !this.from_date && !this.to_date;

    // If no filters are applied, show all data by assigning the full array
    this.filteredScheduledAssigns = (noOutletFilter && noDateFilter) ? this.scheduledAssigns : 
        this.scheduledAssigns.filter(assign => 
            (this.outlet === 'all' || assign.restaurant === this.outlet) &&
            (!this.from_date || new Date(assign.ass_dt) >= new Date(this.from_date)) &&
            (!this.to_date || new Date(assign.ass_dt) <= new Date(this.to_date))
        );

    this.filteredPendingAssigns = (noOutletFilter && noDateFilter) ? this.pendingAssigns : 
        this.pendingAssigns.filter(assign => 
            (this.outlet === 'all' || assign.restaurant === this.outlet) &&
            (!this.from_date || new Date(assign.ass_dt) >= new Date(this.from_date)) &&
            (!this.to_date || new Date(assign.ass_dt) <= new Date(this.to_date))
        );

    this.filteredCancleAssigns = (noOutletFilter && noDateFilter) ? this.cancleAssigns : 
        this.cancleAssigns.filter(assign => 
            (this.outlet === 'all' || assign.restaurant === this.outlet) &&
            (!this.from_date || new Date(assign.ass_dt) >= new Date(this.from_date)) &&
            (!this.to_date || new Date(assign.ass_dt) <= new Date(this.to_date))
        );

    this.filteredCompleteAssigns = (noOutletFilter && noDateFilter) ? this.completeAssigns : 
        this.completeAssigns.filter(assign => 
            (this.outlet === 'all' || assign.restaurant === this.outlet) &&
            (!this.from_date || new Date(assign.ass_dt) >= new Date(this.from_date)) &&
            (!this.to_date || new Date(assign.ass_dt) <= new Date(this.to_date))
        );
}

getRestaurantName(id: number) {
  return this.restaurants.find(r => r.id === id)?.name || 'Unknown';
}

getAuditorName(id: number) {
  return this.userAssign.find(a => a.id === id)?.name || 'Unknown';
}

getServiceName(id: number) {
  return this.checklist.find(s => s.id === id)?.name || 'Unknown';
}
  
  onDateOrOutletChange() {
    this.updateFilteredAssignments();
    console.log(this.scheduledAssigns);
  }


}
