import { Routes } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { BillComponent } from './pages/bill/bill.component';
import { LogiinComponent } from './pages/logiin/logiin.component';


export const AppRoutes: Routes = [
  {
    path: '',
    redirectTo: 'logiin',
    pathMatch: 'full',
  }, {
    path: '',
    component: AdminLayoutComponent,
    children: [
        {
      path: '',
      loadChildren: () => import('./layouts/admin-layout/admin-layout.module').then(x => x.AdminLayoutModule)
  }]},
  {
    path: 'bill',
    component: BillComponent
  },
  {
    path: 'logiin',
    component: LogiinComponent
  },
 
]
