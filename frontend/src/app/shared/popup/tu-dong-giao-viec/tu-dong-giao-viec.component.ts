import { HttpResponse } from '@angular/common/http';
import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DanhMucService } from 'app/danhmuc.service';
import { NotificationService } from 'app/notification.service';
import DateUtil from 'app/shared/util/date.util';
import { jqxGridComponent } from 'jqwidgets-ng/jqxgrid';
import { userInfo } from 'os';
@Component({
  selector: 'app-tu-dong-giao-viec',
  templateUrl: './tu-dong-giao-viec.component.html',
  styleUrls: ['./tu-dong-giao-viec.component.scss']
})

export class TuDongGiaoViecComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('gridNhanVien') myGrid: jqxGridComponent;
  @ViewChild('gridCongViec') myGridCV: jqxGridComponent;
  REQUEST_WORK_URL ="/api/v1/work";
  listUser = [];
  listWork = [];
  selectId = null;
  REQUEST_DATA_URL ="/api/v1/data";

  // grid nhân viên
  dataAdapter!: any;
  source =
        {
            localdata: [],
            datafields:
            [
                { name: 'id', type: 'number' },
                { name: 'ten', type: 'string' },
                { name: 'tenDayDu', type: 'string' },
                { name: 'thoiGianVao', type: 'string' },
                { name: 'donGiao', type: 'number' },
                { name: 'donHoanThanh', type: 'number' },
                { name: 'soLuongCV', type: 'number' }
            ],
            id:'id',
            datatype: 'array'
        }
    columns: any[] =
    [
        { text: 'Tên đăng nhập', editable: false, datafield: 'ten'},
        { text: 'Họ tên', editable: false, datafield: 'tenDayDu', width:'200'},
        { text: 'Thời gian checkin',editable:false ,datafield: 'thoiGianVao'},
        { text: 'Đơn hoàn thành',editable:false ,datafield: 'donHoanThanh'},
        { text: 'Số lượng đơn giao',editable:false ,datafield: 'soLuongCV'}
    ];
    // grid dùng chung
    height: any = 500;
    localization: any = {
      pagergotopagestring: 'Trang',
      pagershowrowsstring: 'Hiển thị',
      pagerrangestring: ' của ',
      emptydatastring: 'Không có dữ liệu hiển thị',
      filterstring: 'Nâng cao',
      filterapplystring: 'Áp dụng',
      filtercancelstring: 'Huỷ bỏ'
    };
    pageSizeOptions = ['50', '100', '200'];

  constructor(private activeModal: NgbActiveModal,
    private service: DanhMucService,
    private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.getWorks();
  }

  ngOnDestroy(): void {}

  ngAfterViewInit(): void {
    this.myGrid.pagesizeoptions(this.pageSizeOptions);
  }

  getUserActive() {
    this.service.getOption(null, this.REQUEST_WORK_URL,"/getAllActive").subscribe(
        (res: HttpResponse<any>) => {
          this.listUser = this.customData(res.body.RESULT);
          this.source.localdata = this.listUser;
          this.dataAdapter = new jqx.dataAdapter(this.source);
          setTimeout(() => {
            this.myGrid.selectallrows();
          }, 200);
        },
        (error: any) => {
          this.notificationService.showError(`${error.body.RESULT.message}`,"Thông báo lỗi!");
        }
      );
  }
  customData(list: any[]): any[] {
    if(this.listWork.length > 0){
      const phanDu = this.listWork.length % list.length;
      const phanNguyen = Math.floor(this.listWork.length / list.length);
        if(phanDu === 0){
          list.forEach((unitItem) => {
            unitItem.ten = unitItem.acount? unitItem.acount.userName:null;
            unitItem.tenDayDu = unitItem.acount? unitItem.acount.fullName:null;
            unitItem.thoiGianVao = unitItem.timeIn? DateUtil.formatDate(unitItem.timeIn):null;
            unitItem.soLuongCV = phanNguyen
          });
          return list;
        }else{
          list.forEach((unitItem,index) => {          
              unitItem.ten = unitItem.acount? unitItem.acount.userName:null;
              unitItem.tenDayDu = unitItem.acount? unitItem.acount.fullName:null;
              unitItem.thoiGianVao = unitItem.timeIn? DateUtil.formatDate(unitItem.timeIn):null;
              unitItem.soLuongCV = (index === (list.length - 1))? phanDu :phanNguyen;
          });
          return list;
        }
    }else{
      list.forEach(unitItem => {
          unitItem.ten = unitItem.acount? unitItem.acount.userName:null;
          unitItem.tenDayDu = unitItem.acount? unitItem.acount.fullName:null;
          unitItem.thoiGianVao = unitItem.timeIn? DateUtil.formatDate(unitItem.timeIn):null;
          unitItem.soLuongCV = null;
      });
      return list;
    }
  }

  customDataSelect(list: any[]): any[] {
     const count = this.myGrid.getselectedrowindexes().length;
     const listcheck = this.myGrid.getselectedrowindexes();
      const phanDu = this.listWork.length % count;
      const phanNguyen = Math.floor(this.listWork.length / count);
      if(this.listWork.length > count){
        if(phanDu === 0){
          list.forEach((unitItem,index) => {
            unitItem.soLuongCV = listcheck.includes(index)?phanNguyen:null;
          });
          return list;
        }else{
          let countListCheck = count;
          list.forEach((unitItem,index) => {
            if(listcheck.includes(index)){
              countListCheck--;
              unitItem.soLuongCV = (countListCheck === 0)?(phanNguyen + phanDu):phanNguyen;
            }else{
              unitItem.soLuongCV = null;
            }
          });
          return list;
        }
        
      }else{
        list.forEach((unitItem,index) => {
          let countListCheck = count;
          if(listcheck.includes(index)){
              unitItem.soLuongCV = countListCheck === count ? phanDu : null;
              countListCheck --
          }else{
            unitItem.soLuongCV = null;
          }
        });
        return list;
      }  
  }

  getWorks():void{
    this.service.getOption(null, this.REQUEST_DATA_URL,`/getByStatus?status=0&startDate=0&endDate=999999999999`).subscribe(
      (res: HttpResponse<any>) => {
          this.listWork = res.body.RESULT;
          this.getUserActive();
      },
      (error: HttpResponse<any>) => {
          this.notificationService.showError(`${error.body.RESULT.message}`,"Thông báo lỗi!");
      }
  );
  }

  onRowSelect(e:any):void{
    this.customDataSelect(this.listUser);
    this.source.localdata = this.listUser;
    this.dataAdapter = new jqx.dataAdapter(this.source);
    setTimeout(() => {
      this.myGrid.refreshdata();
    }, 200);
  }

  Rowunselect(e: any): void {
    this.customDataSelect(this.listUser);
    this.source.localdata = this.listUser;
    this.dataAdapter = new jqx.dataAdapter(this.source);
    setTimeout(() => {
      this.myGrid.refreshdata();
    }, 200);
  }

  public dismiss(): void {
    this.activeModal.dismiss();
  }

  public assignWork():void {
    // if(this.staffId <=0 || this.staffId == undefined) {
    //   this.notificationService.showError('Vui lòng chọn nhân sự',"Thông báo lỗi!");
    // }

    // let obj  = {
    //   staffId: this.staffId,
    //   data: this.data
    // }

    // this.service.postOption(obj, this.REQUEST_DATA_URL, "/assignWork").subscribe(
    //   (res: HttpResponse<any>) => {
    //     this.activeModal.dismiss();
    //     this.notificationService.showSuccess(`${res.body.MESSAGE}`,"Thông báo!");
    //   },
    //   (error: any) => {
    //     this.notificationService.showError(`${error.body.MESSAGE}`,"Thông báo lỗi!");
    //   }
    // );

    const entity = [];
    let count = 0;
    for(let i = 0; i < this.listUser.length; i++){
      if(this.listUser[i].soLuongCV){
        const item = {
          staffId: this.listUser[i].id,
          data: this.listWork.slice(count,count + this.listUser[i].soLuongCV)
        }
        entity.push(item);
        count = count + this.listUser[i].soLuongCV
      }
    }
    console.log(entity);
  }
}
