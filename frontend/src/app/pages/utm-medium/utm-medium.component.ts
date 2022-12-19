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
import { ActivatedRoute } from '@angular/router';
import { ThemSuaUtmComponent } from 'app/shared/popup/them-sua-utm/them-sua-utm.component';
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
                datafield: '', columntype: 'number', width: '10%',
                cellsrenderer: (row: number, column: any, value: number): string => {
                    return '<div style="margin: 4px;">' + (value + 1) + '</div>';
                }
            },
            { text: 'Mã', editable: false, datafield: 'code', 'width': '30%' },
            { text: 'Nhân viên', editable: false, datafield: 'nhanvien', 'width': '30%' },
            { text: 'Ghi chú', editable: false, datafield: 'note', 'width': '30%' },
           
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
    nhanvienid = '';
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
                    { name: 'note', type: 'string' },
                    { name: 'nhanvien', type: 'string'}
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
            this.nhanvienid = params.id;
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
        const modalRef = this.modalService.open(ThemSuaUtmComponent, { size: 'l' });
        modalRef.componentInstance.data = this.selectedEntity;
        modalRef.componentInstance.title = "Cập nhật utm medium"
        modalRef.result.then(
            () => {
                this.loadData();

            },
            () => { }
        );
    }
    public createData() {
        const modalRef = this.modalService.open(ThemSuaUtmComponent, { size: 'l' });
        modalRef.componentInstance.data = null;
        modalRef.componentInstance.title = "Thêm utm medium";
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
                    this.dmService.delete(this.selectedEntity.id, this.REQUEST_URL+"/deleteById").subscribe(

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
        alert
        this.selectedEntity = this.listEntity[Number(event.args.rowindex)];
    }
    public onRowdblclick(event:any):void{
        this.selectedEntity = this.listEntity[Number(event.args.rowindex)];
        this.updateData();
    }
}
