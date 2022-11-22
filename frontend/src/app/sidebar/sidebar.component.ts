import { Component, OnInit } from '@angular/core';


export interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}

export const ROUTES: RouteInfo[] = [
    { path: '/dashboard',     title: 'Trang chủ',         icon:'nc-bank',       class: '' },
    { path: '/account',         title: 'Tài khoản',             icon:'nc-badge',    class: '' },
    { path: '/data',          title: 'Kiện hàng bom',              icon:'nc-bullet-list-67',      class: '' },
    { path: '/work',          title: 'Công việc',              icon:'nc-single-copy-04',      class: '' },
];

@Component({
    moduleId: module.id,
    selector: 'sidebar-cmp',
    templateUrl: 'sidebar.component.html',
})

export class SidebarComponent implements OnInit {
    public menuItems: any[];
    ngOnInit() {
        this.menuItems = ROUTES.filter(menuItem => menuItem);
    }

}
