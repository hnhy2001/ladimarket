import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AdminLayoutRoutes } from './admin-layout.routing';

import { DashboardComponent }       from '../../pages/dashboard/dashboard.component';
import { UserComponent }            from '../../pages/user/user.component';
import { TableComponent }           from '../../pages/table/table.component';
import { DataComponent }           from '../../pages/data/data.component';
import { TypographyComponent }      from '../../pages/typography/typography.component';
import { AccountComponent }           from '../../pages/account/account.component';
import { WorkComponent }            from '../../pages/work/work.component';
import { NotificationsComponent }   from '../../pages/notifications/notifications.component';
import { UpgradeComponent }         from '../../pages/upgrade/upgrade.component';
import { jqxGridModule } from 'jqwidgets-ng/jqxgrid';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { jqxDateTimeInputModule } from 'jqwidgets-ng/jqxdatetimeinput';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    NgbModule,
    jqxGridModule,
    jqxDateTimeInputModule
  ],
  declarations: [
    DashboardComponent,
    UserComponent,
    TableComponent,
    UpgradeComponent,
    TypographyComponent,
    AccountComponent,
    WorkComponent,
    NotificationsComponent,
    DataComponent,
    
  ]
})

export class AdminLayoutModule {}
