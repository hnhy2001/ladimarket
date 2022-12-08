import { HttpResponse } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DanhMucService } from 'app/danhmuc.service';
import { ConfirmationDialogService } from 'app/layouts/confirm-dialog/confirm-dialog.service';
import { NotificationService } from 'app/notification.service';
import { ThemSuaXoaAccountComponent } from 'app/shared/popup/them-sua-xoa-account/them-sua-xoa-account.component';
import { jqxGridComponent } from 'jqwidgets-ng/jqxgrid';
import $ from "jquery";
import { GanShopComponent } from 'app/shared/popup/gan-shop/gan-shop.component';
import { LocalStorageService } from 'ngx-webstorage';
@Component({
    selector: 'account-cmp',
    templateUrl: 'account.component.html'
})

export class AccountComponent implements OnInit, AfterViewInit {
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
            { text: 'Tài khoản', editable: false, datafield: 'userName', 'width': '15%' },
            { text: 'Họ và Tên', editable: false, datafield: 'fullName', 'width': '15%' },
            // { text: 'Mât khẩu', editable: false, datafield: 'passWord' , 'width':'160'},
            { text: 'Email', editable: false, datafield: 'email', 'width': '15%' },
            { text: 'SDT', editable: false, datafield: 'phone', 'width': '15%' },
            { text: 'Đia chỉ', editable: false, datafield: 'address', 'width': '15%' },

            // { 
            //     text: 'Trạng thái', editable: false, datafield: 'status' , 'width':'80',
            //     filteritems: new jqx.dataAdapter(this.listStatus), displayfield: 'label',
            //     createfilterwidget: (column: any, htmlElement: any, editor: any): void => {
            //         editor.jqxDropDownList({ displayMember: 'label', valueMember: 'id' });
            //     },
            //     cellsrenderer: (row: number, column: any, value: number): string => {
            //         if(value === 0)
            //         {
            //             return '<div style="background-color:aqua;color:white; padding: 5px; width:100%; height:20px">Đang xử lý</div>'
            //         }
            //     }
            // },
            { text: 'Phân quyền', editable: false, datafield: 'role', 'width': '10%' },
            { text: 'Ghi chú', editable: false, datafield: 'note', 'width': '10%' },

        ];

    REQUEST_URL = "/api/v1/account";

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
                    { name: 'userName', type: 'string' },
                    { name: 'passWord', type: 'string' },
                    { name: 'email', type: 'string' },
                    { name: 'phone', type: 'string' },
                    { name: 'address', type: 'string' },
                    { name: 'fullName', type: 'string' },
                    { name: 'note', type: 'string' },
                    { name: 'role', type: 'string' },
                    { name: 'formcolor', type: 'string' },
                    { name: 'shop', type: 'string' },

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
        const modalRef = this.modalService.open(ThemSuaXoaAccountComponent, { size: 'l' });
        modalRef.componentInstance.data = this.selectedEntity;
        modalRef.componentInstance.title = "Cập nhật tài khoản"
        modalRef.result.then(
            () => {
                this.loadData();

            },
            () => { }
        );
    }
    public createData() {
        const modalRef = this.modalService.open(ThemSuaXoaAccountComponent, { size: 'l' });
        modalRef.componentInstance.data = null;
        modalRef.componentInstance.title = "Tạo tài khoản";
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
                    this.dmService.delete(this.selectedEntity.id, "/api/v1/account/deleteById").subscribe(

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
