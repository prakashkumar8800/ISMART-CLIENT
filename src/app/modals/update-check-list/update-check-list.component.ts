import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';
import { HeaderService } from 'src/app/services/header.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-update-check-list',
  templateUrl: './update-check-list.component.html',
  styleUrls: ['./update-check-list.component.scss']
})
export class UpdateCheckListComponent implements OnInit {

  @Input() listitem;

  name = '';
  items = [];
  status: number= 0;

  constructor(public utilService: UtilService,
    public apiService: ApiService,
    private headerService: HeaderService,
    private activeModal: NgbActiveModal,
    private modalService: NgbModal,
    private toaster: ToastrService ) { }

  ngOnInit(): void {
    if (this.listitem != null && this.listitem != undefined) {
      this.name = this.listitem.name;
      this.items = this.listitem.items;
      this.status=this.listitem.status;
    }
  }

  OnStatuschange() {
    console.log('Selected service prakash:', this.status);
  }


  update() {
    console.log(this.status)
    if (this.name == '') {
      this.toaster.error("Please enter name");
      return;
    }

    if (this.items ) {
      this.toaster.error("please enter value")
    }

    // if (this.status == '') {
    //   this.toaster.error("please select value")
    // }
    this.apiService.postAPI(this.apiService.BASE_URL + "checklist/updateCheckList", {
      name: this.name,
      items: JSON.stringify(this.items),
      status : this.status,
      id: this.listitem.id
   }).then((result)=> {
     if (result.status){
       console.log("This is my updated status",this.status);
       this.activeModal.close()
     }else {
     alert(result.message)
     }
     window.location.reload();  // Trigger page refresh
   }, (error) => {
   console.log(error.error.message);
   alert(error.error.message)
   })
  }

  close() {
    this.activeModal.close()
  }

}
