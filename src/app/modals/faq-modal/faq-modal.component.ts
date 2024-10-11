import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-faq-modal',
  templateUrl: './faq-modal.component.html',
  styleUrls: ['./faq-modal.component.scss']
})
export class FaqModalComponent implements OnInit {

  @Input() title: string | null = null;
  @Input() description: string | null = null;

  constructor(
    public apiservice: ApiService,
    public modalService: NgbModal,
    private activeModal: NgbActiveModal,
  ) { }

  ngOnInit(): void {
    console.log(this.title);
    console.log(this.description);
  }

  close() {
    this.activeModal.close();
  }
}
