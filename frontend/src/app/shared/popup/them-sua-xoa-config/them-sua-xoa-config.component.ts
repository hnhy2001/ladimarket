import { Component, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DanhMucService } from 'app/danhmuc.service';
import { HttpResponse } from '@angular/common/http';
import { NotificationService } from 'app/notification.service';
import { DateRanges, TimePeriod } from 'ngx-daterangepicker-material/daterangepicker.component';
import { LocalStorageService } from 'ngx-webstorage';
import dayjs from 'dayjs/esm';
import moment from 'moment';

@Component({
  selector: 'app-them-sua-xoa-config',
  templateUrl: './them-sua-xoa-config.component.html'
})
export class ThemSuaXoaConfigComponent implements OnInit {
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
    ['Tháng này']: [dayjs().startOf('month'), dayjs().endOf('month')],
  };
  code = '';
  name = '';
  fromDate: any;
  toDate: any;
  status = 1;
  value: string;
  defaultValue: string;
  note: string
  REQUEST_URL = '/api/v1/config';
  constructor(
    private activeModal: NgbActiveModal,
    private dmService: DanhMucService,
    private notification: NotificationService,
    private localStorage: LocalStorageService
  ) {

  }

  ngOnInit(): void {
    var date = JSON.parse(JSON.stringify(this.dateRange));
    date.endDate = date.endDate.replace("23:59:59", "00:00:00");
    this.fromDate = moment(date.startDate, 'YYYYMMDD');
    this.toDate = moment(date.endDate, 'YYYYMMDD');
    if (this.data) {
      this.code = this.data.code;
      this.name = this.data.name;
      this.status = this.data.status;
      this.fromDate = this.data.fromDate;
      this.toDate = this.data.toDate;
      this.value = this.data.value;
      this.defaultValue = this.data.defaultValue;
      this.note = this.note;
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes) {
      this.data = changes.data.currentValue;

    }

  }

  create() {
    if (this.validData()) {
      var date = JSON.parse(JSON.stringify(this.dateRange));
      date.endDate = date.endDate.replace("23:59:59", "00:00:00");
      this.fromDate = moment(date.startDate, 'YYYYMMDD');
      this.toDate = moment(date.endDate, 'YYYYMMDD');
      let entity = {
        id: '',
        code: this.code,
        name: this.name,
        status: this.status,
        note: this.note,
        value: this.value,
        defaultValue: this.defaultValue,
        fromDate: this.fromDate.format("YYYYMMDD"),
        toDate: this.toDate.format("YYYYMMDD")
      }
      var date = JSON.parse(JSON.stringify(this.dateRange));
      date.endDate = date.endDate.replace("23:59:59", "00:00:00");
      this.fromDate = moment(date.startDate, 'YYYYMMDD');
      this.toDate = moment(date.endDate, 'YYYYMMDD');
      console.log(entity);
      if (!this.data) {
        this.dmService.postOption(entity, "/api/v1/config/create", '').subscribe(
          (res: HttpResponse<any>) => {
            if (res.body.CODE === 200) {
              this.notification.showSuccess("Tạo constType thành công", "Success");
              this.accept();
            }
            else {
              this.notification.showError("Tạo constType thất bại", "Fail");
              this.dismiss();
            }
          },
          () => {
            this.notification.showError("Tạo constType thất bại", "Fail");
            console.error();
          }
        );
      }
      else {
        entity.id = this.data.id;
        console.log(this.id);
        this.dmService.putOption(entity, "/api/v1/config/update", '').subscribe(
          (res: HttpResponse<any>) => {
            if (res.body.CODE === 200) {
              this.notification.showSuccess("Cập nhật constType thành công", "Success");
              this.accept();
            }
            else {
              this.notification.showError("Cập nhật constType thất bại", "Fail");
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
    // var date = JSON.parse(JSON.stringify(this.dateRange));
    // date.endDate = date.endDate.replace("23:59:59", "00:00:00");
    // this.fromDate = moment(date.startDate, 'YYYYMMDD');
    // this.toDate = moment(date.endDate, 'YYYYMMDD');
    // this.code = this.fromDate.format('YYYYMMDD') + this.toDate.format('YYYYMMDD');
    // this.name = this.localStorage.retrieve("authenticationtoken").userName;
    return true;
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
