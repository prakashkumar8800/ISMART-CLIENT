import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AddChecklistComponent } from 'src/app/modals/add-checklist/add-checklist.component';
import { UpdateCheckListComponent } from 'src/app/modals/update-check-list/update-check-list.component';
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

  selectedItem: any;

  // onSelect(item: any) {
  //   this.selectedItem = item; // Update the selected item
  // }

  constructor(public utilService: UtilService,
    public apiService: ApiService,
    private headerService: HeaderService,
    private modalService: NgbModal,
    private toast: ToastrService) { }

  ngOnInit(): void {
    this.getChecklist();
    // this.onServiceChange()
  }
  // differentitems={items:['Item 1', 'Item 2', 'Item 3']};

  searchTerm: any = '';

  checklistitem : any[] = []

  selectedService: string = '';

  // onServiceChange() {
  //   const list = this.checklist.find(s => s.name === this.selectedService);
  //   if (list) {
  //     this.checklistitem = list.checklist;
  //   }
  // }


  // get filteredData() {
  //   return this.checklist.filter(person => 
  //     person.id.includes(this.searchTerm)
  //   ); // Filter data based on the search term
  // }

  // getChecklist() {
  //  this.apiService.getAPI(this.apiService.BASE_URL + "checklist/getAllCheckList").then ((result) =>{
  //    console.log(result)
  //    if (result.status){
  //     this.checklist = result.result
  //     console.log(this.checklist)
  //    }
  //  }) 
  // }

  getChecklist() {
    this.apiService.getAPI(this.apiService.BASE_URL + "checklist/getAllCheckList").then((result) => {
      console.log(result);
      if (result.status) {
        this.checklist = result.result;
  
        // Parse 'items' if it's in string format
        this.checklist.forEach((list: any) => {
          if (typeof list.items === 'string') {
            try {
              list.items = JSON.parse(list.items);
            } catch (e) {
              console.error("Error parsing items", e);
            }
          }
        });
  
        console.log(this.checklist);  // Check if 'items' is now an array
      }
    });
  }
  

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

  updatechecklist(item:any) {
    let modal = this.modalService.open(UpdateCheckListComponent, {
      backdrop: 'static',
      size: 'xl',
      keyboard: false,
      centered: true,
      windowClass: 'customm-modal',
   });
   this.getChecklist();
   modal.componentInstance.listitem = item;
  }

}
