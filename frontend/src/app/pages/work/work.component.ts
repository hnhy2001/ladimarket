import { HttpResponse } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DanhMucService } from 'app/danhmuc.service';
import { ConfirmationDialogService } from 'app/layouts/confirm-dialog/confirm-dialog.service';
import { NotificationService } from 'app/notification.service';
import { jqxGridComponent } from 'jqwidgets-ng/jqxgrid';
@Component({
    moduleId: module.id,
    selector: 'work-cmp',
    templateUrl: 'work.component.html'
})

export class WorkComponent implements OnInit {
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
        { text: 'timeIn', editable: false, datafield: 'timeIn', 'width':'120'},
        { text: 'timeOut', editable: false, datafield: 'timeOut', 'width':'120'},
        { text: 'Đơn Giao',editable:false ,datafield: 'donGiao' , 'width':'300'},
        { text: 'Đơn Hoàn Thành', editable: false, datafield: 'donHoanthanh' , 'width':'300'},
        { text: 'Ghi Chú', editable: false, datafield: 'ghiChu' , 'width':'300'},
        { text: 'Tài Khoản', editable: false, datafield: 'userName' , 'width':'280'},

    ];

    REQUEST_URL ="/api/v1/work";
    
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
                { name: 'timeIn', type: 'string' },
                { name: 'timeOut', type: 'string' },
                { name: 'donGiao', type: 'string' },
                { name: 'donHoanthanh', type: 'string' },
                { name: 'ghiChu', type: 'string' },
                { name: 'userName', type: 'any' },
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
        this.dmService.getOption(null, this.REQUEST_URL,"/getAll").subscribe(
            (res: HttpResponse<any>) => {
                this.listEntity = res.body;
                this.source.localdata = res.body.RESULT;
                for(let i = 0; i< this.source.localdata.length; i++){
                    this.source.localdata[i].userName = this.source.localdata[i].account ? this.source.localdata[i].account.userName : '';
                }
                console.log(this.source.localdata);
                this.dataAdapter = new jqx.dataAdapter(this.source);
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
