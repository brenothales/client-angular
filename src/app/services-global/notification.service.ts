import { Injectable, NgZone } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable()
export class NotificacaoService {

  constructor(private snackBar: MatSnackBar, private zone: NgZone) { }

  notificar(mensagem: string) {
    const config = new MatSnackBarConfig();
    config.verticalPosition = 'bottom';
    config.horizontalPosition = 'center';
    config.duration = 5000;
    // config.panelClass = this.addExtraClass ? ['party'] : undefined;
    this.snackBar.open(mensagem, undefined, config);
  }

  error(message: string) {
    const config = new MatSnackBarConfig();
    config.panelClass = ['toast-error'];
    config.verticalPosition = 'bottom';
    config.horizontalPosition = 'center';
    config.duration = 5000;
    this.zone.run(() => {
      this.snackBar.open(message, 'x', config);
    });
  }

  success(message: string) {
    const config = new MatSnackBarConfig();
    config.panelClass = ['toast-success'];
    config.verticalPosition = 'bottom';
    config.horizontalPosition = 'center';
    config.duration = 5000;
    this.zone.run(() => {
      this.snackBar.open(message, 'x', config);
    });
  }

  info(message: string) {
    const config = new MatSnackBarConfig();
    config.panelClass = ['toast-info'];
    config.verticalPosition = 'bottom';
    config.horizontalPosition = 'center';
    config.duration = 5000;
    this.zone.run(() => {
      this.snackBar.open(message, 'x', config);
    });
  }

  warning(message: string) {
    const config = new MatSnackBarConfig();
    config.panelClass = ['toast-warning'];
    config.verticalPosition = 'bottom';
    config.horizontalPosition = 'center';
    config.duration = 5000;
    this.zone.run(() => {
      this.snackBar.open(message, 'x', config);
    });
  }
}
