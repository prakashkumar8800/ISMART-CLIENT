import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AddChecklistComponent } from 'src/app/modals/add-checklist/add-checklist.component';
import { ApiService } from 'src/app/services/api.service';
import { HeaderService } from 'src/app/services/header.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-check-list',
  templateUrl: './check-list.component.html',
  styleUrls: ['./check-list.component.scss']
})
export class CheckListComponent implements OnInit {

  checklist = [];
  Service: any; // Holds the selected service from the dropdown
  allItems = [];

  sortname: string = 'name'; // Default sort field
  sortOrder: 'asc' | 'desc' = 'asc'; // Default sort order

  constructor(public utilService: UtilService,
              public apiService: ApiService,
              private headerService: HeaderService,
              private modalService: NgbModal,
              private toast: ToastrService) { }

  ngOnInit(): void {
    this.getChecklist();
    this.calculateAverageScore();
  }

  toggleSort(name: string) {
    if (this.sortname === name) {
      // Toggle sort order if the field is the same
      this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    } else {
      // Set new sort field and reset to ascending order
      this.sortname = name;
      this.sortOrder = 'asc';
    }
  }



  // Get the checklist data from API
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
          this.allItems.push(...list.items);
        });
      }
    });
  }

  selectedService: any = null;

  onServiceChange() {
    if (this.selectedService === null) {
      // "ALL" selected - display all items
      console.log('Showing all items:');
      this.checklist.forEach((service) => {
        console.log('Service:', service.name, 'Items:', service.items);
      });
    } 
    else if (this.selectedService && this.selectedService.items) {
      console.log('Selected service:', this.selectedService);
      console.log('Items:', this.selectedService.items);
    }
     else {
      console.log('No items found for this service.');
    }
  }

  // Open the modal to add a new checklist
  addchecklist() {
    let modal = this.modalService.open(AddChecklistComponent, {
      backdrop: 'static',
      size: 'xl',
      keyboard: false,
      centered: true,
      windowClass: 'customm-modal',
    });
    this.getChecklist();
  }

  // Edit the selected service's checklist
  editchecklist(selectedService: any) {
    let modal = this.modalService.open(AddChecklistComponent, {
      backdrop: 'static',
      size: 'xl',
      keyboard: false,
      centered: true,
      windowClass: 'customm-modal',
    });

    if (selectedService) {
      modal.componentInstance.listitem = selectedService;  
    }
  }

  calculateAverageScore() {
    let totalScore = 0;
    let totalCount = 0;
    const maxScore = 100;

    this.checklist.forEach((list) => {
      if (list.items && list.items.length > 0) {
        list.items.forEach((item: any) => {
          if (item.score !== undefined) {
            totalScore += Number(item.score);
            totalCount++;
          }
        });
      }
    });

    const averagePercentage = totalCount > 0 ? (totalScore / (totalCount * maxScore)) * 100 : 0;


    return averagePercentage.toFixed(2);
     // Return average score with 2 decimal places
  }

}
