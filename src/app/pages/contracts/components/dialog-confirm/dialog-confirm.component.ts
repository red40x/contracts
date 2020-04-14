import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

export interface ConfirmDialogData {
  title: string;
  question?: string;
  confirmButtonTitle: string;
  cancelButtonTitle: string;
}

@Component({
  selector: 'app-dialog-confirm',
  templateUrl: './dialog-confirm.component.html',
  styleUrls: ['./dialog-confirm.component.scss']
})

export class DialogConfirmComponent {

  constructor(
    public confirmDialogRef: MatDialogRef<DialogConfirmComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmDialogData
  ) {}

  /**
   * Закрытие диалога при положительном ответе
   */
  onConfirmButton() {
    this.confirmDialogRef.close(true);
  }

  /**
   * Закрытие диалога при отрицательном ответе
   */
  onCancelButton() {
    this.confirmDialogRef.close(false);
  }
}
