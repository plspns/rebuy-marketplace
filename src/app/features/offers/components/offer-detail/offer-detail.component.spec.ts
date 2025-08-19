import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import {
  ActivatedRoute,
  convertToParamMap,
  provideRouter,
} from '@angular/router';
import { firstValueFrom, of } from 'rxjs';
import { OfferDetailComponent } from './offer-detail.component';
import { Offer } from '../../models/offer.model';
import { OfferService } from '../../services/offer.service';

describe('OfferDetailComponent', () => {
  let component: OfferDetailComponent;
  let fixture: ComponentFixture<OfferDetailComponent>;
  let offerServiceSpy: jasmine.SpyObj<OfferService>;

  const mockOffer: Offer = {
    id: 'b1a7e2c0-1f2a-4e3b-9c4d-1a2b3c4d5e6f',
    title: 'iPhone 13 Pro',
    description: 'Refurbished, 256GB Space Gray, Grade A',
    price: 749,
    merchant: 'TechRevive',
    imageUrl: 'https://example.com/image.jpg',
    votes: 15,
    userVote: null,
  };

  beforeEach(async () => {
    offerServiceSpy = jasmine.createSpyObj('OfferService', [
      'getOffers',
      'voteOffer',
    ]);

    offerServiceSpy.getOffers.and.returnValue(of([mockOffer]));

    await TestBed.configureTestingModule({
      imports: [OfferDetailComponent],
      providers: [
        provideRouter([]),
        { provide: OfferService, useValue: offerServiceSpy },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: convertToParamMap({
                id: 'b1a7e2c0-1f2a-4e3b-9c4d-1a2b3c4d5e6f',
              }),
            },
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(OfferDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load offer from route parameter', async () => {
    const offer = await firstValueFrom(component.offer$);
    expect(offer?.id).toBe('b1a7e2c0-1f2a-4e3b-9c4d-1a2b3c4d5e6f');
    expect(offer).toEqual(mockOffer);
  });

  it('should display offer information', async () => {
    await fixture.whenStable();
    const compiled = fixture.nativeElement;

    expect(compiled.textContent).toContain('iPhone 13 Pro');
    expect(compiled.textContent).toContain('TechRevive');
    expect(compiled.textContent).toContain('€749');
  });

  it('should handle voting', () => {
    component.vote('up');
    expect(offerServiceSpy.voteOffer).toHaveBeenCalledWith(
      'b1a7e2c0-1f2a-4e3b-9c4d-1a2b3c4d5e6f',
      'up'
    );
  });
});
