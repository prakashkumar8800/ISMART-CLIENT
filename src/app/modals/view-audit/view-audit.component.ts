import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';
import { HeaderService } from 'src/app/services/header.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-view-audit',
  templateUrl: './view-audit.component.html',
  styleUrls: ['./view-audit.component.scss']
})
export class ViewAuditComponent implements OnInit {

  @Input() viewaudit;

  name = '';
  shift_manager = '';
  audit_dt = '';
  resturant_manager = '';
  status = '1';
  checklist_item = '';
  attachment_path = '';

  allItems = [];

  selectedService: any = null;
  selectedItems:any=null;
  checklist=[];

  userForm: FormGroup;

  userdetail = []
  averageScore: number = 0;

  constructor(public utilService: UtilService,
    public apiService: ApiService,
    private fb: FormBuilder,
    private headerService: HeaderService,
    private modalService: NgbModal,
    private activeModal: NgbActiveModal,
    private toaster: ToastrService) { 

      this.userForm = this.fb.group({
        name: [''],
        shift_manager: [''],
        audit_dt: [''],
        resturant_name: [''],
        status: [''],
        checklist_item: [''],
        attachment_path: ['']
      });
     }

  ngOnInit(): void {
    // this.getUser()
    // this.getChecklist();
    this.selectedItems = this.checklist.map(item => ({
      ...item,
      attachment_path: []  // Initialize attachment_path as an empty array
    }));
    if (this.viewaudit != null && this.viewaudit != undefined) {
      this.name = this.viewaudit.name,
      this.shift_manager= this.viewaudit.shift_manager,
      this.resturant_manager = this.viewaudit.restaurant_manager
      this.audit_dt = this.viewaudit.audit_dt,
      this.status = this.viewaudit.status,
      this.checklist_item = this.viewaudit.cheklist_item,
      this.attachment_path = this.viewaudit.attachment_path
      this.selectedService=this.viewaudit.checklist_item

      console.log("Jay shree ram",this.selectedService);
      // this.getChecklist();
      // this.updateSelectedItems();
    }
    this.getUser()
    this.getChecklist();
    this.getAudit();

    // this.calculateAverageScore();
    // this.getChecklist();
    // this.getUser()
    // this.getChecklist();
    // this.getAudit();
    // console.log("Yo Yo Honey Singh",this.selectedService.items);
  }

 

  audits = [];

  getAudit(){
    this.audits = [];
    this.apiService.getAPI(this.apiService.BASE_URL + "audit/getAllAuditByList").then (( result) =>{
      console.log(result);
       if (result.status == true){
          this.audits = result.result
       }
       console.log("Priya Ram",this.audits);
    },(error) => {
      console.log(error.error.message);
      this.toaster.error(error.error.message);
    })
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


  close() {
    this.activeModal.close()
  }

  onSubmit() {
    console.log('Form submitted:', this.userForm.value);
  }

  // checklist=[];

  getChecklist() {
    this.apiService.getAPI(this.apiService.BASE_URL + "checklist/getAllCheckList").then((result) => {
      console.log(result);
      if (result.status) {
        this.checklist = result.result;
        console.log("checklist data",this.checklist);
        this.updateSelectedItems();
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
  updateSelectedItems() {
    const selectedChecklist = this.checklist.find((check) => check.id=== this.selectedService);
    // this.selectedItems = selectedChecklist ? selectedChecklist.items : [];
    if (selectedChecklist) {
      this.selectedItems = typeof selectedChecklist.items === 'string' 
        ? JSON.parse(selectedChecklist.items) 
        : selectedChecklist.items;
    } else {
      this.selectedItems = [];
    }
    console.log("Prakash here are your lists",this.checklist);
    console.log("Selected Service",this.selectedItems);
  }

  selectedFiles: File[] = [];

  isUrl(path: string): boolean {
    try {
      new URL(path);
      return true;
    } catch {
      return false;
    }
  }



   
onFileSelected(event: Event, item: any): void {
  const input = event.target as HTMLInputElement;
  if (input.files) {
      const files = Array.from(input.files);
      item.attachment_path = item.attachment_path || []; // Initialize if undefined
      
      // Store selected files for later upload
      item.selectedFiles = files;

      // Update the attachment paths with the selected file names
      item.attachment_path.push(...files.map(file => file.name));
      console.log('Updated attachment paths for item:', item.attachment_path);
  }
}
//async add() {
//   const formData = new FormData();

//   // Add audit details to formData
//   console.log("God Help",this.name);
//   formData.append('name', this.name);
//   formData.append('shift_manager', this.shift_manager);
//   formData.append('audit_dt', this.audit_dt);
//   formData.append('restaurant_manager', this.resturant_manager);
//   console.log("Form data",formData);
//   // Prepare to send checklist items with their attachments and status
//   this.selectedItems.forEach(item => {
//       formData.append('checklist_items[]', JSON.stringify({
//           name: item.name,
//           score: item.score,
//           status: item.status, // Capture the status from checkbox
//           attachments: item.attachment_path // Attachments array
//       }));

//       // Append each selected file for the current item to formData
//       if (item.selectedFiles && item.selectedFiles.length > 0) {
//           item.selectedFiles.forEach((file: File, index: number) => {
//               formData.append(`attachments[${item.name}][${index}]`, file, file.name);
//           });
//       }
//   });



//   try {
//       const result = await this.apiService.postAPI(this.apiService.BASE_URL + "audit/createAudit", formData);
//       if (result.status) {
//           this.toaster.success('Audit saved successfully!');
//           this.activeModal.close();
//       } else {
//           this.toaster.error('Failed to save audit');
//       }
//   } catch (error) {
//       console.error('Error saving audit:', error);
//       this.toaster.error('An error occurred while saving the audit');
//   }
// }
getAttachmentUrl(path: string): string {
  console.log("vcvfvvevevu");
  return `${this.apiService.BASE_URL}/attachments/${path}`;

}

async add() {
  // Create a simple object to hold the data
  const auditData =JSON.stringify( {
      name: this.name,
      shift_manager: this.shift_manager,
      audit_dt: this.audit_dt,
      restaurant_manager: this.resturant_manager,
      status: this.status,
      checklist_item: JSON.stringify(this.selectedItems.map(item => ({
          name: item.name,
          score: item.score,
          status: item.status,
          attachments: item.attachment_path || [] // Ensure this is an array, even if empty
      })))
  });

  // Log the audit data for debugging
  console.log('Audit Data to be sent:', auditData);
  console.log('jay shree ram',this.selectedItems);

  // Perform the API call
  try {
      const result = await this.apiService.postAPI(this.apiService.BASE_URL + "audit/createAudit", auditData)
      // Handle success, e.g., show a success message, close the modal, etc.
      console.log('Audit saved successfully:', result);
      this.activeModal.close();
  } catch (error) {
      console.error('Error saving audit:', error);
      // Handle error, e.g., show an error message
  }
}


}
