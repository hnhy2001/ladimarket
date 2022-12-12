import { Routes } from '@angular/router';
import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { TableComponent } from '../../pages/table/table.component';
import { TypographyComponent } from '../../pages/typography/typography.component';
import { AccountComponent } from '../../pages/account/account.component';
import { WorkComponent } from '../../pages/work/work.component';
import { NotificationsComponent } from '../../pages/notifications/notifications.component';
import { UpgradeComponent } from '../../pages/upgrade/upgrade.component';
import { DataComponent } from 'app/pages/data/data.component';
import { ShopComponent } from 'app/pages/shop/shop.component';
import { ProductComponent } from 'app/pages/product/product.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'table',          component: TableComponent },
    { path: 'data',           component: DataComponent },
    { path: 'typography',     component: TypographyComponent },
    { path: 'account',        component: AccountComponent },
    { path: 'work',           component: WorkComponent },
    { path: 'notifications',  component: NotificationsComponent },
    { path: 'upgrade',        component: UpgradeComponent },
    { path: 'shop',        component: ShopComponent },
    { path: 'product',        component: ProductComponent }
];
