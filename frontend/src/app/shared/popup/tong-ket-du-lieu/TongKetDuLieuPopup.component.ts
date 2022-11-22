import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { jqxDateTimeInputComponent } from 'jqwidgets-ng/jqxdatetimeinput';

@Component({
  selector: 'jhi-TongKetDuLieuPopup',
  templateUrl: './TongKetDuLieuPopup.component.html',
  styleUrls: ['./TongKetDuLieuPopup.component.scss']
})
export class TongKetDuLieuPopupComponent implements OnInit {
  @ViewChild('myDateTimeInput', { static: false }) myDateTimeInput: jqxDateTimeInputComponent;
  @Input() data?: any;

  constructor(private activeModal: NgbActiveModal) {}

  ngOnInit(): void {}

  onGiveShip():void{
    window.open("#/bill?id=" + this.data.id)
  }

  dateOnChange(): void {
    let selection = this.myDateTimeInput.getRange();
    if (selection.from != null) {
       const string = '<div>From: ' + selection.from.toLocaleDateString() + ' <br/>To: ' + selection.to.toLocaleDateString() + '</div>';
    }
  }

  public decline(): void {
    this.activeModal.close(false);
  }

  public accept(): void {
    this.activeModal.close(true);
  }

  public dismiss(): void {
    this.activeModal.dismiss();
  }
}
