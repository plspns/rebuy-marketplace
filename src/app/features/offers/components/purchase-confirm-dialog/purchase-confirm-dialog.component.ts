
// Angular core and common modules
import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';

// Third-party modules
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

// App-specific imports
import { Offer } from '../../models/offer.model';

@Component({
  selector: 'app-purchase-confirm-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './purchase-confirm-dialog.component.html',
  styleUrl: './purchase-confirm-dialog.component.css',
})
export class PurchaseConfirmDialogComponent {
  /**
   * Injects the dialog reference for closing the dialog and the offer data to display.
   */
  constructor(
    public dialogRef: MatDialogRef<PurchaseConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { offer: Offer }
  ) {}

  /**
   * Called when the user confirms the purchase. Closes the dialog with a true result.
   */
  onConfirm(): void {
    this.dialogRef.close(true);
  }

  /**
   * Called when the user cancels the purchase. Closes the dialog with a false result.
   */
  onCancel(): void {
    this.dialogRef.close(false);
  }
}
