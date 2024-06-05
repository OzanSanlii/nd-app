import {HttpInterceptor, HttpRequest, HttpHandler, HttpEvent} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';

/**
 * Interceptor class to add default headers to API requests.
 */
@Injectable()
export class DefaultHeadersInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const authReq = this.addDefaultHeaders(req);
        console.log("authReq", authReq);
        return next.handle(authReq);
    }

    private addDefaultHeaders(req: HttpRequest<any>): HttpRequest<any> {
        return req.clone({
            headers: req.headers
                .set('Content-Type', 'application/json')
                .set('Accept', 'application/json')
        });
    }
}
