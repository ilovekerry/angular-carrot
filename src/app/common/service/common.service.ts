import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'})
};
function objToUrlSearchParams(params) {
  let data = new URLSearchParams();
  for (let i in params) {
    if (true) {// 加个if避免TSLint语法提示报错
      data.set(i, params[i]);
    }
  }
  return data.toString();
}
@Injectable()
export class CommonService {
  private loginUrl =  'carrots-admin-ajax/a/login';
  private logoutUrl =  'carrots-admin-ajax/a/logout';
  private getArticleListUrl = 'carrots-admin-ajax/a/article/search';
  private deleteArticleUrl = 'carrots-admin-ajax/a/u/article/';
  private changeStatusArticleUrl = 'carrots-admin-ajax/a/u/article/status';
  private getArticleUrl = 'carrots-admin-ajax/a/article/';
  private postArticleUrl = 'carrots-admin-ajax/a/u/article';
  private putArticleUrl = 'carrots-admin-ajax/a/u/article/';
  constructor(
    private http: HttpClient,
  ) { }
  postLogin(params: any): Observable<any> {
    return this.http.post<any>(this.loginUrl, objToUrlSearchParams(params), httpOptions);
  }
  postLogout(): Observable<any> {
    return this.http.post<any>(this.logoutUrl, {});
  }
  getArticleList(params: any): Observable<any> {
    return this.http.get<any>(this.getArticleListUrl, {params: params});
  }
  deleteArticle(params: number): Observable<any> {
    return this.http.delete<any>(this.deleteArticleUrl + params);
  }
  changeStatusArticle(params: any): Observable<any> {
    return this.http.put(this.changeStatusArticleUrl +  '?id=' + params.id + '&status=' + params.status, params);
  }
  postArticle(params: any): Observable<any> {
    return this.http.post(this.postArticleUrl, objToUrlSearchParams(params), httpOptions);
  }
  putArticle(params: any, articleId: number): Observable<any> {
    return this.http.put(this.putArticleUrl + articleId, objToUrlSearchParams(params), httpOptions);
  }
  getArticle(params: number): Observable<any> {
    return this.http.get<any>(this.getArticleUrl + params);
  }
}
