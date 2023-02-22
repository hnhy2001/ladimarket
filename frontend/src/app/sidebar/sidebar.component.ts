import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DanhMucService } from 'app/danhmuc.service';
import { NotificationService } from 'app/notification.service';
import { LocalStorageService } from 'ngx-webstorage';


export interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
    role: string;
}

export let ROUTES: RouteInfo[] = [];

@Component({
    moduleId: module.id,
    selector: 'sidebar-cmp',
    templateUrl: 'sidebar.component.html',
})

export class SidebarComponent implements OnInit {
    public menuItems: any[];
    private info:any;
    REQUEST_URL_SHOP = '/api/v1/shop'
    isCollapsedCP = true;
    isCollapsedBC = true;
    constructor(
        private localStorage: LocalStorageService,
        private dmService: DanhMucService,
        private notification: NotificationService
    ){
        this.info = this.localStorage.retrieve("authenticationToken")
    }
    ngOnInit() {
        this.loadData();
    }

    loadData():void{
        this.dmService.getOption(null, this.REQUEST_URL_SHOP, "?status=1").subscribe(
            (res: HttpResponse<any>) => {
                ROUTES = [
                    { path: '/dashboard',     title: 'Dashboard',         icon:'nc-bank',       class: '', role: '' },
                    { path: '/account',         title: 'Tài khoản',             icon:'nc-badge',    class: '', role: '' },
                    { path: '/shop',          title: 'Shop',              icon:'nc-shop',      class: '', role:'' },
                    { path: '/work',          title: 'Chấm công',              icon:'nc-single-copy-04',      class: 'border-bottom ', role:'user' },
                    { path: '/utm-medium',          title: 'Cấu hình utm',              icon:'nc-single-copy-04',      class: 'border-bottom ', role:'marketing' },
                    { path: '/config',          title: 'Cấu hình',              icon:'nc-single-copy-04',      class: 'border-bottom ', role:'admin' },

                ];
                if(res.body.CODE === 200){
                    const listShop = res.body.RESULT;
                    for(let i = 0; i < listShop.length; i++){
                        const entity = { path: '/data',title: listShop[i].name,icon:'nc-basket',class: 'border-bottom',role:'user', params:listShop[i].code };
                        ROUTES.push(entity);
                    }
                    this.getMenu();
                  }
                  else{
                    this.notification.showError("Đã có lỗi xảy ra", "Fail");
                  }
            },
            () => {
                this.notification.showError("Đã có lỗi xảy ra", "Fail");
                console.error();
            }
        );
      }

    getMenu():void{
        if(this.info.role === 'admin')
            this.menuItems = ROUTES.filter(menuItem => menuItem.path !== '/utm-medium');
        else{
            this.menuItems = ROUTES.filter(menuItem => menuItem.role === this.info.role);
        }
    }

}
