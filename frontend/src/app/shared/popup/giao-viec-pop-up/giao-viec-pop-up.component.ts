import { HttpResponse } from '@angular/common/http';
import { AfterViewInit, Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DanhMucService } from 'app/danhmuc.service';
import { NotificationService } from 'app/notification.service';
import DateUtil from 'app/shared/util/date.util';
import { jqxGridComponent } from 'jqwidgets-ng/jqxgrid';
import moment from 'moment';

@Component({
  selector: 'app-giao-viec-pop-up',
  templateUrl: './giao-viec-pop-up.component.html',
  styleUrls: ['./giao-viec-pop-up.component.scss']
})

export class GiaoViecPopUpComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('gridReferenceABC') myGrid: jqxGridComponent;
  REQUEST_WORK_URL ="/api/v1/work";
  @Input() data: any;
  // listUser:Observable<object[]>;
  listUser = [];
  selectedStaff:any;
  REQUEST_DATA_URL ="/api/v1/data";
// jqx
// grid
source: any
dataAdapter: any;
columns: any[] =
[
    {
        text: '#', sortable: false, filterable: false, editable: false,
        groupable: false, draggable: false, resizable: false,
        datafield: '', columntype: 'number', 
        cellsrenderer: (row: number, column: any, value: number): string => {
            return '<div style="position: relative;top: 50%;left: 4px;transform: translateY(-50%);">' + (value + 1) + '</div>';
        }
    },
    { text: 'Sản phẩm',editable:false ,datafield: 'formcolor'},
    { text: 'Tên KH', editable: false, datafield: 'name', width: '10%'},
    { text: 'SĐT', editable: false, datafield: 'phone' , width: '10%'},
    { text: 'Ngày', editable: false, datafield: 'ngay', width: '10%'},
    { text: 'Địa chỉ', editable: false, datafield: 'street'},
    { text: 'Trạng thái', editable: false, datafield: 'status' ,  width: '10%',cellsrenderer: (row: number, column: any, value: number): string => {
        switch (value){
            case 0: 
            {
                return '<div class="div-center">' + 'Chờ xử lý' + '</div>';
            }
            case 1: 
            {
                return '<div class = "bg-info div-center text-white">' + 'Đang xử lý' + '</div>';
            }
            case 2: 
            {
                return '<div class = "bg-primary div-center text-white">' + 'Hoàn thành' + '</div>';
            }
            case 3: 
            {
                return '<div class = "bg-warning div-center">' + 'Không nghe máy lần 1' + '</div>';
            }
            case 4: 
            {
                return '<div class = "bg-warning div-center">' + 'Không nghe máy lần 2' + '</div>';
            }
            case 5: 
            {
                return '<div class = "bg-danger div-center text-white">' + 'Thất bại' + '</div>';
            }
            case 6: 
            {
                return '<div class = "bg-dark div-center text-white">' + 'Trùng' + '</div>';
            }
            case 7: 
            {
                return '<div class = "bg-success div-center text-white">' + 'Đã in đơn' + '</div>';
            }
            default:
            {
                return '<div></div>';
            }
        }
    }}

];
height: any = $(window).height()! - 350;
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
    private notificationService: NotificationService) { 
      this.source =
        {
            localdata: [],
            datafields:
            [
                { name: 'id', type: 'number' },
                { name: 'name', type: 'string' },
                { name: 'phone', type: 'string' },
                { name: 'street', type: 'string' },
                { name: 'status', type: 'number' },
                { name: 'date', type: 'date',format: "DD/MM/YYYY" },
                { name: 'formcolor', type: 'string' },
                { name: 'ngay', type: 'string' }
            ],
            id:'id',
            datatype: 'array'
        };
        this.dataAdapter = new jqx.dataAdapter(this.source);
    }

  ngOnInit(): void {
    this.getUserActive();
    this.getData();
  }

  ngAfterViewInit(): void {
    this.myGrid.pagesizeoptions(this.pageSizeOptions);
  }

  ngOnDestroy(): void {
  }

  public getUserActive() {
    this.service.getOption(null, this.REQUEST_WORK_URL,"/getAllActive").subscribe(
      (res: HttpResponse<any>) => {
        this.listUser = res.body.RESULT;
      },
      (error: any) => {
        this.notificationService.showError(`${error.body.RESULT.message}`,"Thông báo lỗi!");
      }
    );
  }

  getData():void{
    console.log(this.data);
    this.source.localdata = this.customDate(this.data);
    this.dataAdapter = new jqx.dataAdapter(this.source);
  }

  customDate(list: any[]): any[] {
    list.forEach(unitItem => {
        unitItem.ngay = unitItem.date? DateUtil.formatDate(unitItem.date):null;
    });
    return list;
  }

  public dismiss(): void {
    this.activeModal.dismiss();
  }

  public assignWork():void {
    if(!this.selectedStaff) {
      this.notificationService.showWarning('Vui lòng chọn nhân sự',"Cảnh báo!");
      return;
    }

    this.data.forEach((unitItem) => {
      unitItem.nhanVienId = this.selectedStaff;
      unitItem.date = moment(new Date()).format('YYYYMMDDHHmmss')
      unitItem.status = 1;
    });

    const entity ={
      dataList: this.data
    }
    this.service.postOption(entity, this.REQUEST_DATA_URL, "/assignWork").subscribe(
      (res: HttpResponse<any>) => {
        this.activeModal.close();
        this.notificationService.showSuccess(`${res.body.MESSAGE}`,"Thông báo!");
      },
      (error: any) => {
        this.notificationService.showError(`${error.body.MESSAGE}`,"Thông báo lỗi!");
      }
    );
  }
}
