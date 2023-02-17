import { HttpResponse } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DanhMucService } from 'app/danhmuc.service';
import { ConfirmationDialogService } from 'app/layouts/confirm-dialog/confirm-dialog.service';
import { NotificationService } from 'app/notification.service';
import { ThemSuaXoaCostComponent } from 'app/shared/popup/them-sua-xoa-cost/them-sua-xoa-cost.component';
import { jqxGridComponent } from 'jqwidgets-ng/jqxgrid';
import $ from "jquery";
import { GanShopComponent } from 'app/shared/popup/gan-shop/gan-shop.component';
import { LocalStorageService } from 'ngx-webstorage';
import * as Highcharts from 'highcharts'
import { DateRanges, TimePeriod } from 'ngx-daterangepicker-material/daterangepicker.component';
import dayjs from 'dayjs/esm';
// import * as Highcharts from 'highcharts';
import moment from 'moment';
@Component({
    selector: 'cost-cmp',
    templateUrl: './cost.component.html'
})

export class CostComponent implements OnInit, AfterViewInit {
    @ViewChild('gridReference') myGrid: jqxGridComponent;
    chartOptions: any;
    source: any;
    visibleTrigger = false
    visible={display:"none"};
    listStatus = [
        { id: 0, label: "Chờ xử lý" },
        { id: 1, label: "Đang xử lý" },
    ];
    dateRange: TimePeriod = {
        startDate: dayjs().startOf('month'),
        endDate: dayjs().endOf('month')
    };
    ranges: DateRanges = {
        ['Hôm nay']: [dayjs(), dayjs()],
        ['Hôm qua']: [dayjs().subtract(1, 'days'), dayjs().subtract(1, 'days')],
        ['Tháng này']: [dayjs().startOf('month'), dayjs().endOf('month')],
    };
    dateChart= [];
    valueChart= [];
    dataAdapter: any;
    columns: any[] =
        [
            {
                text: '#', sortable: false, filterable: false, editable: false,
                groupable: false, draggable: false, resizable: false,
                datafield: '', columntype: 'number', width: '5%',
                cellsrenderer: (row: number, column: any, value: number): string => {
                    return '<div style="margin: 4px;">' + (value + 1) + '</div>';
                }
            },
            { text: 'code', editable: false, datafield: 'code', 'width': '10%' },
            { text: 'Tên chi phí', editable: false, datafield: 'name', 'width': '10%' },
            {
                text: 'Trạng thái', editable: false, datafield: 'status', 'width': '10%', cellsrenderer: (row: number, column: any, value: number): string => {
                    switch (value) {
                        case 0:
                            {
                                return '<div class="div-center text-white bg-danger">' + 'Khóa' + '</div>';
                            }
                        case 1:
                            {
                                return '<div class="bg-success div-center text-white">' + 'Kích hoạt' + '</div>';
                            }

                        default:
                            {
                                return '<div></div>';
                            }
                    }
                }
            },
            {
                text: 'Chi phí theo ngày', editable: false, datafield: 'costPerDay', 'width': '10%', cellsrenderer: (row: number, column: any, value: number): string => {
                    return '<div class="div-center">' + this.formatCurrency(value) + '</div>';
                }
            },
            { text: 'Số ngày', editable: false, datafield: 'numOfDay', 'width': '10%' },
            {
                text: 'Tổng chi phí', editable: false, datafield: 'totalCost', 'width': '10%', cellsrenderer: (row: number, column: any, value: number): string => {
                    return '<div class="div-center">' + this.formatCurrency(value) + '</div>';;
                }
            },
            {
                text: 'Từ ngày', editable: false, datafield: 'fromDate', 'width': '10%', cellsrenderer: (row: number, column: any, value: number): string => {
                    if (value) {
                        let temp = value.toString().slice(0, 4) + "/" + value.toString().slice(4, 6) + "/" + value.toString().slice(6);
                        return '<div class="div-center">' + temp + '</div>';
                    } else {
                        return '<div class="div-center"></div>';
                    }
                }
            },
            {
                text: 'Đến ngày', editable: false, datafield: 'toDate', 'width': '10%', cellsrenderer: (row: number, column: any, value: number): string => {
                    if (value) {
                        let temp = value.toString().slice(0, 4) + "/" + value.toString().slice(4, 6) + "/" + value.toString().slice(6);
                        return '<div class="div-center">' + temp + '</div>';
                    } else {
                        return '<div class="div-center"></div>';
                    }
                }
            },
            { text: 'Số đơn', editable: false, datafield: 'numOfOrder', 'width': '10%' },
            { text: 'Loại chi phí', editable: false, datafield: 'costType', 'width': '5%' }
        ];

    REQUEST_URL = "/api/v1/cost";

    listEntity = [];

    info: any;

    selectedEntity: any;
    height: any = $(window).height()! - 270;
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

