import { Injectable } from "@angular/core";
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: "root" })
export class ApiInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Don't modify absolute URLs (http, https)
    const isRelative = !/^https?:\/\//i.test(req.url);

    const apiReq = isRelative
      ? req.clone({ url: `${environment.apiUrl}${req.url}` })
      : req;

    return next.handle(apiReq);
  }
}