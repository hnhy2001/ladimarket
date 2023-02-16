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
import { UtmMediumComponent } from 'app/pages/utm-medium/utm-medium.component';
import { ProductComponent } from 'app/pages/product/product.component';
import { UtmStatisticComponent } from 'app/pages/utm-statistic/utm-statistic.component';
import { CostTypeComponent } from 'app/pages/cost-type/cost-type.component';
import { CostComponent } from 'app/pages/cost/cost.component';
import { StatiscalCostComponent } from 'app/pages/statiscal-cost/statiscal-cost.component';
import { StatiscalRevenueComponent } from 'app/pages/statiscal-revenue/statiscal-revenue.component';

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
    { path: 'utm-medium',        component: UtmMediumComponent },
    { path: 'utm-statistic',        component: UtmStatisticComponent },
    { path: 'product',        component: ProductComponent },
    {path:'costType', component: CostTypeComponent},
    {path:'cost', component:CostComponent},
    {path:'statiscal-cost', component:StatiscalCostComponent},
    {path:'statiscal-revenue', component:StatiscalRevenueComponent}



];
