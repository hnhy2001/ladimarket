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
    selector: 'utm-medium-cmp',
    templateUrl: 'utm-medium.component.html'
})

export class UtmMediumComponent implements OnInit, AfterViewInit {
    @ViewChild('gridReference') myGrid: jqxGridComponent;
    source: any
    
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
            { text: 'Nhân viên', editable: false, datafield: 'nhanvien', 'width': '15%' },
            { text: 'Ghi chú', editable: false, datafield: 'note', 'width': '15%' },
           
        ];

    REQUEST_URL = "/api/v1/utmmedium";

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
                    { name: 'note', type: 'string' },
                    { name: 'nhanvien', type: 'string'}
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
        this.dmService.getOption(null, this.REQUEST_URL, "").subscribe(
            (res: HttpResponse<any>) => {
                this.listEntity = res.body.RESULT;
                this.listEntity.forEach(unitItem => {
                    unitItem.nhanvien = unitItem.account? unitItem.account.fullName + " (" + unitItem.account.userName + ")" :'';
                });
                setTimeout(() => {
                    this.source.localdata = this.listEntity;
                    this.dataAdapter = new jqx.dataAdapter(this.source);
                    this.myGrid.clearselection();
                }, 100);
            },
            () => {
                console.error();
            }
        );
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

    public onRowSelect(event: any): void {
        this.selectedEntity = event.args.row;
    }
    public onRowdblclick(event:any):void{
        this.selectedEntity = event.args.row.bounddata;
        this.updateData();
    }
}
