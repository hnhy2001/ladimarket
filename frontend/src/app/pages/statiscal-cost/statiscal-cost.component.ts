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
    selector: 'cost-statiscal',
    templateUrl: './statiscal-cost.component.html'
})

export class StatiscalCostComponent implements OnInit, AfterViewInit {
    @ViewChild('gridReference') myGrid: jqxGridComponent;
    chartOptions: any;
    visibleTrigger = false
    visible = { display: "none" };
    startDate : String;
    endDate: String;
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
    dateChart = [];
    valueChart = [];
    dataAdapter: any;
    typeShow = 1;
    month = 1;
    year = 2023;
    REQUEST_URL = "/api/v1/cost";
    listEntity = [];
    info: any;
    selectedEntity: any;
    height: any = $(window).height()! - 270;

    constructor(
        private dmService: DanhMucService,
        private notificationService: NotificationService,
        private confirmDialogService: ConfirmationDialogService,
        private modalService: NgbModal,
        private localStorage: LocalStorageService
    ) {
        this.info = this.localStorage.retrieve('authenticationtoken');
    }

    ngOnInit() {
        this.statistic();
    }
    ngAfterViewInit(): void {
    }
    public loadData() {
        this.dmService.getOption(null, this.REQUEST_URL, "/getallcostbytimerange?startDate=" + this.startDate + '&endDate=' + this.endDate).subscribe(
            (res: HttpResponse<any>) => {
                this.listEntity = res.body.RESULT;
                setTimeout(() => {
                    this.loadDataChart();
                }, 200);
            },
            () => {
                console.error();
            }
        );

    }
    changeTypeShow() {

    }
    public loadDataChart() {
        this.dateChart = [];
        this.valueChart = [];
        if (this.listEntity.length == 0) {
            this.createChart();
            return;
        }
        else {
            if (this.typeShow == 1) {
                let totalCost = 0.0;
                for(let item of this.listEntity){
                    totalCost = totalCost + item.totalCost;
                }
                let date = moment().format("YYYY") + "/" + this.month;
                let numOfDay = parseInt(moment(date).endOf("month").format("YYYYMMDD").slice(6)) - parseInt(moment(date).startOf("month").format("YYYYMMDD").slice(6)) + 1;
                for(let i = 0; i < numOfDay; i++){
                    this.dateChart.push(this.formatDay(i+1));
                    this.valueChart.push(totalCost/numOfDay)
                }
                this.createChart();
            }else if(this.typeShow == 2){
                let results = [
                    {
                        date : "Tháng 01",
                        value: 0
                    },
                    {
                        date : "Tháng 02",
                        value: 0
                    },
                    {
                        date : "Tháng 03",
                        value: 0
                    },
                    {
                        date : "Tháng 04",
                        value: 0
                    },
                    {
                        date : "Tháng 05",
                        value: 0
                    },
                    {
                        date : "Tháng 06",
                        value: 0
                    },
                    {
                        date : "Tháng 07",
                        value: 0
                    },
                    {
                        date : "Tháng 08",
                        value: 0
                    },
                    {
                        date : "Tháng 09",
                        value: 0
                    },
                    {
                        date : "Tháng 10",
                        value: 0
                    },
                    {
                        date : "Tháng 11",
                        value: 0
                    },
                    {
                        date : "Tháng 12",
                        value: 0
                    }
                ];
                for(let item of results){
                    for(let i of this.listEntity){
                        if(item.date == this.formatMonth(i.fromDate)){
                            item.value = item.value + i.totalCost;
                        }
                    }
                }
                for(let item of results){
                    this.dateChart.push(item.date);
                    this.valueChart.push(item.value);
                }
                this.createChart();

            }else{
                let temp = [];
                for(let item of this.listEntity){
                    temp.push(this.formatYear(item.fromDate));
                }
                let set = new Set(temp);
                let mocks = [...set];
                let results = [];
                for(let item of mocks){
                    let resultItem = {
                        date : item,
                        value : 0
                    }
                    results.push(resultItem);
                }

                for(let item of results){
                    for(let i of this.listEntity){
                        if(item.date == this.formatYear(i.fromDate)){
                            item.value = item.value + i.totalCost;
                        }
                    }
                }
                for(let item of results){
                    this.dateChart.push(item.date);
                    this.valueChart.push(item.value);
                }
                this.createChart();
            }
        }
    }
    formatDay(day){
        let dateValue = day + "/" + this.month + "/" + moment().format("YYYY")
        return dateValue;
    }
    formatMonth(fromDate){
        let dateValue = "Tháng "+ fromDate.toString().slice(4,6);
        return dateValue;
    }
    formatYear(fromDate){
        let dateValue = "Năm " + fromDate.toString().slice(0,4);
        return dateValue;
    }

    statistic(){
        if(this.typeShow == 1){

            let date = moment().format("YYYY") + "/" + this.month;
            this.startDate = moment(date).startOf('month').format("YYYYMMDD");
            this.endDate = moment(date).endOf('month').format("YYYYMMDD");
        }else if(this.typeShow == 2){
            this.startDate = moment(this.year.toString()).startOf('year').format("YYYYMMDD");
            this.endDate =  moment(this.year.toString()).endOf('year').format("YYYYMMDD");
        }else{
            this.startDate = moment("2021").startOf('year').format("YYYYDDMM");
            this.endDate = moment().format("YYYYDDMM");
        }
        this.loadData()
    }
    formatDateChart(fromDate, toDate): string {
        let dateValue = fromDate.toString().slice(4, 6) + "/" + fromDate.toString().slice(0, 4) + "-" + toDate.toString().slice(4, 6) + "/" + toDate.toString().slice(0, 4);
        return dateValue;
    }
    public onRowSelect(event: any): void {
        this.selectedEntity = event.args.row;
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
