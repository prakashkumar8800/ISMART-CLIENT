import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../../services/api.service';
import { HeaderService } from '../../services/header.service';
import { UtilService } from '../../services/util.service';

@Component({
  selector: 'app-update-service',
  templateUrl: './update-service.component.html',
  styleUrls: ['./update-service.component.scss']
})
export class UpdateServiceComponent implements OnInit {

  @Input() feedback;
  name = '';
  type = '0';
  status = '1';

  constructor( public utilService: UtilService,
    public apiService: ApiService,
    private headerService: HeaderService,
    private modalService: NgbModal,
    private activeModal: NgbActiveModal,
    private toaster: ToastrService) { }

  ngOnInit(): void {
    if (this.feedback != null) {
      this.name = this.feedback.name;
      this.type = this.feedback.type;
      this.status = this.feedback.status;
    }
  }

  add() {

    if (this.name == '') {
      this.toaster.error("Please enter name");
      return;
    }

    if (this.type == '') {
      this.toaster.error("Please select type");
      return;
    }

    this.apiService.postAPI(this.apiService.BASE_URL + "order-rating/addFeedback", {
      name: this.name,
      type: this.type
    }).then((result) => {
      if (result.status) {
        this.activeModal.close()
      } else {
        alert(result.message)
      }
    }, (error) => {
      console.log(error.error.message);
      alert(error.error.message)
    })
  }

  update() {

    if (this.name == '') {
      this.toaster.error("Please enter name");
      return;
    }

    if (this.type == '') {
      this.toaster.error("Please select type");
      return;
    }

    this.apiService.postAPI(this.apiService.BASE_URL + "order-rating/updateFeedback", {
      name: this.name,
      type: this.type,
      status: this.status,
      id:this.feedback.id
    }).then((result) => {
      if (result.status) {
        this.activeModal.close()
      } else {
        alert(result.message)
      }
    }, (error) => {
      console.log(error.error.message);
      alert(error.error.message)
    })
  }

  close() {
    this.activeModal.close()
  }



}
