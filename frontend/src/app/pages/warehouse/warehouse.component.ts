import { HttpResponse } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DanhMucService } from 'app/danhmuc.service';
import { ConfirmationDialogService } from 'app/layouts/confirm-dialog/confirm-dialog.service';
import { NotificationService } from 'app/notification.service';
import { jqxGridComponent } from 'jqwidgets-ng/jqxgrid';
import $ from "jquery";
import { GanShopComponent } from 'app/shared/popup/gan-shop/gan-shop.component';
import { LocalStorageService } from 'ngx-webstorage';
import { ThemSuaXoaWarehouseComponent } from 'app/shared/popup/them-sua-xoa-warehouse/them-sua-xoa-warehouse.component';
@Component({
    selector: 'account-cmp',
    templateUrl: 'warehouse.component.html'
})

export class WarehouseComponent implements OnInit, AfterViewInit {
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
            { text: 'code', editable: false, datafield: 'code', 'width': '17%' },
            { text: 'Tên kho', editable: false, datafield: 'name', 'width': '17%' },
            { text: 'Địa chỉ', editable: false, datafield: 'address', 'width': '30%' },
            { text: 'Sản phẩm kho', editable: false, datafield: 'configShop', 'width': '15%' },
            { text: 'SĐT', editable: false, datafield:'phoneNumber',  'width': '17%' },
        ];

    REQUEST_URL = "/api/v1/warehouse";

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
                    { name: 'address', type: 'string' },
                    { name: 'configShop', type: 'string' },
                    { name: 'phoneNumber', type: 'string' },
                ],
            id: 'id',
            datatype: 'array'
        };
        this.dataAdapter = new jqx.dataAdapter(this.source);
        this.info = this.localStorage.retrieve('authenticationtoken');
    }

    ngOnInit() {
        this.loadData();
    }
    ngAfterViewInit(): void {
        this.myGrid.pagesizeoptions(this.pageSizeOptions);
      }
    public loadData() {
        if(this.info.role !== 'admin') return;
        this.selectedEntity = null;
        this.dmService.getOption(null, this.REQUEST_URL, "/getAll").subscribe(
            (res: HttpResponse<any>) => {
                this.listEntity = res.body;
                setTimeout(() => {
                    this.source.localdata = res.body.RESULT;
                    console.log(this.source);
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
            this.notificationService.showWarning('Vui lòng chọn dữ liệu', "Cảnh báo!");
            return;
        }
        const modalRef = this.modalService.open(ThemSuaXoaWarehouseComponent, { size: 'l' });
        modalRef.componentInstance.data = this.selectedEntity;
        modalRef.componentInstance.title = "Cập nhật kho"
        modalRef.result.then(
            () => {
                this.loadData();

            },
            () => { }
        );
    }
    public createData() {
        const modalRef = this.modalService.open(ThemSuaXoaWarehouseComponent, { size: 'l' });
        modalRef.componentInstance.data = null;
        modalRef.componentInstance.title = "Tạo kho";
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
                    this.dmService.delete(this.selectedEntity.id, "/api/v1/warehouse/deleteById").subscribe(

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
        console.log(this.selectedEntity);
    }
    public onRowdblclick(event:any):void{
        this.selectedEntity = event.args.row.bounddata;
        this.updateData();
    }
    
}
