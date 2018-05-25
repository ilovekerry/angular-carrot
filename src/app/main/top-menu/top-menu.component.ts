import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../common/service/common.service';
import { Router} from '@angular/router';

@Component({
  selector: 'main-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.scss']
})
export class TopMenuComponent implements OnInit {

  constructor(
    private commonService: CommonService,
    private router: Router,
  ) { }

  ngOnInit() {
  }
  postLogout(): void {
    this.commonService.postLogout()
      .subscribe(res => {
        this.router.navigateByUrl('login');
      });
  }
}
