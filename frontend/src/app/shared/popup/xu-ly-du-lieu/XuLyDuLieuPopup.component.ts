import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'jhi-XuLyDuLieuPopup',
  templateUrl: './XuLyDuLieuPopup.component.html',
  styleUrls: ['./XuLyDuLieuPopup.component.scss']
})
export class XuLyDuLieuPopupComponent implements OnInit {
  @Input() data?: any;

  constructor(private activeModal: NgbActiveModal) {}

  ngOnInit(): void {}

  onGiveShip():void{
    window.open("#/bill?id=" + this.data.id)
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
