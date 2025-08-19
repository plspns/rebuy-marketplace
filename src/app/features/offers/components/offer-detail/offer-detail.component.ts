// Angular core and common modules
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';

// Third-party modules
import { Observable, map, take } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

// App-specific imports
import { Offer } from '../../models/offer.model';
import { OfferService } from '../../services/offer.service';
import { PurchaseConfirmDialogComponent } from '../purchase-confirm-dialog/purchase-confirm-dialog.component';

@Component({
  selector: 'app-offer-detail',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatDividerModule,
    MatDialogModule,
  ],
  templateUrl: './offer-detail.component.html',
  styleUrl: './offer-detail.component.css',
})
export class OfferDetailComponent implements OnInit {
  // Observable for the selected offer, used in the template with async pipe
  offer$!: Observable<Offer | undefined>;
  // Holds the current offer ID from the route
  private offerId: string | null = null;

  /**
   * Injects ActivatedRoute to access route parameters and OfferService for data.
   */
  constructor(
    private route: ActivatedRoute,
    private offerService: OfferService,
    private dialog: MatDialog
  ) {}

  /**
   * On component initialization, extract the offer ID from the route and
   * set up the observable to emit the matching offer from the service.
   */
  ngOnInit() {
    this.offerId = this.route.snapshot.paramMap.get('id');
    this.offer$ = this.offerService
      .getOffers()
      .pipe(map((offers) => offers.find((o) => o.id === this.offerId)));
  }

  /**
   * Handles voting for the current offer.
   * Forwards the logic to the OfferService.
   * @param type 'up' for upvote, 'down' for downvote
   */
  vote(type: 'up' | 'down') {
    if (this.offerId) {
      this.offerService.voteOffer(this.offerId, type);
    }
  }

  /**
   * Handles the purchase action. Opens a confirmation dialog and, if confirmed, opens rebuy.de in a new tab.
   */
  onPurchase() {
    // Get the current offer synchronously for dialog data
    this.offer$.pipe(take(1)).subscribe((offer) => {
      if (!offer) return;
      const dialogRef = this.dialog.open(PurchaseConfirmDialogComponent, {
        data: { offer },
      });
      dialogRef.afterClosed().subscribe((confirmed: boolean) => {
        if (confirmed) {
          window.open('https://www.rebuy.de', '_blank');
        }
      });
    });
  }
}
