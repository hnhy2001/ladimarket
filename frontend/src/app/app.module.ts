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
import { FormsModule } from "@angular/forms";

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { HttpClientModule } from "@angular/common/http";
import { QRCodeModule } from "angularx-qrcode";
import { XuLyDuLieuPopupComponent } from "./shared/popup/XuLyDuLieuPopup/XuLyDuLieuPopup.component";
import { TongKetDuLieuPopupComponent } from "./shared/popup/TongKetDuLieu/TongKetDuLieuPopup.component";
import { jqxDateTimeInputModule } from 'jqwidgets-ng/jqxdatetimeinput';
import { LogiinComponent } from './pages/logiin/logiin.component';
import { RegisterComponent } from './pages/register/register.component';



@NgModule({
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    XuLyDuLieuPopupComponent,
    LogiinComponent,
    RegisterComponent
  ],
  imports: [
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
    jqxDateTimeInputModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [XuLyDuLieuPopupComponent,TongKetDuLieuPopupComponent]
})
export class AppModule { }
