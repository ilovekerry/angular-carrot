import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// datePicker
import { BsDatepickerModule, BsLocaleService } from 'ngx-bootstrap/datepicker';
import { zhCnLocale } from 'ngx-bootstrap/locale';
import { defineLocale} from 'ngx-bootstrap';
defineLocale('zh-cn', zhCnLocale);
// pagination
import { PaginationModule } from 'ngx-bootstrap/pagination';
// modal
import { ModalModule } from 'ngx-bootstrap';
import { BsModalService } from 'ngx-bootstrap';
// richTextEditor
import { UEditorModule } from 'ngx-ueditor';
// image-upload
import { FileUploadModule  } from 'ng2-file-upload';

import { mainRoutes } from './main.routes';
import { TopMenuComponent } from './top-menu/top-menu.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import {MainComponent} from './main.component';
import { DashboardComponent } from './content/dashboard/dashboard.component';
import { ArticleListComponent } from './content/article-list/article-list.component';
import { ArticleListTypePipe, ArticleListStatusPipe, ImageSizePipe} from '../common/constantAndPipe/pipe';
import { ArticleAddComponent } from './content/article-add/article-add.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    BsDatepickerModule.forRoot(),
    PaginationModule.forRoot(),
    ModalModule.forRoot(),
    UEditorModule.forRoot({
      // 指定ueditor.js路径目录
      path: 'assets/ueditor/',
      // 默认全局配置项
      options: {
        themePath: '/assets/ueditor/themes/'
      }
    }),
    FileUploadModule,
    RouterModule,
    RouterModule.forChild(mainRoutes)
  ],
  exports: [],
  declarations: [
    MainComponent,
    TopMenuComponent,
    SidebarComponent,
    DashboardComponent,
    ArticleListComponent,
    ArticleListTypePipe,
    ArticleListStatusPipe,
    ImageSizePipe,
    ArticleAddComponent,
  ],
  schemas: [ NO_ERRORS_SCHEMA ],
  providers: [
    BsLocaleService,
    BsModalService,
  ]
})
export class MainModule { }
