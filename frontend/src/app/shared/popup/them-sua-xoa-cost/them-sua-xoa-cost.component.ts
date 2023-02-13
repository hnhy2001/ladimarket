import { Component, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DanhMucService } from 'app/danhmuc.service';
import { HttpResponse } from '@angular/common/http';
import { NotificationService } from 'app/notification.service';
import moment from 'moment';
import { DateRanges, TimePeriod } from 'ngx-daterangepicker-material/daterangepicker.component';
import dayjs from 'dayjs/esm';

@Component({
  selector: 'app-them-sua-xoa-cost',
  templateUrl: './them-sua-xoa-cost.component.html'
})
export class ThemSuaXoaCostComponent implements OnInit {
  @Input() data?: any;
  @Input() id?: any;
  @Input() title?: any;
  now = moment()
  code = '';
  name = '';
  status = 1;
  costPerDay :number;
  numOfDay :number;
  totalCost :number;
  fromDate = parseInt(this.now.format("YYYYMMDD"));
  toDate = parseInt(this.now.format("YYYYMMDD"));
  numOfOrder :number;
  costType: any;
  costPerOrderValue :number;
  costPerOrder = false;
  listCostType = [];
  dateRange: TimePeriod = {
    startDate: dayjs(),
    endDate: dayjs()
  };
  ranges: DateRanges = {
    ['Hôm nay']: [dayjs(), dayjs()],
    ['Hôm qua']: [dayjs().subtract(1, 'days'), dayjs().subtract(1, 'days')],
    ['Tháng này']: [dayjs().startOf('month'), dayjs().endOf('month')],
  };
  REQUEST_URL = '/api/v1/cost';
  REQUEST_URL_COSTTYPE = '/api/v1/costtype';
  constructor(
    private activeModal: NgbActiveModal,
    private dmService: DanhMucService,
    private notification: NotificationService
  ) {

  }



  ngOnInit(): void {
    this.dmService.getOption(null, this.REQUEST_URL_COSTTYPE, "/getAll").subscribe(
      (res: HttpResponse<any>) => {
        this.listCostType = res.body.RESULT;
      },
      () => {
        console.error();
      });
    if (this.data) {
      this.code = this.data.code;
      this.name = this.data.name;
      this.status = this.data.status;
      this.costPerDay = this.data.costPerDay;
      this.numOfDay = this.data.numOfDay;
      this.totalCost = this.data.totalCost;
      this.fromDate = this.data.fromDate;
      this.toDate = this.data.toDate;
      this.numOfOrder = this.data.numOfOrder;
      this.costType = this.data.costType;
    }
    this.getByIdCostType()
  }

  getByIdCostType(){
    this.dmService.getOption(null, this.REQUEST_URL_COSTTYPE, "/getById?id=" + this.costType).subscribe(
      (res: HttpResponse<any>) => {
        if(res.body.RESULT.isCountOrder == 1){
          this.costPerOrder = true;
        }else{
          this.costPerOrder = false;
        }
      },
      () => {
        console.error();
      });
  }


  create() {
    if (this.validData()) {
      var date = JSON.parse(JSON.stringify(this.dateRange));
      let entity = {
        id: '',
        code: this.code,
        name: this.name,
        status: this.status,
        costPerDay: this.costPerDay,
        numOfDay: this.numOfDay,
        totalCost: this.totalCost,
        fromDate: moment(date.startDate).format("YYYYMMDD"),
        toDate: moment(date.startDate).format("YYYYMMDD"),
        numOfOrder: this.numOfOrder,
        costTypeId: this.costType
      }
      console.log(this.fromDate);
      console.log(entity);
      if (!this.data) {
        this.dmService.postOption(entity, "/api/v1/cost/postcost", '').subscribe(
          (res: HttpResponse<any>) => {
            if (res.body.CODE === 200) {
              this.notification.showSuccess("Tạo const thành công", "Success");
              this.accept();
            }
            else {
              this.notification.showError("Tạo const thất bại", "Fail");
              this.dismiss();
            }
          },
          () => {
            this.notification.showError("Tạo const thất bại", "Fail");
            console.error();
          }
        );
      }
      else {
        entity.id = this.data.id;
        console.log(this.id);
        this.dmService.postOption(entity, "/api/v1/cost/postcost", '').subscribe(
          (res: HttpResponse<any>) => {
            if (res.body.CODE === 200) {
              this.notification.showSuccess("Cập nhật const thành công", "Success");
              this.accept();
            }
            else {
              this.notification.showError("Cập nhật const thất bại", "Fail");
              this.dismiss();
            }
          },
          () => {
            this.notification.showError("Cập nhật tài khoản thất bại", "Fail");
            console.error();

          }
        );
      }
    }

  }

  validData() {
    if (this.code == "") {
      this.notification.showError("code Không được để trống", "Fail");
      return false;
    }

    if (this.code == "") {
      this.notification.showError("name Không được để trống", "Fail");
      return false;
    }
    return true;
  }

  loadDate():void {
    var date = JSON.parse(JSON.stringify(this.dateRange));
    date.endDate = date.endDate.replace("23:59:59", "00:00:00");
    let startDate = moment(date.startDate,'YYYYMMDD');
    let endDate = moment(date.endDate,'YYYYMMDD');
    this.numOfDay = endDate.diff(startDate, 'days')+1;
    this.dmService.getOption(null, this.REQUEST_URL,"/laysodontheothoigian?startDate=" + startDate.format("YYYYMMDD") + '&endDate=' + endDate.format("YYYYMMDD")).subscribe(
      (res: HttpResponse<any>) => {
        this.numOfOrder = res.body.RESULT.count;
        // alert(this.numOfOrder);
      },
      () => {
        console.error();
      }
    );
  }

  getCostByDay():void{
    this.costPerDay = (this.totalCost / this.numOfDay);
  }

  cost():void{
    this.totalCost = this.costPerOrderValue * this.numOfOrder;
    this.getCostByDay();
  }

  loadDataByCostPerOerDer():void{
    this.getByIdCostType();
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
