import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DanhMucService } from 'app/danhmuc.service';
import { HttpResponse } from '@angular/common/http';
import { NotificationService } from 'app/notification.service';

@Component({
  selector: 'app-gan-shop',
  templateUrl: './gan-shop.component.html'
})
export class GanShopComponent implements OnInit {
  @Input() data?: any;

  listShop:any = [];
  listSelect:any = [];
  REQUEST_URL = '/api/v1/account/'
  REQUEST_URL_SHOP = '/api/v1/shop'
  constructor(
    private activeModal: NgbActiveModal,
    private dmService: DanhMucService,
    private notification: NotificationService
  ) { }

  ngOnInit(): void {
    this.loadData();
    if(this.data.shop){
        this.listSelect = this.data.shop.split(",");
    }
  }

  loadData():void{
    this.dmService.getOption(null, this.REQUEST_URL_SHOP, "?status=1").subscribe(
        (res: HttpResponse<any>) => {
            this.listShop = res.body.RESULT;
        },
        () => {
            console.error();
        }
    );
  }

  save() {
        const entity = this.data;
        entity.shop = this.listSelect.toString();
        this.dmService.putOption(entity, this.REQUEST_URL, 'update').subscribe(
          (res: HttpResponse<any>) => {
            if(res.body.CODE === 200){
              this.notification.showSuccess("Phân quyền thành công", "Success");
              this.accept();
            }
            else{
              this.notification.showError("Phân quyền thất bại", "Fail");
              this.dismiss();
            }
          },
          () => {
            this.notification.showError("Phân quyền thất bại", "Fail");
            console.error();
            
          }
        );
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
