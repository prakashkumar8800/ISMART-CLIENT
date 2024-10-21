import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';
import { HeaderService } from 'src/app/services/header.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-add-checklist',
  templateUrl: './add-checklist.component.html',
  styleUrls: ['./add-checklist.component.scss']
})
export class AddChecklistComponent implements OnInit {
  
  @Input() listitem;

  name = '';
  items = '';
  attachment: '';

  myForm : FormGroup;

  constructor(public utilService: UtilService,
    private fb: FormBuilder,
    public apiService: ApiService,
    private headerService: HeaderService,
    private activeModal: NgbActiveModal,
    private modalService: NgbModal,
    private toaster: ToastrService) { 

      this.myForm = this.fb.group({
        items: this.fb.array([]) // Initialize your form controls
      });
  }

  ngOnInit(): void {
    if (this.listitem != null && this.listitem != undefined) {
      this.name = this.listitem.name;
      this.items = this.listitem.items;
    }
    console.log(this.listitem)
  }

  checklist: any[] = []

  addInput() {
    this.checklist.push({value: ''}); // This should now work without errors
    console.log(this.checklist)
  }

  removeInput(index: number) {
    this.checklist.splice(index, 1);
    console.log(this.checklist)
  }

  add() {
    const outputObject = {
      "name": this.name,
      "items": JSON.stringify(this.checklist.map(item => item.value)),
      "attachment": this.attachment
  };
  console.log(outputObject)

    this.apiService.postAPI(this.apiService.BASE_URL + "checklist/createCheckList",
      outputObject
    ).then((result)=> {
      if (result.status){
        this.activeModal.close()
      }else {
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
