import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';



import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { appRoutes } from './app.routes';
import {FormsModule} from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';
// import { ConfirmModalComponent } from './component/confirm-modal/confirm-modal.component';

import { CommonService } from './common/service/common.service';
// import { ArticleService } from './common/service/common.service';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    HttpClientModule,
  ],
  providers: [CommonService],
  bootstrap: [AppComponent]
})
export class AppModule { }
