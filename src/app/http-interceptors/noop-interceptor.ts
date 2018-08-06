import { Injectable } from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse} from '@angular/common/http';
// import { finalize, tap } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
/** Pass untouched request through to the next request handler. */
@Injectable()
export class NoopInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler):
  Observable<HttpEvent<any>> {
    console.warn(req);
    // req.headers['access-token'] = '123';
    const clonedRequest = req.clone({ headers: req.headers.set('access-token', 'Bearer 123') });
    return next.handle(clonedRequest)
      // .pipe(
      //   tap(
      //     event => {
      //       console.log(event);
      //     }
      //   ),
      //   // Log when response observable either completes or errors
      //   finalize(() => {
      //     console.log('end');
      //   })
      // );
      .do((event: HttpEvent<any>) => { // HttpResponse
            if (event instanceof HttpResponse) {
              // 拦截请求后：响应成功
              // 成功loading结束
              console.log('success', event);
              }
              }, (err: any) => {
              // HttpErrorResponse
        if (err instanceof HttpErrorResponse) {
          console.log('err', err);
          // 拦截请求后：错误处理//err loading结束
          return Observable.throw(err);
        }});
      }
}
