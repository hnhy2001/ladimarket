import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'ngx-webstorage';


export interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
    role: string;
}

export const ROUTES: RouteInfo[] = [
    { path: '/dashboard',     title: 'Dashboard',         icon:'nc-bank',       class: '', role: '' },
    { path: '/account',         title: 'Tài khoản',             icon:'nc-badge',    class: '', role: '' },
    { path: '/data',          title: 'Kiện hàng bom',              icon:'nc-bullet-list-67',      class: '',role:'user' },
    { path: '/work',          title: 'Chấm công',              icon:'nc-single-copy-04',      class: '', role:'user' },
    { path: '/shop',          title: 'Shop',              icon:'nc-shop',      class: '', role:'' }
];

@Component({
    moduleId: module.id,
    selector: 'sidebar-cmp',
    templateUrl: 'sidebar.component.html',
})

export class SidebarComponent implements OnInit {
    public menuItems: any[];
    private info:any;
    constructor(
        private localStorage: LocalStorageService
    ){
        this.info = this.localStorage.retrieve("authenticationToken")
    }
    ngOnInit() {
        if(this.info.role === 'user')
            this.menuItems = ROUTES.filter(menuItem => menuItem.role === 'user');
        else if(this.info.role === 'admin')
        this.menuItems = ROUTES.filter(menuItem => menuItem);
    }

}
