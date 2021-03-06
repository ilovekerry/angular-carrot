import { Component, OnInit , TemplateRef, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from '../../../common/service/common.service';
import { ArticleListTypeOptions, ArticleListSubTypeOptions } from '../../../common/constantAndPipe/constant';
// 图片上传
import { FileUploader } from 'ng2-file-upload';
const imageUploadUrl = 'carrots-admin-ajax/a/u/img/task';
// modal
import { BsModalService } from 'ngx-bootstrap';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
@Component({
  selector: 'app-article-add',
  templateUrl: './article-add.component.html',
  styleUrls: ['./article-add.component.scss']
})
export class ArticleAddComponent implements OnInit {
  params = <any>{};
  typeOptions = ArticleListTypeOptions;
  subTypeOptions = ArticleListSubTypeOptions;
  articleId: number;
  ueditorConfig = {
    toolbars: [
      ['fullscreen', 'source', 'undo', 'redo'],
      ['bold', 'italic', 'underline', 'fontborder', 'strikethrough', 'superscript', 'subscript', 'removeformat',
        'formatmatch', 'autotypeset', 'blockquote', 'pasteplain', '|', 'forecolor', 'backcolor', 'insertorderedlist',
        'insertunorderedlist', 'selectall', 'cleardoc', ]
    ],
    autoHeightEnabled: true,
    autoFloatEnabled: true,
    autosave: false,
  };
  public uploader: FileUploader = new FileUploader({url: imageUploadUrl, });
  // modal
  public bsModalRef: BsModalRef;
  @ViewChild('addSucceedTemplate')
  private addSucceedTempRef: TemplateRef<any>;
  constructor(
    private commonService: CommonService,
    private location: Location,
    private route: ActivatedRoute,
    private modalService: BsModalService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.initImageUploader();
    this.getArticle();
  }
  // 图片上传
  initImageUploader(): void {
    this.uploader.onAfterAddingFile = f => {
      if (this.uploader.queue.length > 1) {
        this.uploader.queue.splice(0, 1);
      }
    };
    this.uploader.onSuccessItem = (item, res) => {
      this.params.img = JSON.parse(res).data.url;
      console.log(this.params);
    };
  }
  onChange(event: any): void { event.srcElement.value = ''; } // 解决选择相同的图片无法触发onchange的问题
  // 获取文章详情，初始化参数
  getArticle(): void {
    this.route.queryParams.subscribe((params) => {
      this.articleId = params.id;
    });
    if (this.articleId) {
      this.commonService.getArticle(this.articleId)
        .subscribe( res => {
          if (res.code === 0) {
            this.params = res.data.article;
            // 下面这两个String函数的原因是编辑的时候判断会发现参数是0，会被当成false,解决办法：
            // 1，像下面那样打补丁转类型，缺点就是维护起来麻烦，后面越来越麻烦。
            // 2.在开始项目的时候就定义常量id为数字0，而不是字符串0，不然到后面想改成数字0就会牵扯到其他东西，然后判断必填条件可能也要改
            // 3.和后端约定最好各种选项不要从0开始，从1开始就什么问题都没了。
            this.params.type = String(res.data.article.type);
            if (this.params.type === '3') {
              this.params.industry = String(res.data.article.industry);
            }
          }
        });
    } else {
        this.params.type = ''; // 下拉框设置默认值
        this.params.industry = '';
    }
  }
  // 新增或者编辑文章
  postArticle(params: any, status: number): void {
    if (params.type != 3) {
      delete params.industry;
    }
    params.status = status;
    if (this.articleId) {
      this.commonService.putArticle(params, this.articleId)
        .subscribe(res => {
          if (res.code === 0) {
            this.openModal();
            this.router.navigateByUrl('main/articleList');
          }
        });
    } else {
      this.commonService.postArticle(params)
        .subscribe( res => {
          if (res.code === 0) {
            this.openModal();
            this.router.navigateByUrl('main/articleList');
          }
        });
    }
  }
  // 取消
  cancel(): void {
    this.location.back();
  }
  // modal
  openModal() {
    this.bsModalRef = this.modalService.show(this.addSucceedTempRef, {class: 'modal-md'});
  }

  // 备注
  /**
   * 1.避免ueditor销毁后报错Cannot read property 'scrollTo' of undefined
   * 修改了ueditor源码：https://segmentfault.com/q/1010000012993263
   * 2.避免ueditor启动时检查图片上传地址是否为jsonp请求而导致控制台提示请求错误和图片上传功能无法使用
   * 注释了ueditor.all.js 8088~8104行
   */
}
