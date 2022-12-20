import { HttpResponse } from '@angular/common/http';
import { AfterViewInit, Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DanhMucService } from 'app/danhmuc.service';
import { NotificationService } from 'app/notification.service';
import DateUtil from 'app/shared/util/date.util';
import { jqxGridComponent } from 'jqwidgets-ng/jqxgrid';
import moment from 'moment';
import { userInfo } from 'os';
@Component({
  selector: 'app-tu-dong-giao-viec',
  templateUrl: './tu-dong-giao-viec.component.html',
  styleUrls: ['./tu-dong-giao-viec.component.scss']
})

export class TuDongGiaoViecComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('gridNhanVien') myGrid: jqxGridComponent;
  @ViewChild('gridCongViec') myGridCV: jqxGridComponent;
  @Input() shopCode: any;
  REQUEST_WORK_URL ="/api/v1/work";
  listUser = [];
  listWork = [];
  selectId = null;
  REQUEST_DATA_URL ="/api/v1/data";
  numOfWork = 0;

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
        { text: 'Số lượng đơn giao',editable:false ,datafield: 'soLuongCV'}
    ];
    // grid dùng chung
    height: any = $(window).height()! - 290;;
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
    this.service.getOption(null, this.REQUEST_WORK_URL,"/getAllActive?shopCode="+this.shopCode).subscribe(
        (res: HttpResponse<any>) => {
          this.listUser = res.body.RESULT;
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

  customDataSelect(list: any[]): any[] {
     const count = this.myGrid.getselectedrowindexes().length;
     const listcheck = this.myGrid.getselectedrowindexes();

     const listWorkAssign = this.listWork.slice(0,this.numOfWork);

      const phanDu = listWorkAssign.length % count;
      const phanNguyen = Math.floor(listWorkAssign.length / count);
      if(listWorkAssign.length >= count){
        if(phanDu === 0){
          list.forEach((unitItem,index) => {
            unitItem.ten = unitItem.acount? unitItem.acount.userName:null;
            unitItem.tenDayDu = unitItem.acount? unitItem.acount.fullName:null;
            unitItem.thoiGianVao = unitItem.timeIn? DateUtil.formatDate(unitItem.timeIn):null;
            unitItem.soLuongCV = listcheck.includes(index)?phanNguyen:null;
          });
          return list;
        }else{
          let countListCheck = count;
          list.forEach((unitItem,index) => {
            unitItem.ten = unitItem.acount? unitItem.acount.userName:null;
            unitItem.tenDayDu = unitItem.acount? unitItem.acount.fullName:null;
            unitItem.thoiGianVao = unitItem.timeIn? DateUtil.formatDate(unitItem.timeIn):null;
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
        let countListCheck = count
        list.forEach((unitItem,index) => {
          unitItem.ten = unitItem.acount? unitItem.acount.userName:null;
          unitItem.tenDayDu = unitItem.acount? unitItem.acount.fullName:null;
          unitItem.thoiGianVao = unitItem.timeIn? DateUtil.formatDate(unitItem.timeIn):null;
          if(listcheck.includes(index)){
            countListCheck --;
            if(countListCheck === 0){
              unitItem.soLuongCV = phanDu;
            }else{
              unitItem.soLuongCV = 0;
            }
          }else{
            unitItem.soLuongCV = null;
          }
        });
        return list;
      }  
  }

  getWorks():void{
    this.service.getOption(null, this.REQUEST_DATA_URL,`/getAllDataAccountNull?status=0,3,4,5&shopCode=KHBOM`).subscribe(
      (res: HttpResponse<any>) => {
          this.listWork = res.body.RESULT;
          this.listWork = this.listWork.sort((a, b) => 0.5 - Math.random());
          console.log(this.listWork);
          this.numOfWork = this.listWork.length;
          if(this.listWork.length === 0){
            this.notificationService.showWarning('Danh sách công việc trống','Cảnh báo!');
          }else{
            this.getUserActive();
          }
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

  onRowunselect(e: any): void {
    this.customDataSelect(this.listUser);
    this.source.localdata = this.listUser;
    this.dataAdapter = new jqx.dataAdapter(this.source);
    setTimeout(() => {
      this.myGrid.refreshdata();
    }, 200);
  }

  onChangeNumOfWork():void {
    if(this.numOfWork > this.listWork.length) {
      this.notificationService.showError("Số lượng không hợp lý!","Cảnh báo");
      this.numOfWork = this.listWork.length;
    }
    else {
      this.myGrid.selectallrows();
    }
  }

  public dismiss(): void {
    this.activeModal.dismiss();
  }

  public assignWork():void {
    const checkIndex = this.myGrid.getselectedrowindexes();
    if(checkIndex.length === 0){
      this.notificationService.showWarning('Vui lòng chọn ít nhất một tài khoản','Cảnh báo!')
    }
    const listCheck = [];
    for(let i = 0; i< this.listUser.length; i++){
      if(checkIndex.includes(i)){
        listCheck.push(this.listUser[i]);
      }
    }
    const listWorkAssign = this.listWork.slice(0,this.numOfWork);

    const phanNguyen =  Math.floor(listWorkAssign.length / listCheck.length);
    const length = listCheck.length;
    let countTK = 0;
    let countCV = phanNguyen;

    if(phanNguyen === 0){
      listWorkAssign.forEach((unitItem) => {
        unitItem.nhanVienId = listCheck[listCheck.length - 1].acount.id;
        unitItem.dateChanged = moment(new Date()).format('YYYYMMDDHHmmss')
        unitItem.status = unitItem.status === 0 ? 1 : unitItem.status;
      });
    }else{
      listWorkAssign.forEach((unitItem,index) => {
        unitItem.nhanVienId = listCheck[countTK].acount.id;
        unitItem.dateChanged = moment(new Date()).format('YYYYMMDDHHmmss')
        unitItem.status = unitItem.status === 0 ? 1 : unitItem.status;
        if(index === (countCV-1)){
          countCV = countCV + phanNguyen;
          if(countTK !== (length - 1)){
            countTK++;
          }
        }
      });
    }
    this.save(listWorkAssign);
  }
  save(list:any):void{
    const entity ={
      dataList: list
    }
    this.service.postOption(entity, this.REQUEST_DATA_URL, "/assignWork").subscribe(
      (res: HttpResponse<any>) => {
        this.activeModal.close();
        this.notificationService.showSuccess("Giao việc thành công!","Thông báo!");
      },
      (error: any) => {
        this.notificationService.showError('Đã có lỗi xảy ra',"Thông báo lỗi!");
      }
    );

  }
}
