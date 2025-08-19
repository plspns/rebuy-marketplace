
import { TestBed } from '@angular/core/testing';
import { OfferService } from './offer.service';
import { firstValueFrom } from 'rxjs';
import { MOCK_OFFERS } from '../data/mock-offers';

describe('OfferService', () => {
  let service: OfferService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OfferService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return offers array', async () => {
    const offers = await firstValueFrom(service.getOffers());
    expect(offers.length).toBeGreaterThan(0);
    expect(Array.isArray(offers)).toBeTrue();
  });

  it('should get offer by id', async () => {
    const offer = service.getOfferById(MOCK_OFFERS[0].id);
    expect(offer).toBeTruthy();
    expect(offer?.id).toBe(MOCK_OFFERS[0].id);
  });

  it('should update votes on upvote', async () => {
    const offer = service.getOfferById(MOCK_OFFERS[0].id);
    if (!offer) throw new Error('Offer not found');
    const initialVotes = offer.votes;
    service.voteOffer(offer.id, 'up');
    const updated = service.getOfferById(offer.id);
    expect(updated?.votes).toBe(initialVotes + 1);
    // Toggle off
    service.voteOffer(offer.id, 'up');
    const toggled = service.getOfferById(offer.id);
    expect(toggled?.votes).toBe(initialVotes);
  });

  it('should update votes on downvote', () => {
    const offer = service.getOfferById(MOCK_OFFERS[0].id);
    if (!offer) throw new Error('Offer not found');
    const initialVotes = offer.votes;
    service.voteOffer(offer.id, 'down');
    const updated = service.getOfferById(offer.id);
    expect(updated?.votes).toBe(initialVotes - 1);
    // Toggle off
    service.voteOffer(offer.id, 'down');
    const toggled = service.getOfferById(offer.id);
    expect(toggled?.votes).toBe(initialVotes);
  });
});
