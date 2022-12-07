import { Component, OnInit, Renderer2, ViewChild, ElementRef } from '@angular/core';
import { ROUTES } from '../../sidebar/sidebar.component';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { LocalStorageService } from 'ngx-webstorage';
import { DanhMucService } from 'app/danhmuc.service';
import { HttpResponse } from '@angular/common/http';
import * as moment from 'moment';
import { ConfirmationDialogService } from 'app/layouts/confirm-dialog/confirm-dialog.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { CheckOutComponent } from '../popup/checkout/checkout.component';
import { NotificationService } from 'app/notification.service';
@Component({
  moduleId: module.id,
  selector: 'navbar-cmp',
  templateUrl: 'navbar.component.html'
})


export class NavbarComponent implements OnInit {
  private listTitles: any[] = [];
  location: Location;
  modalRef!: NgbModalRef;
  private nativeElement: Node;
  private toggleButton;
  private sidebarVisible: boolean;
  public checkWorkActive = false;
  public info:any;
  public isCollapsed = true;
  @ViewChild("navbar-cmp", { static: false }) button;

  constructor(location: Location, private renderer: Renderer2, private element: ElementRef, private router: Router,private notificationService: NotificationService,
    private local: LocalStorageService,
    private dmService: DanhMucService, private confirmDialogService: ConfirmationDialogService, private modalService: NgbModal) {
    this.location = location;
    this.nativeElement = element.nativeElement;
    this.sidebarVisible = false;
    this.info = this.local.retrieve("authenticationToken")
    
  }

  ngOnInit() {
    setTimeout(() => {
      this.listTitles = ROUTES.filter(listTitle => listTitle);
    }, 1000);
    var navbar: HTMLElement = this.element.nativeElement;
    this.toggleButton = navbar.getElementsByClassName('navbar-toggle')[0];
    this.router.events.subscribe((event) => {
      this.sidebarClose();
    });
    this.getAccountStatus();
  }

  onTriggerWorkActive(): void {
    this.checkWorkActive = !this.checkWorkActive;
    if (this.checkWorkActive) {
      this.confirmDialogService
        .confirm('Xác nhận thay đổi', 'Đồng ý', 'Hủy')
        .then((confirmed: any) => {
          if (confirmed) {
            this.onCheckIn()
          } else {
            this.checkWorkActive = !this.checkWorkActive;
          };
        })
        .catch(() => console.log('Đã có lỗi xảy ra'));
    } else {
      this.modalRef = this.modalService.open(CheckOutComponent, {
        keyboard: true,
        backdrop: 'static',
        size: 'lg'
      });
      this.modalRef.result.then((res: any) => {
        if (res) {
          this.getAccountStatus();
          setTimeout(() => {
            window.location.reload(); 
          }, 200);
        } else {
          this.checkWorkActive = !this.checkWorkActive;
        }
      });
    }
  }

  onCheckIn():void {
    moment.locale("vi");
    let time = moment(new Date).format('YYYYMMDDHHmmss');
    let checkInEntity = {
      timeIn: time,
      nhanVienId: this.local.retrieve("authenticationToken").id
    };
    this.dmService.postOption(checkInEntity, "/api/v1/work/", '').subscribe(
      (res: HttpResponse<any>) => {
        if (res.body.CODE === 200) {
          this.notificationService.showSuccess("Check In thành công",'Thông báo!');
        } else {
          this.notificationService.showError("Đã có lỗi xảy ra",'Thông báo!');
          this.checkWorkActive = !this.checkWorkActive;
        }
      },
      () => {
        console.error();
      }
    );
  }

  getTitle() {
    var titlee = this.location.prepareExternalUrl(this.location.path());
    if (titlee.charAt(0) === '#') {
      titlee = titlee.slice(1);
    }
    for (var item = 0; item < this.listTitles.length; item++) {
      if (this.listTitles[item].path === titlee || ('/data?shopCode=' + this.listTitles[item].params) === titlee) {
        return this.listTitles[item].title;
      }
    }
    return 'Dashboard';
  }
  getAccountStatus():void {
    const entity = {
      nhanVienId: this.info.id
    }
    this.dmService.postOption(entity, "/api/v1/work/checkWorkActive", '').subscribe(
      (res: HttpResponse<any>) => {
        if (res.body.CODE === 200) {
          this.checkWorkActive = true;
        }
        else {
          this.checkWorkActive = false;
        }
      },
      () => {
        this.checkWorkActive = false;
        console.error();
      }
    );
  }
  sidebarToggle() {
    if (this.sidebarVisible === false) {
      this.sidebarOpen();
    } else {
      this.sidebarClose();
    }
  }
  sidebarOpen() {
    const toggleButton = this.toggleButton;
    const html = document.getElementsByTagName('html')[0];
    const mainPanel = <HTMLElement>document.getElementsByClassName('main-panel')[0];
    setTimeout(function () {
      toggleButton.classList.add('toggled');
    }, 500);

    html.classList.add('nav-open');
    // if(window.innerWidth < 1920){
    //   mainPanel.style.width = '83%';
    // }
    if (window.innerWidth < 991) {
      mainPanel.style.position = 'fixed';
    }
    this.sidebarVisible = true;
  };
  sidebarClose() {
    const html = document.getElementsByTagName('html')[0];
    const mainPanel = <HTMLElement>document.getElementsByClassName('main-panel')[0];
    // if(window.innerWidth < 1920){
    //   mainPanel.style.width = '100%';
    // }
    if (window.innerWidth < 991) {
      setTimeout(function () {
        mainPanel.style.position = '';
      }, 500);
    }
    this.toggleButton.classList.remove('toggled');
    this.sidebarVisible = false;
    html.classList.remove('nav-open');
  };
  collapse() {
    this.isCollapsed = !this.isCollapsed;
    const navbar = document.getElementsByTagName('nav')[0];
    console.log(navbar);
    if (!this.isCollapsed) {
      navbar.classList.remove('navbar-transparent');
      navbar.classList.add('bg-white');
    } else {
      navbar.classList.add('navbar-transparent');
      navbar.classList.remove('bg-white');
    }

  }
  logout() {
    this.local.clear();
    setTimeout(() => {
      this.router.navigate(['/logiin']);
    }, 200);
  }
}
