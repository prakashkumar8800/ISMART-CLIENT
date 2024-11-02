import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../../services/api.service';
import { HeaderService } from '../../services/header.service';
import { UtilService } from '../../services/util.service';
import { AddUserComponent } from 'src/app/modals/add-user/add-user.component';
// import { OrderPipe } from 'ngx-order-pipe';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  itemsPerPage = 10;
  currentPage = 1;

  key: string = 'name';
  reverse: boolean = false;

  sort(key) {
    this.key = key;
    this.reverse = !this.reverse;
  }
  filteredUsers = [];

  
    constructor(public utilService: UtilService,
      // private orderPipe: OrderPipe,
      private apiService: ApiService,
      private modalService: NgbModal,
      private toaster: ToastrService,
      private datePipe: DatePipe) { 

    }

    getTotalPages(): number {
      return Math.ceil(this.filteredData.length / this.itemsPerPage);
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

    userdetail = [];
  
    ngOnInit(): void {
       this.getUser();
       this.getRestaurant();
       this.filteredUsers = this.userdetail;
    }

    searchTerm: string = '';
    
    outlet: string ='all';

    applyFilters() {
      this.filteredUsers = this.userdetail.filter(user => 
        user.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }

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
       modal.componentInstance.details = item;
    }

}