    constructor(
        private dmService: DanhMucService,
        private notificationService: NotificationService,
        private confirmDialogService: ConfirmationDialogService,
        private modalService: NgbModal,
        private localStorage: LocalStorageService
    ) {
        this.source =
        {
            localdata: [],
            datafields:
                [
                    { name: 'id', type: 'number' },
                    { name: 'code', type: 'string' },
                    { name: 'name', type: 'string' },
                    { name: 'status', type: 'number' },
                    { name: 'costPerDay', type: 'double' },
                    { name: 'numOfDay', type: 'number' },
                    { name: 'totalCost', type: 'number' },
                    { name: 'fromDate', type: 'number' },
                    { name: 'toDate', type: 'number' },
                    { name: 'numOforder', type: 'number' },
                    { name: 'costType', type: 'number' },
                ],
            id: 'id',
            datatype: 'array'
        };
        this.dataAdapter = new jqx.dataAdapter(this.source);
        this.info = this.localStorage.retrieve('authenticationtoken');
    }

    ngOnInit() {
        // this.loadData();
    }
    ngAfterViewInit(): void {
        this.myGrid.pagesizeoptions(this.pageSizeOptions);
    }
    public  loadData() {
        var date = JSON.parse(JSON.stringify(this.dateRange));
        date.endDate = date.endDate.replace("23:59:59", "00:00:00");
        let startDate = moment(date.startDate, 'YYYYMMDD');
        let endDate = moment(date.endDate, 'YYYYMMDD');
        this.dmService.getOption(null, this.REQUEST_URL, "/getallcostbytimerange?startDate=" + startDate.format("YYYYMMDD")+'&endDate=' + endDate.format("YYYYMMDD")).subscribe(
            (res: HttpResponse<any>) => {
                this.listEntity = res.body.RESULT;
                setTimeout(() => {
                    this.source.localdata = res.body.RESULT;
                    this.dataAdapter = new jqx.dataAdapter(this.source);
                    this.myGrid.clearselection();
                    this.loadDataChart(this.listEntity);
                }, 200);
            },
            () => {
                console.error();
            }
        );

    }
    public loadDataChart(arr:any){
        let a = [];
        let b = []
        for(let item of arr){
            let date =  item.fromDate + "-" + item.toDate;
            let value =  item.totalCost;
            a.push(date);
            b.push(value);
        }
        this.dateChart = a;
        this.valueChart = b;
        console.log(this.dateChart);
        console.log(this.valueChart);
        
        this.createChart();
    }
    public updateData() {
        if (!this.selectedEntity) {
            this.notificationService.showWarning('Vui lòng chọn dữ liệu', "Cảnh báo!");
            return;
        }
        const modalRef = this.modalService.open(ThemSuaXoaCostComponent, { size: 'l' });
        modalRef.componentInstance.data = this.selectedEntity;
        modalRef.componentInstance.title = "Cập nhật code type"
        modalRef.result.then(
            () => {
                this.loadData();

            },
            () => { }
        );
    }
    public createData() {
        const modalRef = this.modalService.open(ThemSuaXoaCostComponent, { size: 'l' });
        modalRef.componentInstance.data = null;
        modalRef.componentInstance.title = "Tạo code type";
        modalRef.result.then(
            () => {
                this.loadData();
            },
            () => { }
        );
    }
    public phanQuyenShop() {
        if (!this.selectedEntity) {
            this.notificationService.showWarning('Vui lòng chọn dữ liệu', "Cảnh báo!");
            return;
        }
        const modalRef = this.modalService.open(GanShopComponent, { size: 'xl' });
        modalRef.componentInstance.data = this.selectedEntity;
        modalRef.result.then(
            () => {
                this.loadData();
            },
            () => { }
        );
    }
    public deleteData() {
        if (!this.selectedEntity) {
            this.notificationService.showWarning('Vui lòng chọn dữ liệu', "Cảnh báo!");
            return;
        }
        this.confirmDialogService
            .confirm('Bạn có thật sự muốn xóa bản ghi này?', 'Đồng ý', 'Hủy')
            .then((confirmed: any) => {
                if (confirmed) {
                    this.dmService.delete(this.selectedEntity.id, "/api/v1/cost/deleteById").subscribe(

                        (res: HttpResponse<any>) => {
                            if (res.body.CODE === 200) {
                                this.notificationService.showSuccess("Xóa thành công", "Success");
                                setTimeout(() => {
                                    this.loadData();
                                }, 100);
                            }
                            else {
                                this.notificationService.showError("Xóa thất bại", "Fail");
                            }
                        },
                        () => {
                            console.error();
                        }
                    );
                }
            })
            .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));

    }
    public onRowSelect(event: any): void {
        this.selectedEntity = event.args.row;
    }
    public onRowdblclick(event: any): void {
        this.selectedEntity = event.args.row.bounddata;
        this.updateData();
    }
    public formatCurrency(value: number): String {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'VND' }).format(value);
    }
    toggleCollapse(): void {
        if(this.visibleTrigger == false){
            this.visible.display = "block";
            this.visibleTrigger = true;
        }else{
            this.visibleTrigger = false;
            this.visible.display = "none";
        }
    }
    createChart(): void {
        this.chartOptions = {
            chart: {
                type: "column"
            },
            title: {
                text: 'Thống kê chi phí'
            },
            xAxis: {
                categories: this.dateChart,
                crosshair: true
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Chi phí'
                }
            },
            series: [{
                name: 'Thời gian',
                data: this.valueChart,
            }]
        }
        this.chartOptions.series.setVisible
        Highcharts.chart("chart", this.chartOptions);
    }

}
