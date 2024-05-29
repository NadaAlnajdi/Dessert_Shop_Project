import { HttpInterceptorFn } from '@angular/common/http';

export const addtokenInterceptor: HttpInterceptorFn = (req, next) => {
  // let token=localStorage.getItem("token")
  // if (token==null)
  //   return next(req)
  req=req.clone({
    setHeaders:{
      'Authorization' : 'Bearer 4|Pw6w30OE0EH8FxMAQNjEYCuZl1RYAjUXPdJ3T2KFa9f1d36f'
    }
  })
  return next(req);
};
