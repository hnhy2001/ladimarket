import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ToastrModule } from "ngx-toastr";

import { SidebarModule } from './sidebar/sidebar.module';
import { FooterModule } from './shared/footer/footer.module';
import { NavbarModule} from './shared/navbar/navbar.module';
import { FixedPluginModule} from './shared/fixedplugin/fixedplugin.module';

import { AppComponent } from './app.component';
import { AppRoutes } from './app.routing';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { HttpClientModule } from "@angular/common/http";
import { QRCodeModule } from "angularx-qrcode";
import { XuLyDuLieuPopupComponent } from "./shared/popup/XuLyDuLieuPopup/XuLyDuLieuPopup.component";
import { TongKetDuLieuPopupComponent } from "./shared/popup/TongKetDuLieu/TongKetDuLieuPopup.component";
import { jqxDateTimeInputModule } from 'jqwidgets-ng/jqxdatetimeinput';


@NgModule({
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    XuLyDuLieuPopupComponent,
    TongKetDuLieuPopupComponent
  ],
  imports: [
    BrowserAnimationsModule,
    RouterModule.forRoot(AppRoutes,{
      useHash: true
    }),
    SidebarModule,
    NavbarModule,
    ToastrModule.forRoot(),
    FooterModule,
    FixedPluginModule,
    NgbModule,
    HttpClientModule,
    QRCodeModule,
    jqxDateTimeInputModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [XuLyDuLieuPopupComponent,TongKetDuLieuPopupComponent]
})
export class AppModule { }
