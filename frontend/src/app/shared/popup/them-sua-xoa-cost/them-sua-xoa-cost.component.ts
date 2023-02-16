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
  timeValue = 1;
  costPerDay :number;
  numOfDay :number;
  totalCost :number;
  fromDate = '';
  toDate = '';
  numOfOrder :number;
  costType: any;
  costPerOrderValue :number;
  costPerOrder = false;
  listCostType = [];
  selectList = [];
  selectDayValue = moment().format("DD");
  selectMonthValue = moment().format("MM");
  selectYearValue = moment().format("YYYY");
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
    this.getByIdCostType();
    this.getNumOfDay();
    this.setSelectList();
  }

  getByIdCostType(){
    this.dmService.getOption(null, this.REQUEST_URL_COSTTYPE, "/getById?id=" + this.costType).subscribe(
      (res: HttpResponse<any>) => {
        if(res.body.RESULT.isCountOrder == 1){
          this.costPerOrder = true;
          this.timeValue = 1;
          this.numOfDay = 1;
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
      let entity = {
        id: '',
        code: this.code,
        name: this.name,
        status: this.status,
        costPerDay: this.costPerDay,
        numOfDay: this.numOfDay,
        totalCost: this.totalCost,
        fromDate: this.fromDate,
        toDate: this.toDate,
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

  getCostByDay():void{
    this.costPerDay = (this.totalCost / this.numOfDay);
    this.costPerDay = parseFloat(this.costPerDay.toFixed(0));
  }

  getNumOfDay(): void{
    if(this.timeValue == 1){
      this.numOfDay = 1;
    }else{
      this.numOfDay = parseInt(moment(this.selectMonthValue).endOf("month").format("DD"));
    }
  }

  cost():void{
    this.totalCost = this.costPerOrderValue * this.numOfOrder;
    this.getCostByDay();
  }

  setSelectList(){
    if(this.timeValue == 1){
      let arr = [];
      let numOfDay = parseInt(moment(this.selectYearValue + this.selectMonthValue).endOf("month").format("DD"));
      for(let i =0; i< numOfDay; i++){
        if(i<9){
          arr.push("0"+(i+1));
        }else{
          arr.push(""+(i+1));
        }
      }
      this.selectList = arr;
      this.fromDate = moment(this.selectYearValue+"/"+this.selectMonthValue+"/"+this.selectDayValue).format("YYYYMMDD");
      this.toDate = moment(this.selectYearValue+"/"+this.selectMonthValue+"/"+this.selectDayValue).format("YYYYMMDD");
    }else{
      this.fromDate = moment(this.selectYearValue+"/"+this.selectMonthValue).startOf('month').format("YYYYMMDD");
      this.toDate = moment(this.selectYearValue+"/"+this.selectMonthValue).endOf('month').format("YYYYMMDD");
    }
    this.getNumOfDay()
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
