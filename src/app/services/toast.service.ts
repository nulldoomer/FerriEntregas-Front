import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

export type IconType = 'success' | 'error' | 'warning' | 'info' | 'question';

@Injectable({
  providedIn: 'root',
})
export class ToastService {

  showToast(message: string, icon: IconType) {
    Swal.fire({
      title: message,
      icon: icon, 
      toast: true,
      position: 'top',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      background: 'rgb(234 88 12 / var(--tw-bg-opacity, 1))', 
      color: 'white',
      heightAuto: false, 
      customClass: {
        popup: 'custom-swal-popup',
      },
    });
  }
}
