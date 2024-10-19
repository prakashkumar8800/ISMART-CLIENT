import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { UpdateUserComponent } from '../../modals/update-user/update-user.component';
import { ApiService } from '../../services/api.service';
import { HeaderService } from '../../services/header.service';
import { UtilService } from '../../services/util.service';
import { AddUserComponent } from 'src/app/modals/add-user/add-user.component';
import { OrderPipe } from 'ngx-order-pipe';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  p = 1

  key: string = 'name';
  reverse: boolean = false;

  sort(key) {
    this.key = key;
    this.reverse = !this.reverse;
  }

  order: string = 'name';
  
    constructor(public utilService: UtilService,
      private orderPipe: OrderPipe,
      private apiService: ApiService,
      private modalService: NgbModal,
      private toaster: ToastrService,
      private datePipe: DatePipe) { 

        console.log(this.orderPipe.transform(this.userdetail, this.order));
    }

    userdetail = [];
  
    ngOnInit(): void {
       this.getUser();
       this.getRestaurant();
    }

    searchTerm: string = '';
    
    outlet:string ='all';

    getUser(){
      this.userdetail = [];
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
    filteredPackages: any[]=[];

    applyFilters(): void {
      if (!this.restaurants || this.restaurants.length === 0) return;
  
      console.log("Filters applied:", {
        searchTerm: this.searchTerm,
  
      });
  
      this.filteredPackages = this.restaurants.filter((packages) => {
  
        // Check if typedCountry is either part of the package's country name or matches dropdown selection
        
        return (
          // Combine both dropdown and text input country filters
          (this.searchTerm === "" ||
            packages.searchTerm === this.searchTerm)
        );
      });
  
      console.log("Filtered Packages:", this.filteredPackages);
    }

    getRestaurant() {
      this.restaurants = [];
      this.apiService.getAPI(this.apiService.BASE_URL + "restaurant/getAllRestaurants").then((result) => {
        console.log(result)
        if (result.status == true) {
          this.restaurants = result.result.filter( x=> 
            x.status == 1 ?x.name:'' 
          );
        }
      },error => {
        console.error('Error fetching data', error);
      }
    );
    }

    get filteredData() {
      return this.userdetail.filter(person => 
        person.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      ); // Filter data based on the search term
    }
  
    addUser() {
      let modal = this.modalService.open(AddUserComponent, {
        backdrop: 'static',
        size: 'xl',
        keyboard: false,
        centered: true,
        windowClass: 'customm-modal'
      });
      modal.result.then((result) => {
        this.getUser();
      })
    }
  
    updateUser(item: any) {
      console.log(item)
      let modal = this.modalService.open(UpdateUserComponent, {
        backdrop: 'static',
        size: 'xl',
        keyboard: false,
        centered: true,
        windowClass: 'customm-modal'
      });
      modal.result.then((result) => {
         this.getUser();
      })
       modal.componentInstance.details = item;
    }

}
