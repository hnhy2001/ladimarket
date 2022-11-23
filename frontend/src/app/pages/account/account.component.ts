import { HttpResponse } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DanhMucService } from 'app/danhmuc.service';
import { ConfirmationDialogService } from 'app/layouts/confirm-dialog/confirm-dialog.service';
import { NotificationService } from 'app/notification.service';
import { ThemSuaXoaAccountComponent } from 'app/shared/popup/them-sua-xoa-account/them-sua-xoa-account.component';
import { jqxGridComponent } from 'jqwidgets-ng/jqxgrid';
import $ from "jquery";
@Component({
    selector: 'account-cmp',
    templateUrl: 'account.component.html'
})

export class AccountComponent implements OnInit, AfterViewInit{
    @ViewChild('gridReference') myGrid: jqxGridComponent;
    source: any
    listStatus = [
        {id: 0,label:"Chờ xử lý"},
        {id: 1,label:"Đang xử lý"},
    ];
    dataAdapter: any;
    columns: any[] =
    [
        {
            text: '#', sortable: false, filterable: false, align: 'center', editable: false,
            groupable: false, draggable: false, resizable: false,
            datafield: '', columntype: 'number',
            cellsrenderer: (row: number, column: any, value: number): string => {
                return '<div style="margin: 4px;">' + (value + 1) + '</div>';
            }
        },
        { text: 'Họ và Tên', editable: false, datafield: 'fullName', width: '20%',align: 'center'},
        { text: 'Tài khoản', editable: false, datafield: 'userName', width: '15%',align: 'center'},
        // { text: 'Mât khẩu', editable: false, datafield: 'passWord' , 'width':'160'},
        { text: 'Email',editable:false ,datafield: 'email' , width: '20%',align: 'center'},
        { text: 'SDT', editable: false, datafield: 'phone' , width: '10%',align: 'center'},
        { text: 'Đia chỉ', editable: false, datafield: 'address' , width: '15%',align: 'center'},
        
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
        { text: 'Ghi chú', editable: false, datafield: 'note' , width: '15%',align: 'center'},

    ];
    height: any = $(window).height()! - 230;
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
    REQUEST_URL ="/api/v1/account";
    
    listEntity = [];

    selectedEntity:any;

    constructor(
        private dmService: DanhMucService,
        private notificationService: NotificationService,
        private confirmDialogService: ConfirmationDialogService,
        private modalService: NgbModal
    ){
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
                
            ],
            id:'id',
            datatype: 'array'
        };
        this.dataAdapter = new jqx.dataAdapter(this.source);
    }

    ngOnInit(){
        this.loadData();
    }

    ngAfterViewInit(): void {
      this.myGrid.pagesizeoptions(this.pageSizeOptions);
    }

    public loadData(){
        this.dmService.getOption(null, this.REQUEST_URL,"/getAll").subscribe(
            (res: HttpResponse<any>) => {
              this.listEntity = res.body;
              setTimeout(() => {
                this.source.localdata = res.body.RESULT;
                console.log(this.source);
                this.dataAdapter = new jqx.dataAdapter(this.source);
              }, 100);
            },
            () => {
              console.error();
            }
          );
    }
    public updateData(){
        if(!this.selectedEntity) {
            this.notificationService.showError('Vui lòng chọn dữ liệu',"Thông báo lỗi!");
            return;
        }
        const modalRef = this.modalService.open(ThemSuaXoaAccountComponent, { size: 'l' });
        modalRef.componentInstance.data = this.selectedEntity;
        modalRef.componentInstance.title = "Cập nhật tài khoản"
        modalRef.result.then(
            () => {
              this.loadData();
             
            },
            () => {}
          );
    }
    public createData(){
        const modalRef = this.modalService.open(ThemSuaXoaAccountComponent, { size: 'l' });
        modalRef.componentInstance.data = null;
        modalRef.componentInstance.title = "Tạo tài khoản";
        modalRef.result.then(
            () => {
              this.loadData();
            },
            () => {}
          );
    }
    public deleteData(){
        if(!this.selectedEntity) {
            this.notificationService.showError('Vui lòng chọn dữ liệu',"Thông báo lỗi!");
            return;
        }
        this.dmService.delete(this.selectedEntity.id, "/api/v1/account/deleteById").subscribe(
            
            (res: HttpResponse<any>) => {
              if(res.body.CODE === 200){
                this.notificationService.showSuccess("Xóa thành công", "Success");
                setTimeout(() => {
                  this.loadData();
                }, 100);
              }
              else{
                this.notificationService.showError("Xóa thất bại", "Fail");
        
              }
            },
            () => {
              console.error();
              
            }
          );
    }
    public onRowSelect(event:any):void{
        this.selectedEntity = event.args.row;
    }
}
