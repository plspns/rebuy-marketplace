

// Angular core and common modules
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// Third-party modules
import { Observable } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

// App-specific imports
import { Offer } from '../../models/offer.model';
import { OfferService } from '../../services/offer.service';


@Component({
  selector: 'app-offer-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './offer-list.component.html',
  styleUrl: './offer-list.component.css',
})
export class OfferListComponent {
  // Observable stream of offers for the template to subscribe to (async pipe)
  offers$: Observable<Offer[]>;

  /**
   * Injects the OfferService and subscribes to the offers observable.
   * The offers$ observable will emit a new value whenever the offers list changes (e.g., after voting).
   */
  constructor(private offerService: OfferService) {
    this.offers$ = this.offerService.getOffers();
  }
}
