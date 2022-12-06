import { HttpResponse } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DanhMucService } from 'app/danhmuc.service';
import { ConfirmationDialogService } from 'app/layouts/confirm-dialog/confirm-dialog.service';
import { NotificationService } from 'app/notification.service';
import { jqxGridComponent } from 'jqwidgets-ng/jqxgrid';
import $ from "jquery";
import { ThemSuaShopComponent } from 'app/shared/popup/them-sua-shop/them-sua-shop.component';
import { ThongTinCauHinhComponent } from 'app/shared/popup/thong-tin-cau-hinh/thong-tin-cau-hinh.component';
@Component({
    selector: 'shop-cmp',
    templateUrl: 'shop.component.html'
})

export class ShopComponent implements OnInit, AfterViewInit {
    @ViewChild('gridReference') myGrid: jqxGridComponent;
    source: any
    listStatus = [
        { id: 0, label: "Chờ xử lý" },
        { id: 1, label: "Đang xử lý" },
    ];
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
            { text: 'Mã', editable: false, datafield: 'code', 'width': '15%' },
            { text: 'Tên', editable: false, datafield: 'name', 'width': '35%'},
            { text: 'Url', editable: false, datafield: 'url', 'width': '15%' },
            { text: 'Ghi chú', editable: false, datafield: 'note', 'width': '15%' },
            { text: 'Trạng thái', editable: false, datafield: 'trangThai', 'width': '15%' }
        ];

    REQUEST_URL = "/api/v1/shop";

    listEntity = [];

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
        private modalService: NgbModal
    ) {
        this.source =
        {
            localdata: [],
            datafields:
                [
                    { name: 'id', type: 'number' },
                    { name: 'code', type: 'string' },
                    { name: 'name', type: 'string' },
                    { name: 'status', type: 'string' },
                    { name: 'url', type: 'string' },
                    { name: 'note', type: 'string' },
                    { name: 'trangThai', type: 'string' }
                ],
            id: 'id',
            datatype: 'array'
        };
        this.dataAdapter = new jqx.dataAdapter(this.source);
    }

    ngOnInit() {
        this.loadData();
    }
    ngAfterViewInit(): void {
        this.myGrid.pagesizeoptions(this.pageSizeOptions);
      }
    public loadData() {
        this.selectedEntity = null;
        this.dmService.getOption(null, this.REQUEST_URL, "?status=-1").subscribe(
            (res: HttpResponse<any>) => {
                this.listEntity = res.body;
                setTimeout(() => {
                    this.source.localdata = this.customData(res.body.RESULT);
                    this.dataAdapter = new jqx.dataAdapter(this.source);
                    this.myGrid.clearselection();
                }, 100);
            },
            () => {
                console.error();
            }
        );
    }

    customData(list:any):any{
        list.forEach(unitItem => {
            unitItem.trangThai = unitItem.status === 1? 'Hoạt động' :'Khóa'
        });
        return list;
    }

    public updateData() {
        if (!this.selectedEntity) {
            this.notificationService.showError('Vui lòng chọn dữ liệu', "Thông báo lỗi!");
            return;
        }
        const modalRef = this.modalService.open(ThemSuaShopComponent, { size: 'l' });
        modalRef.componentInstance.data = this.selectedEntity;
        modalRef.componentInstance.title = "Cập nhật shop"
        modalRef.result.then(
            () => {
                this.loadData();

            },
            () => { }
        );
    }
    public createData() {
        const modalRef = this.modalService.open(ThemSuaShopComponent, { size: 'l' });
        modalRef.componentInstance.data = null;
        modalRef.componentInstance.title = "Tạo shop";
        modalRef.result.then(
            () => {
                this.loadData();
            },
            () => { }
        );
    }

    public thongTinCauHinh() {
        if (!this.selectedEntity) {
            this.notificationService.showWarning('Vui lòng chọn dữ liệu', "Cảnh báo!");
            return;
        }
        const modalRef = this.modalService.open(ThongTinCauHinhComponent, { size: 'xl' });
        modalRef.componentInstance.data = this.selectedEntity;
        modalRef.result.then(
            () => {
                this.loadData();
            },
            () => { }
        );
    }
    
    public onRowSelect(event: any): void {
        this.selectedEntity = event.args.row;
    }
}
