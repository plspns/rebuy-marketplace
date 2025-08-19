
// Angular service for managing offers and voting logic
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Offer } from '../models/offer.model';
import { MOCK_OFFERS } from '../data/mock-offers';

@Injectable({ providedIn: 'root' })
export class OfferService {
  // Holds the current list of offers, initially sorted by votes (descending)
  private offersSubject = new BehaviorSubject<Offer[]>([...MOCK_OFFERS].sort((a, b) => b.votes - a.votes));

  // Observable for components to subscribe to the offers list
  offers$ = this.offersSubject.asObservable();

  /**
   * Returns an observable of the current offers list.
   * Components should subscribe to this to get updates.
   */
  getOffers(): Observable<Offer[]> {
    return this.offers$;
  }

  /**
   * Finds a single offer by its ID from the current list.
   * @param id The offer's unique identifier
   */
  getOfferById(id: string): Offer | undefined {
    return this.offersSubject.value.find(o => o.id === id);
  }

  /**
   * Handles voting logic for an offer.
   * - If the user clicks the same vote again, it toggles off their vote.
   * - If the user changes their vote, it updates accordingly.
   * - After voting, the offers list is re-sorted by votes (descending) and emitted.
   * @param offerId The offer to vote on
   * @param type 'up' for upvote, 'down' for downvote
   */
  voteOffer(offerId: string, type: 'up' | 'down') {
    const offers = this.offersSubject.value.map(offer => {
      if (offer.id === offerId) {
        let newVotes = offer.votes;
        if (offer.userVote === type) {
          // User is toggling off their vote
          newVotes += type === 'up' ? -1 : 1;
          return { ...offer, votes: newVotes, userVote: null };
        } else {
          // Remove previous vote if any
          if (offer.userVote === 'up') newVotes--;
          if (offer.userVote === 'down') newVotes++;
          // Add new vote
          newVotes += type === 'up' ? 1 : -1;
          return { ...offer, votes: newVotes, userVote: type };
        }
      }
      return offer;
    });
    // Always sort by votes descending before emitting
    this.offersSubject.next(offers.sort((a, b) => b.votes - a.votes));
  }
}
