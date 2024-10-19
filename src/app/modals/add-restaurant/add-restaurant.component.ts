import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';
import { HeaderService } from 'src/app/services/header.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-add-restaurant',
  templateUrl: './add-restaurant.component.html',
  styleUrls: ['./add-restaurant.component.scss']
})
export class AddRestaurantComponent implements OnInit {
  
  @Input() restaurant

    constructor(

      public utilService: UtilService,
      public apiService: ApiService,
      private headerService: HeaderService,
      private modalService: NgbModal,
      private activeModal: NgbActiveModal,
      private toaster: ToastrService
    ) { }
    
  name='';
  status='1';

  add(){
    if (this.name == '') {
      this.toaster.error("Please enter name");
      return;
    }
    this.apiService.postAPI(this.apiService.BASE_URL + 'restaurant/addRestaurant',{
      name: this.name,
      status:this.status
    }).then((result)=>{
      if (result.status) {
        this.activeModal.close()
      } else {
        alert(result.message)
      }
    },(error) => {
      console.log(error.error.message);
      alert(error.error.message)
    })
  }

  close() {
    this.activeModal.close()
  }
  ngOnInit(): void {
    if(this.restaurant!=null && this.restaurant!=undefined){
      this.name=this.restaurant.name,
      this.status=this.restaurant.status
    }
  }

}
