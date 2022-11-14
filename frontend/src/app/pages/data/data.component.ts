import { HttpResponse } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { DanhMucService } from 'app/danhmuc.service';
import { ConfirmationDialogService } from 'app/layouts/confirm-dialog/confirm-dialog.service';
import { NotificationService } from 'app/notification.service';
import { jqxGridComponent } from 'jqwidgets-ng/jqxgrid';

@Component({
    selector: 'data-cmp',
    templateUrl: 'data.component.html'
})

export class DataComponent implements OnInit{
    @ViewChild('gridReference') myGrid: jqxGridComponent;
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
        { text: 'SDT', editable: false, datafield: 'phone' , 'width':'100'},
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

    constructor(
        private dmService: DanhMucService,
        private notificationService: NotificationService,
        private confirmDialogService: ConfirmationDialogService
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
        this.confirmDialogService.confirm("Xác nhận","Xác nhận xoá?")
        .then((confirmed: any) => {
            if (confirmed){
                alert("Xoá thành công!");
            }
        })
        .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
        return;
        this.notificationService.showSuccess("Giao việc cho: " + this.myGrid.getselectedrowindexes().join("; "),"Success message")
    }
}
