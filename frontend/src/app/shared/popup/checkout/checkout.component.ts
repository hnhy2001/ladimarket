import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import moment from 'moment';

@Component({
  selector: 'jhi-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckOutComponent implements OnInit {
  checkOut= moment(new Date()).format('DD/MM/YYYY hh:mm');

  constructor(private activeModal: NgbActiveModal) {}

  ngOnInit(): void {}

  save():void{
    this.activeModal.close(true);
  }

  public dismiss(): void {
    this.activeModal.close(false);
  }
}
