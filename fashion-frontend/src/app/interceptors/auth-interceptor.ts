import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn =
  (req, next) => {

    // Get JWT from localStorage
    const token = localStorage.getItem('token');


    
    if (!token) {

      return next(req);

    }


    // Clone request
    // because Angular requests are immutable
    const authReq = req.clone({

      setHeaders: {

        Authorization: `Bearer ${token}`

      }

    });


    // Send modified request
    return next(authReq);

  };