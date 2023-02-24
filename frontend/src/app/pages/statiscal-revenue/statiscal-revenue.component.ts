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
    selector: 'revenue-statiscal',
    templateUrl: './statiscal-revenue.component.html'
})

export class StatiscalRevenueComponent implements OnInit, AfterViewInit {
    @ViewChild('gridReference') myGrid: jqxGridComponent;
    source: any;
    dataGridList = [];
    chartOptions: any;
    visibleTrigger = false
    visible = { display: "none" };
    startDate: String;
    endDate: String;
    moi = 0;
    dangXuLy = 0;
    thatBai = 0;
    thanhCong = 0;
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
        ['7 Ngày qua']: [dayjs().subtract(6, 'days'), dayjs()],
        // ['30 Ngày qua']: [dayjs().subtract(29, 'days'), dayjs()],
        ['Tháng này']: [dayjs().startOf('month'), dayjs().endOf('month')],
        ['Tháng trước']: [dayjs().subtract(1, 'month').startOf('month'), dayjs().subtract(1, 'month').endOf('month')],
        // ['3 Tháng trước']: [dayjs().subtract(3, 'month').startOf('month'), dayjs().subtract(1, 'month').endOf('month')]
    };
    listPieChart = [];
    dateChart = [];
    valueChart = [];
    optionChart = 1;
    chartPieOptions: any;
    dataAdapter: any;
    typeShow = 1;
    today = new Date();
    month = this.today.getMonth() + 1;
    year = this.today.getFullYear();
    shopCode = 'KHBOM';
    refundRate = 0;
    shopCodeList = [];
    REQUEST_URL = "/api/v1/data";
    listEntity = [];
    info: any;
    selectedEntity: any;
    height: any = $(window).height()! - 270;
    data = '';
    value = '';
    localization: any = {
        pagergotopagestring: 'Trang',
        pagershowrowsstring: 'Hiển thị',
        pagerrangestring: ' của ',
        emptydatastring: 'Không có dữ liệu hiển thị',
        filterstring: 'Nâng cao',
        filterapplystring: 'Áp dụng',
        filtercancelstring: 'Huỷ bỏ'
    };
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
            { text: 'Tên utm', editable: false, datafield: 'utm', 'width': '25%' },
            { text: 'Tổng tiền', editable: false, datafield: 'price', 'width': '25%', cellsrenderer: (row: number, column: any, value: number): string => {
                return '<div class="div-center">' + this.formatCurrency(value) + '</div>';
            }},
            { text: 'Số lượng', editable: false, datafield: 'count', 'width': '20%' },
            { text: 'Tiền/Đơn', editable: false, datafield: 'price_order', 'width': '25%', cellsrenderer: (row: number, column: any, value: number): string => {
                return '<div class="div-center">' + this.formatCurrency(value) + '</div>';;
            }}
        ];

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
                    { name: 'utm', type: 'string' },
                    { name: 'price', type: 'number' },
                    { name: 'count', type: 'number' },
                    { name: 'price_order', type: 'number' },
                ],
            id: 'id',
            datatype: 'array'
        };
        this.dataAdapter = new jqx.dataAdapter(this.source);
        this.info = this.localStorage.retrieve('authenticationtoken');
    }

    ngOnInit() {
        this.statistic();
    }
    ngAfterViewInit(): void {
    }
    public loadData() {
        this.moi = 0;
        this.dangXuLy = 0;
        this.thatBai = 0;
        this.thanhCong = 0;
        this.dmService.getOption(null, this.REQUEST_URL, "/statisticdatabydateandstatus?startDate=" + this.startDate + "&endDate=" + this.endDate + "&shopCode=" + this.shopCode).subscribe(
            (res: HttpResponse<any>) => {
                this.listPieChart = res.body.RESULT;
                setTimeout(() => {
                    for (let item of this.listPieChart) {
                        if (item.status == 0) {
                            this.moi += (item.count);
                        } else if (item.status == 2 || item.status == 3 || item.status == 4 || item.status == 5 || item.status == 1) {
                            this.dangXuLy += (item.count);
                        } else if (item.status == 6) {
                            this.thatBai += (item.count);
                        } else {
                            this.thanhCong += (item.count);
                        }
                    }
                    this.loadDataChart();
                }, 200);
            },
            () => {
                console.error();
            }
        );
        if (this.optionChart == 1) {
            this.data = " Doanh thu";
            this.value = "Theo Doanh thu";
            this.dmService.getOption(null, this.REQUEST_URL, "/thongkedoanhthutheongay?startDate=" + this.startDate + '&endDate=' + this.endDate + "&shopCode=" + this.shopCode).subscribe(
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
        } else {
            this.data = " theo UTM";
            this.value = "Theo Doanh thu";
            var date = JSON.parse(JSON.stringify(this.dateRange));
            date.endDate = date.endDate.replace("23:59:59", "00:00:00");
            this.startDate = moment(date.startDate).format('YYYYMMDD');
            this.endDate = moment(date.endDate).format('YYYYMMDD');
            this.dmService.getOption(null, this.REQUEST_URL, "/thongkeutm?startDate=" + this.startDate + '&endDate=' + this.endDate + "&shopCode=" + this.shopCode).subscribe(
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

    }
    changeTypeShow() {

    }
    public loadDataChart() {
        this.dateChart = [];
        this.valueChart = [];
        if (this.optionChart == 1) {
            if (this.typeShow == 1) {
                let date = moment().format("YYYY") + "/" + this.month;
                let numOfDay = parseInt(moment(date).endOf("month").format("DD"));
                for (let i = 0; i < numOfDay; i++) {
                    this.dateChart.push(this.formatDay(i + 1));
                    this.valueChart.push(0)
                    for (let item of this.listEntity) {
                        if (this.dateChart[i] == item.date.toString().slice(6) + "/" + item.date.toString().slice(4, 6) + "/" + item.date.toString().slice(0, 4)) {
                            this.valueChart[i] = (this.valueChart[i] + item.revenue) * (1 - this.refundRate / 100.0);

                        }
                    }
                }
                this.createChart();
            } else if (this.typeShow == 2) {
                let results = [
                    {
                        date: "Tháng 01",
                        value: 0
                    },
                    {
                        date: "Tháng 02",
                        value: 0
                    },
                    {
                        date: "Tháng 03",
                        value: 0
                    },
                    {
                        date: "Tháng 04",
                        value: 0
                    },
                    {
                        date: "Tháng 05",
                        value: 0
                    },
                    {
                        date: "Tháng 06",
                        value: 0
                    },
                    {
                        date: "Tháng 07",
                        value: 0
                    },
                    {
                        date: "Tháng 08",
                        value: 0
                    },
                    {
                        date: "Tháng 09",
                        value: 0
                    },
                    {
                        date: "Tháng 10",
                        value: 0
                    },
                    {
                        date: "Tháng 11",
                        value: 0
                    },
                    {
                        date: "Tháng 12",
                        value: 0
                    }
                ];
                for (let item of results) {
                    for (let i of this.listEntity) {
                        if (item.date == this.formatMonth(i.date)) {
                            item.value = (item.value + i.revenue);
                        }
                    }
                }
                for (let item of results) {
                    this.dateChart.push(item.date);
                    this.valueChart.push(item.value);
                }
                this.valueChart = this.valueChart.map(item => item * (1 - this.refundRate / 100.0));
                this.createChart();

            } else {
                let temp = [];
                for (let item of this.listEntity) {
                    temp.push(this.formatYear(item.date));
                }
                let set = new Set(temp);
                let mocks = [...set];
                let results = [];
                for (let item of mocks) {
                    let resultItem = {
                        date: item,
                        value: 0
                    }
                    results.push(resultItem);
                }

                for (let item of results) {
                    for (let i of this.listEntity) {
                        if (item.date == this.formatYear(i.date)) {
                            item.value = item.value + i.revenue;
                        }
                    }
                }
                for (let item of results) {
                    this.dateChart.push(item.date);
                    this.valueChart.push(item.value);
                }
                this.createChart();
            }
        } else {
            this.dataGridList = [];
            let mocks = [];
            for (let item of this.listEntity) {
                mocks.push(item.utmMedium)
            }
            let set = new Set(mocks);
            this.dateChart = [...set];
            let countList = [];
            let avgList = [];
            for (let i = 0; i < this.dateChart.length; i++) {
                this.valueChart.push(0);
                countList.push(0);
                avgList.push(0);
                for (let item of this.listEntity) {
                    if (this.dateChart[i] == item.utmMedium) {
                        this.valueChart[i] = this.valueChart[i] + item.price;
                        countList[i] = countList[i] + item.count;
                    }
                }
                this.createChart()
            }
            for (let i = 0; i < this.dateChart.length; i++) {
                let item = {
                    utm: this.dateChart[i],
                    price: this.valueChart[i],
                    count: countList[i],
                    price_order: parseInt((this.valueChart[i] / countList[i]).toFixed(0))
                }
                this.dataGridList.push(item);
            }
            this.source.localdata = this.dataGridList;
            this.dataAdapter = new jqx.dataAdapter(this.source);
            this.myGrid.clearselection();
        }
    }
    formatDay(day) {
        let dateValue;
        if (this.month < 10) {
            if (day < 10) {
                dateValue = "0" + day + "/0" + this.month + "/" + moment().format("YYYY");
            } else {
                dateValue = day + "/0" + this.month + "/" + moment().format("YYYY");
            }
        } else {
            if (day < 10) {
                dateValue = "0" + day + "/" + this.month + "/" + moment().format("YYYY");
            } else {
                dateValue = day + "/" + this.month + "/" + moment().format("YYYY");
            }
        }
        return dateValue;
    }
    formatMonth(date) {

        let dateValue = "Tháng " + date.toString().slice(4, 6);
        return dateValue;
    }
    formatYear(fromDate) {
        let dateValue = "Năm " + fromDate.toString().slice(0, 4);
        return dateValue;
    }

    statistic() {
        if (this.typeShow == 1) {

            let date = moment().format("YYYY") + "/" + this.month;
            this.startDate = moment(date).startOf('month').format("YYYYMMDD");
            this.endDate = moment(date).endOf('month').format("YYYYMMDD");
        } else if (this.typeShow == 2) {
            this.startDate = moment(this.year.toString()).startOf('year').format("YYYYMMDD");
            this.endDate = moment(this.year.toString()).endOf('year').format("YYYYMMDD");
        } else {
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
        this.chartPieOptions = {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie'
            },
            title: {
                text: 'Thống kê theo Trạng Thái'
            },
            tooltip: {
                pointFormat: '{point.name}: <b>{point.percentage:.1f}%</b>'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}</b>: {point.y}'
                    }
                }
            },
            series: [
                {
                    name: 'Brands',
                    colorByPoint: true,
                    data: [
                        {
                            name: 'Đã thành công',
                            y: this.thanhCong
                        },
                        {
                            name: 'Đã hủy',
                            y: this.thatBai
                        },
                        {
                            name: 'Mới',
                            y: this.moi
                        },
                        {
                            name: 'Đang xử lý',
                            y: this.dangXuLy
                        }
                    ],
                    showInLegend: true
                }
            ]
        };

        this.chartOptions = {
            chart: {
                type: "column"
            },
            title: {
                text: 'Thống kê' + this.data
            },
            xAxis: {
                categories: this.dateChart,
                crosshair: true
            },
            yAxis: {
                min: 0,
                title: {
                    text: this.value
                }
            },
            series: [{
                name: this.data,
                data: this.valueChart,
            }]
        }
        this.chartOptions.series.setVisible
        Highcharts.chart("pie-chart", this.chartPieOptions)
        Highcharts.chart("chart", this.chartOptions);
    }
    public formatCurrency(value: number): String {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'VND' }).format(value);
    }

}
