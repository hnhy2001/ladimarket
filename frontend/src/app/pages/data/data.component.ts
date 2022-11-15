import { HttpResponse } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DanhMucService } from 'app/danhmuc.service';
import { ConfirmationDialogService } from 'app/layouts/confirm-dialog/confirm-dialog.service';
import { NotificationService } from 'app/notification.service';
import { TongKetDuLieuPopupComponent } from 'app/shared/popup/TongKetDuLieu/TongKetDuLieuPopup.component';
import { XuLyDuLieuPopupComponent } from 'app/shared/popup/XuLyDuLieuPopup/XuLyDuLieuPopup.component';
import { jqxGridComponent } from 'jqwidgets-ng/jqxgrid';
import * as XLSX from 'xlsx';  


@Component({
    selector: 'data-cmp',
    templateUrl: 'data.component.html'
})

export class DataComponent implements OnInit{
    @ViewChild('gridReference') myGrid: jqxGridComponent;
    @ViewChild('TABLE', { static: false }) TABLE: ElementRef;  

    source: any
    listStatus = [
        {id: 0,label:"Chờ xử lý"},
        {id: 1,label:"Đang xử lý"},
    ];
	getWidth() : any {
		if (document.body.offsetWidth < 850) {
			return '90%';
		}
		
		return 850;
	}
    dataAdapter: any;
    columns: any[] =
    [
        {
            text: '#', sortable: false, filterable: false, editable: false,
            groupable: false, draggable: false, resizable: false,
            datafield: '', columntype: 'number', width: 50,
            cellsrenderer: (row: number, column: any, value: number): string => {
                return '<div style="margin: 4px;">' + (value + 1) + '</div>';
            }
        },
        { text: 'Ngày', editable: false, datafield: 'date'},
        { text: 'Tên KH', editable: false, datafield: 'name', 'width':'160'},
        { text: 'Sản phẩm',editable:false ,datafield: 'formcolor' , 'width':'200'},
        { text: 'SĐT', editable: false, datafield: 'phone' , 'width':'100'},
        { text: 'Địa chỉ', editable: false, datafield: 'street' , 'width':'160'},
        { text: 'Xã', editable: false, datafield: 'ward' , 'width':'80'},
        { text: 'Huyện', editable: false, datafield: 'district' , 'width':'80'},
        { text: 'Tỉnh', editable: false, datafield: 'state' , 'width':'80'},
        { 
            text: 'Trạng thái', editable: false, datafield: 'status' , 'width':'80',
            filteritems: new jqx.dataAdapter(this.listStatus), displayfield: 'label',
            createfilterwidget: (column: any, htmlElement: any, editor: any): void => {
                editor.jqxDropDownList({ displayMember: 'label', valueMember: 'id' });
            },
            cellsrenderer: (row: number, column: any, value: number): string => {
                if(value === 0)
                {
                    return '<div style="background-color:aqua;color:white; padding: 5px; width:100%; height:20px">Đang xử lý</div>'
                }
            }
        },
        { text: 'Nhân viên', editable: false, datafield: 'nhanvien' , 'width':'100'},

    ];

    REQUEST_URL ="/api/v1/data";

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
                { name: 'name', type: 'string' },
                { name: 'phone', type: 'string' },
                { name: 'street', type: 'string' },
                { name: 'ward', type: 'string' },
                { name: 'state', type: 'string' },
                { name: 'district', type: 'string' },
                { name: 'status', type: 'number' },
                { name: 'nhanvien', type: 'string' },
                { name: 'date', type: 'string' },
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
    public loadData(){
        this.dmService.getOption(null, this.REQUEST_URL,"").subscribe(
            (res: HttpResponse<any>) => {
              this.listEntity = res.body;
              setTimeout(() => {
                this.source.localdata = res.body;
                console.log(this.source);
                this.dataAdapter = new jqx.dataAdapter(this.source);
              }, 100);
            },
            () => {
              console.error();
            }
          );
    }
    public showData(){

    }
    public onProcessData(event:any):void{
        if(!this.selectedEntity) {
            this.notificationService.showError('Vui lòng chọn dữ liệu',"Thông báo lỗi!");
            return;
        }
        const modalRef = this.modalService.open(XuLyDuLieuPopupComponent, { size: 'xl' });
        modalRef.componentInstance.data = this.selectedEntity;
        modalRef.result.then(
            () => {
              this.loadData();
             
            },
            () => {}
          );
    }
    public onExportData():void{
        const modalRef = this.modalService.open(TongKetDuLieuPopupComponent, { size: 'xl' });
        modalRef.componentInstance.data = this.listEntity;
        modalRef.result.then(
            () => {
              this.loadData();
            },
            () => {}
          );
    }
    public onRowSelect(event:any):void{
        this.selectedEntity = event.args.row;
    }


    public exportTOExcel() {  
        console.log(this.listEntity);
        const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.TABLE.nativeElement);  
        const wb: XLSX.WorkBook = XLSX.utils.book_new();  
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');  
        XLSX.writeFile(wb, `data_${this.getCurrentDate()}.xlsx`); 
    } 

    private getCurrentDate() {
        let date = new Date();
        let month = date.getMonth() + 1;

        var m = String(month);
        if (month < 10) {
            m = "0" + month.toString();
        }

        let dateOfMonth = date.getDate();
        var day = String(dateOfMonth);

        if (dateOfMonth < 10) {
            day = "0" + dateOfMonth;
        }

        let year = date.getFullYear();
        
        let formattedDate = year + "/" + m + "/" + day;
        console.log(formattedDate);
        return formattedDate;
    }
}
