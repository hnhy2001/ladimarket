import { HttpResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild, ElementRef , AfterViewInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DanhMucService } from 'app/danhmuc.service';
import { ConfirmationDialogService } from 'app/layouts/confirm-dialog/confirm-dialog.service';
import { NotificationService } from 'app/notification.service';
import { ChuyenTrangThaiPopUpComponent } from 'app/shared/popup/chuyen-trang-thai-pop-up/chuyen-trang-thai-pop-up.component';
import { GiaoViecPopUpComponent } from 'app/shared/popup/giao-viec-pop-up/giao-viec-pop-up.component';
import { TongKetDuLieuPopupComponent } from 'app/shared/popup/tong-ket-du-lieu/TongKetDuLieuPopup.component';
import { TuDongGiaoViecComponent } from 'app/shared/popup/tu-dong-giao-viec/tu-dong-giao-viec.component';
import { XuLyDuLieuPopupComponent } from 'app/shared/popup/xu-ly-du-lieu/XuLyDuLieuPopup.component';
import DateUtil from 'app/shared/util/date.util';
import dayjs from 'dayjs/esm';

import { jqxGridComponent } from 'jqwidgets-ng/jqxgrid';
import * as moment from 'moment';
import { DateRanges, TimePeriod } from 'ngx-daterangepicker-material/daterangepicker.component';
import { LocalStorageService } from 'ngx-webstorage';
import * as XLSX from 'xlsx';  

@Component({
    selector: 'statistic-sale',
    templateUrl: 'statistic-performance-sale.component.html'
})

export class StatisticPerformanceSaleComponent implements OnInit, AfterViewInit{
    @ViewChild('gridReference') myGrid: jqxGridComponent;
    @ViewChild('TABLE', { static: false }) TABLE: ElementRef;  
    // grid
    source: any
    dataAdapter: any;
    columns: any[] =
    [
        {
            text: '#', sortable: false, filterable: false, editable: false, width: '5%',
            groupable: false, draggable: false, resizable: false,
            datafield: '', columntype: 'number', 
            cellsrenderer: (row: number, column: any, value: number): string => {
                return '<div style="position: relative;top: 50%;left: 4px;transform: translateY(-50%);">' + (value + 1) + '</div>';
            }
        },
        { text: 'Tên sale', editable: false, datafield: 'fullName', width: '23%'},
        { text: 'Đơn giao', editable: false, datafield: 'donGiao', width: '23%'},
        { text: 'Đơn hoàn thành', editable: false, datafield: 'donHoanThanh', width: '23%'},
        { text: 'Đơn thành công', editable: false, datafield: 'donThanhCong', width: '23%'},

    ];
    height: any = $(window).height()! - 240;
    localization: any = {
      pagergotopagestring: 'Trang',
      pagershowrowsstring: 'Hiển thị',
      pagerrangestring: ' của ',
      emptydatastring: 'Không có dữ liệu hiển thị',
      filterstring: 'Nâng cao',
      filterapplystring: 'Áp dụng',
      filtercancelstring: 'Huỷ bỏ'
    };
    pageSizeOptions = ['10', '25', '50', '100'];
    // chung
    REQUEST_URL ="/api/v1/work";
    listEntity = [];
    selectedEntity:any;
    public searchKey = '';
    statusDto: any = '';
    data:any = [];
    // date
    dateRange: TimePeriod = {
        startDate: dayjs().subtract(6, 'days'),
        endDate: dayjs().add(1, 'days')
      };;
    date: object;
    ranges: DateRanges = {
        ['Hôm nay']: [dayjs(), dayjs()],
        ['Hôm qua']: [dayjs().subtract(1, 'days'), dayjs().subtract(1, 'days')],
        ['7 Ngày qua']: [dayjs().subtract(6, 'days'), dayjs()],
        ['30 Ngày qua']: [dayjs().subtract(29, 'days'), dayjs()],
        ['Tháng này']: [dayjs().startOf('month'), dayjs().endOf('month')],
        ['Tháng trước']: [dayjs().subtract(1, 'month').startOf('month'), dayjs().subtract(1, 'month').endOf('month')],
        ['3 Tháng trước']: [dayjs().subtract(3, 'month').startOf('month'), dayjs().subtract(1, 'month').endOf('month')]
    };

    info:any;
    countList = [0,0,0,0,0,0,0,0];
    shopCode = '';
    tongDoanhSo = 0;

    constructor(
        private dmService: DanhMucService,
        private notificationService: NotificationService,
        private confirmDialogService: ConfirmationDialogService,
        private modalService: NgbModal,
        private localStorage: LocalStorageService,
        private route: ActivatedRoute
    ){
        this.source =
        {
            localdata: [],
            datafields:
            [
                { name: 'id', type: 'number' },
                { name: 'fullName', type: 'string' },
                { name: 'donGiao', type: 'number' },
                { name: 'donHoanThanh', type: 'number' },
                { name: 'donThanhCong', type: 'number' },
            ],
            id:'id',
            datatype: 'array'
        };
        this.dataAdapter = new jqx.dataAdapter(this.source);

        this.info = this.localStorage.retrieve("authenticationToken");
    }

    ngOnInit(){
        this.loadData()
    }

    ngAfterViewInit(): void {
        this.myGrid.pagesizeoptions(this.pageSizeOptions);
      }

      getByStatus(e):void{
        this.statusDto = e;
        this.loadData();
      }

    public loadData(){
        var date = JSON.parse(JSON.stringify(this.dateRange));
        date.endDate = date.endDate.replace("23:59:59","00:00:00");
        let startDate = moment(date.startDate).format('YYYYMMDD') + '000000';
        let endDate = moment(date.endDate).format('YYYYMMDD') + '235959';
        this.dmService.getOption(null, this.REQUEST_URL,"/statisticperformancesale?startDate=" + startDate + '&endDate=' + endDate).subscribe(
            (res: HttpResponse<any>) => {
              setTimeout(() => {
                this.listEntity = res.body.RESULT;
                this.source.localdata = this.listEntity;
                console.log( this.source.localdata);
                this.dataAdapter = new jqx.dataAdapter(this.source);
                this.myGrid.clearselection();
              }, 200);
            },
            () => {
              console.error();
            }
          );
    }

    public onProcessData():void{
        if(!this.selectedEntity) {
            this.notificationService.showWarning('Vui lòng chọn dữ liệu',"Cảnh báo!");
            return;
        }
        const modalRef = this.modalService.open(XuLyDuLieuPopupComponent, { size: 'xl' });
        modalRef.componentInstance.data = this.selectedEntity;
        modalRef.result.then(
            () => {
              this.loadData();
             
            },
            () => {}
          );
    }
    public onRowSelect(event:any):void{
        this.selectedEntity = this.listEntity[Number(event.args.rowindex)];
    }

    public onRowdblclick(event:any){
        console.log(event);
        const modalRef = this.modalService.open(XuLyDuLieuPopupComponent, { size: 'xl' });
        modalRef.componentInstance.data = this.listEntity[Number(event.args.rowindex)];
        modalRef.result.then(
            () => {
              this.loadData();
             
            },
            () => {}
        );
    }

    refresh():void{
        this.statusDto = '';
        this.loadData();
    }

    formatDate(date:any){
        return DateUtil.formatDate(date);
    }
}
