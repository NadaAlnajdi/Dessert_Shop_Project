import { Injectable } from '@angular/core';
import swal from 'sweetalert';
//import swal from 'sweetalert'; // Correct import for sweetalert

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor() { }

  myAlert(alertType:string,message:string, text:string ){
    swal({
      title: message,
      buttons: ['false'],
      text: text,
      icon: alertType,
          timer: 10000
    });
  }
}
