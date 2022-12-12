import { HttpResponse } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DanhMucService } from 'app/danhmuc.service';
import { ConfirmationDialogService } from 'app/layouts/confirm-dialog/confirm-dialog.service';
import { NotificationService } from 'app/notification.service';
import { jqxGridComponent } from 'jqwidgets-ng/jqxgrid';
import $ from "jquery";
import { ActivatedRoute } from '@angular/router';
import { ThemSuaProductComponent } from 'app/shared/popup/them-sua-product/them-sua-product.component';
@Component({
    selector: 'product-cmp',
    templateUrl: 'product.component.html'
})

export class ProductComponent implements OnInit, AfterViewInit {
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
            { text: 'Giá bán', editable: false, datafield: 'giaBan', 'width': '15%'},
            { text: 'Giá nhập', editable: false, datafield: 'giaNhap', 'width': '15%'},
            { text: 'Ghi chú', editable: false, datafield: 'note', 'width': '15%' },
            
        ];

    REQUEST_URL = "/api/v1/product";

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

    shopCode = '';
    constructor(
        private dmService: DanhMucService,
        private notificationService: NotificationService,
        private confirmDialogService: ConfirmationDialogService,
        private modalService: NgbModal,
        private route: ActivatedRoute
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
                    { name: 'note', type: 'string' },
                    { name: 'shopcode', type: 'string' },
                    { name: 'giaBan', type: 'number' },
                    { name: 'giaNhap', type: 'number' },
                    { name: 'status', type: 'number' }
                ],
            id: 'id',
            datatype: 'array'
        };
        this.dataAdapter = new jqx.dataAdapter(this.source);
    }

    ngOnInit() {
        this.route.queryParams
        .subscribe(params => {
            console.log(params); // { orderby: "price" }
            this.shopCode = params.shopcode;
            this.loadData();
        }
        );

        this.loadData();
    }
    ngAfterViewInit(): void {
        this.myGrid.pagesizeoptions(this.pageSizeOptions);
      }
    public loadData() {
        this.selectedEntity = null;
        this.dmService.getOption(null, this.REQUEST_URL, "?status=1&shopCode="+this.shopCode).subscribe(
            (res: HttpResponse<any>) => {
                this.listEntity = res.body.RESULT;
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
        const modalRef = this.modalService.open(ThemSuaProductComponent, { size: 'l' });
        modalRef.componentInstance.data = this.selectedEntity;
        modalRef.componentInstance.shopcode = this.shopCode;
        modalRef.componentInstance.title = "Cập nhật sản phẩm"
        modalRef.result.then(
            () => {
                this.loadData();

            },
            () => { }
        );
    }
    public createData() {
        const modalRef = this.modalService.open(ThemSuaProductComponent, { size: 'l' });
        modalRef.componentInstance.data = null;
        modalRef.componentInstance.shopcode = this.shopCode;
        modalRef.componentInstance.title = "Thêm sản phẩm";
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
        const modalRef = this.modalService.open(ThemSuaProductComponent, { size: 'xl' });
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
    public onRowdblclick(event:any):void{
        this.selectedEntity = event.args.row.bounddata;
        this.updateData();
    }
}
