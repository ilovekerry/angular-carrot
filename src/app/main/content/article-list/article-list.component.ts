import { Component, OnInit , TemplateRef, ViewChild } from '@angular/core';
import { CommonService } from '../../../common/service/common.service';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { ActivatedRoute } from '@angular/router';
import { Router} from '@angular/router';
import { ArticleListStatusOptions, ArticleListTypeOptions } from '../../../common/constantAndPipe/constant';
// modal
import { BsModalService } from 'ngx-bootstrap';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';


@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss']
})
export class ArticleListComponent implements OnInit {
  public params;
  public typeOptions = ArticleListTypeOptions;
  public statusOptions = ArticleListStatusOptions;
  public tableData = [];
  public routeParams = {};
  // calendar
  public locale = 'zh-cn';
  // pager
  public rotate = true;
  public maxSize = 5;
  public total: number;
  // modal
  public bsModalRef: BsModalRef;
  public modalItem: any;
  @ViewChild('onlineSucceedTemplate')
  private onlineSucceedTempRef: TemplateRef<any>;
  @ViewChild('offlineSucceedTemplate')
  private offlineSucceedTempRef: TemplateRef<any>;
  constructor(
    private commonService: CommonService,
    private localeService: BsLocaleService,
    private router: Router,
    public route: ActivatedRoute,
    private modalService: BsModalService,
  ) {}

  ngOnInit() {
    this.localeService.use(this.locale);
    this.route.queryParams.subscribe((params: any) => {
      this.routeParams = params;
      this.params = {
        startAt: params.startAt ? new Date(Number(params.startAt)) : '',
        endAt: params.endAt ? new Date(Number(params.endAt)) : '',
        type: params.type || '',
        status: params.status || '',
        page: params.page ? Number(params.page) : 1,
        size: params.size ? Number(params.size) : 10,
      };
      this.getArticleList(params);
    });
  }
  getArticleList(params): void {
    this.commonService.getArticleList(params)
      .subscribe( res => {
        this.tableData = res.data.articleList;
        this.total = res.data.total;
      });
  }
  clear(params: any): void {
    this.search({});
  }
  search(params: any): void {
    params.page = 1;
    let searchParams = Object.assign({}, params);
    if ( params.startAt ) {
      params.startAt.setHours(0, 0, 0, 0);
      searchParams.startAt = params.startAt.getTime();
    }
    if ( params.endAt ) {
      params.endAt.setHours(23, 59, 59, 999);
      searchParams.endAt = params.endAt.getTime();
    }
    this.router.navigate(['main/articleList'], {queryParams: searchParams});
  }
  pageChanged(event: any): void {
      let searchParams = <any>{};
      searchParams = Object.assign({}, this.routeParams);
      searchParams.page = event.page;
      this.router.navigate(['main/articleList'], {queryParams: searchParams});
  }
  // Todo 增加分页size功能，尝试做了，但是失败了。本身这个分页插件是不支持size功能的，建议换一个插件或者自己写
  deleteArticle(params: number): void {
    this.commonService.deleteArticle(params)
      .subscribe( res => {
        this.getArticleList(this.routeParams);
      });
  }
  changeStatusArticle(params: any): void {
    let data = {
      id: params.id,
      status: params.status === 1 ? 2 : 1
    };
    this.commonService.changeStatusArticle(data)
      .subscribe( res => {
        if (res.code === 0 && res.message === 'success') {
          if (data.status === 2) {
            this.openModal(this.onlineSucceedTempRef, 1); // 因为必须要传两个参数，所以第二个参数随便写一个
          } else {
            this.openModal(this.offlineSucceedTempRef, 1); // 因为必须要传两个参数，所以第二个参数随便写一个
          }
        }
        this.getArticleList(this.routeParams);
      });
  }
  // modal
  openModal(template: TemplateRef<any>, item: any) {
    this.modalItem = item;
    this.bsModalRef = this.modalService.show(template, {class: 'modal-md'});
  }
 }
