import { Component, OnInit } from '@angular/core';
import { CommonService } from '../common/service/common.service';
import { Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  public params = {
    name: '',
    pwd: ''
  };
  public loginInfo;
  constructor(
    private commonService: CommonService,
    public router: Router,
  ) { }

  ngOnInit() {
  }
  login(params): void {
    if (params.name && params.pwd) {
      this.commonService.postLogin(params)
        .subscribe( res => {
          if (res.code === 0 && res.message === 'success') {
            this.router.navigateByUrl('main');
          } else {
            this.loginInfo = res.message;
          }
        });
    } else {
      if (params.name) {
        this.loginInfo = '请输入密码';
      } else {
        this.loginInfo = '请输入用户名';
      }
    }
  }
}
