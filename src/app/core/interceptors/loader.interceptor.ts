import { HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { finalize } from "rxjs/internal/operators/finalize";

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {

  private requests = 0;

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    this.requests++;
    console.log('Loading ON');

    return next.handle(req).pipe(
      finalize(() => {
        this.requests--;

        if (this.requests === 0) {
          console.log('Loading OFF');
        }
      })
    );
  }
}