import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, Subscription, filter, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeaderService{
  
  // intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  //   throw new Error('Method not implemented.');
  // }

//   private subject$ = new Subject<any>();

//   on(event: Events, action: any): Subscription {
//     return this.subject$
//         .pipe(
//             filter((e: EmitEvent) => {
//                 return e.name === event;
//             }),
//             map((e: EmitEvent) => {
//                 return e.value;
//             })
//         )
//         .subscribe(action);
// }

// emit(event: EmitEvent) {
//     this.subject$.next(event);
// }
// }

//   export class EmitEvent {

//     constructor(public name: any, public value?: any) {
//     }

//   }

//   export enum Events {
//     USER_SIGNIN_SIGNUP,
//     USER_LOGIN_LOGUT,
//     USER_STATUS_CHANGE,
//     CHAT_EVENTS,
//     CANCEL_REQUEST,
//     CHAT_REQUEST_UPDATED,
//     CHAT_MSG,
//     SEND_MSG
//   }




  private subject$ = new Subject<any>();

  on(event: Events, action: any): Subscription {
    return this.subject$
      .pipe(
        filter((e: EmitEvent) => {
          return e.name === event;
        }),
        map((e: EmitEvent) => {
          return e.value;
        })
      )
      .subscribe(action);
  }

  emit(event: EmitEvent) {
    this.subject$.next(event);
  }
}

  export class EmitEvent {

    constructor(public name: any, public value?: any) {
    }

  }

  export enum Events {
    COUNTRIES,
    LOCATION_UPDATE,
    NEW_ORDER,
    UPDATE_ORDER,
    ORDER_LOCATION_UPDATE,
    ORDER_UPDATE,
    RZP_PAYMENT_LINK,
    CSC_ITEM_ADDED,
    OUTLET_ORDER_RATING
  }
