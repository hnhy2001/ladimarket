import { Component, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DanhMucService } from 'app/danhmuc.service';
import { HttpResponse } from '@angular/common/http';
import { NotificationService } from 'app/notification.service';
import moment from 'moment';
import { DateRanges, TimePeriod } from 'ngx-daterangepicker-material/daterangepicker.component';
import dayjs from 'dayjs/esm';
import { LocalStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-them-sua-xoa-cost',
  templateUrl: './them-sua-xoa-cost-mkt.component.html'
})
export class ThemSuaXoaCostMarketingComponent implements OnInit {
  @Input() data?: any;
  @Input() id?: any;
  @Input() title?: any;
  dateRange: TimePeriod = {
    startDate: dayjs(),
    endDate: dayjs()
  };
  ranges: DateRanges = {
    ['Hôm nay']: [dayjs(), dayjs()],
    ['Hôm qua']: [dayjs().subtract(1, 'days'), dayjs().subtract(1, 'days')],
    ['7 Ngày qua']: [dayjs().subtract(6, 'days'), dayjs()],
    // ['30 Ngày qua']: [dayjs().subtract(29, 'days'), dayjs()],
    ['Tháng này']: [dayjs().startOf('month'), dayjs().endOf('month')],
    ['Tháng trước']: [dayjs().subtract(1, 'month').startOf('month'), dayjs().subtract(1, 'month').endOf('month')],
    // ['3 Tháng trước']: [dayjs().subtract(3, 'month').startOf('month'), dayjs().subtract(1, 'month').endOf('month')]
  };
  now = moment()
  code = '';
  name = '';
  status = 1;
  timeValue = 1;
  costPerDay: any;
  numOfDay: number;
  totalCost: number;
  fromDate = '';
  toDate = '';
  numOfOrder: number;
  costType = 7;
  costPerOrderValue: number;
  costPerOrder = false;
  listCostType = [];
  selectList = [];
  REQUEST_URL = '/api/v1/cost';
  REQUEST_URL_COSTTYPE = '/api/v1/costtype';
  constructor(
    private activeModal: NgbActiveModal,
    private dmService: DanhMucService,
    private notification: NotificationService,
    private locale: LocalStorageService
  ) { }

  ngOnInit(): void {
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
      this.costType = this.data.costName;
    }

  }

  // getByIdCostType() {
  //   this.dmService.getOption(null, this.REQUEST_URL_COSTTYPE, "/getById?id=" + this.costType).subscribe(
  //     (res: HttpResponse<any>) => {
  //       if (res.body.RESULT.isCountOrder == 1) {
  //         this.fromDate = moment().startOf("month").format("YYYYMMDD");
  //         this.toDate = moment().endOf("month").format("YYYYMMDD");
  //         this.numOfDay = parseInt(moment().endOf("month").format('DD'));
  //         this.costPerOrder = true;
  //         this.timeValue = 1;
  //         this.numOfDay = 1;
  //         this.getData();
  //       } else {
  //         this.costPerOrder = false;
  //       }
  //       if (res.body.RESULT.priod == 1) {
  //         this.checkDate();
  //       } else {
  //         this.fromDate = moment().startOf("month").format("YYYYMMDD");
  //         this.toDate = moment().endOf("month").format("YYYYMMDD");
  //         this.numOfDay = parseInt(moment().endOf("month").format('DD'));
  //       }
  //     },
  //     () => {
  //       console.error();
  //     });
  // }

  checkDate() {
    this.numOfDay = 1;
    var date = JSON.parse(JSON.stringify(this.dateRange));
    date.endDate = date.endDate.replace("23:59:59", "00:00:00");
    this.fromDate = moment(date.startDate, 'YYYYMMDD').format("YYYYMMDD");
    this.toDate = moment(date.endDate, 'YYYYMMDD').format("YYYYMMDD");
    if (this.fromDate != this.toDate) {
      this.notification.showError("Bạn đang nhập khoảng thời gian nhiều hơn 1 ngày", "Fail");
      this.fromDate = moment(dayjs().toString()).format("YYYYMMDD");
      this.toDate = moment(dayjs().toString()).format("YYYYMMDD");
      this.dateRange.startDate = dayjs();
      this.dateRange.endDate = dayjs();
      console.log(this.fromDate);
    }
  }
  getData() {
    if (this.costPerOrder) {
      this.dmService.postOption({ code: 'CPVC' }, "/api/v1/config", "/getByCODE").subscribe(
        (res: HttpResponse<any>) => {
          if (this.fromDate >= res.body.RESULT.fromDate && this.toDate <= res.body.RESULT.toDate) {
            this.costPerOrderValue = res.body.RESULT.value;
          } else {
            this.costPerOrderValue = res.body.RESULT.defaultValue;
          }
          this.dmService.getOption(null, "/api/v1/data", "/thongkeutm?startDate=" + this.fromDate + '&endDate=' + this.toDate + "&shopCode=KHBOM").subscribe(
            (res: HttpResponse<any>) => {
              let count = 0;
              for (let item of res.body.RESULT) {
                count = count + item.count;
              }
              this.numOfOrder = count;
              console.log(this.costPerOrderValue);
              this.totalCost = this.numOfOrder * this.costPerOrderValue;
              this.costPerDay = (this.totalCost / this.numOfDay).toFixed(0);
            },
            () => {
              console.error();
            }
          );
        },
        () => {
          console.error();
        }
      );
    }
  }

  create() {
    if (this.validData()) {
      let entity = {
        id: '',
        code: this.code,
        name: this.name,
        status: this.status,
        costPerDay: this.costPerDay,
        numOfDay: this.numOfDay,
        totalCost: this.totalCost,
        fromDate: parseInt(this.fromDate),
        toDate: parseInt(this.toDate),
        numOfOrder: this.numOfOrder,
        costTypeId: this.costType
      }
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
        entity.costTypeId = 7;
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
    let checkTime = moment().format('DD');
    if(parseInt(checkTime) - parseInt(this.fromDate.slice(6)) > 2){
      this.code = this.fromDate.slice(6) + "/" + this.fromDate.slice(4,6) + "/" + this.fromDate.slice(0,4)  + "-" + this.toDate.slice(6) + "/" + this.toDate.slice(4,6) + "/" + this.toDate.slice(0,4) + "(late)";
    }else{
      this.code = this.fromDate.slice(6) + "/" + this.fromDate.slice(4,6) + "/" + this.fromDate.slice(0,4)  + "-" + this.toDate.slice(6) + "/" + this.toDate.slice(4,6) + "/" + this.toDate.slice(0,4);
    }
    this.name = this.locale.retrieve("authenticationtoken").userName;
    if (this.code == "") {
      this.notification.showError("code Không được để trống", "Fail");
      return false;
    }

    if (this.code == "") {
      this.notification.showError("name Không được để trống", "Fail");
      return false;
    }

    if (this.costType == 0) {
      this.notification.showError("cost type Không được để trống", "Fail");
      return false;
    }
    return true;
  }

  getCostByDay(): void {
    this.costPerDay = (this.totalCost / this.numOfDay);
    this.costPerDay = parseFloat(this.costPerDay.toFixed(0));
  }

  cost(): void {
    console.log(this.costPerOrderValue);
    console.log(this.numOfOrder);
    this.totalCost = this.costPerOrderValue * this.numOfOrder;
    this.getCostByDay();
  }

  // loadDataByCostPerOerDer(): void {
  //   this.getByIdCostType();
  // }
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
