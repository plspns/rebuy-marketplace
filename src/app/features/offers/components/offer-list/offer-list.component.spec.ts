import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OfferListComponent } from './offer-list.component';
import { OfferService } from '../../services/offer.service';
import { Offer } from '../../models/offer.model';
import { of } from 'rxjs';
import { provideRouter } from '@angular/router';

describe('OfferListComponent (lean)', () => {
  let component: OfferListComponent;
  let fixture: ComponentFixture<OfferListComponent>;
  let offerService: OfferService;

  const mockOffers: Offer[] = [
    {
      id: 'b1a7e2c0-1f2a-4e3b-9c4d-1a2b3c4d5e6f',
      title: 'iPhone 13 Pro',
      description: 'Refurbished, 256GB Space Gray, Grade A',
      price: 749,
      merchant: 'TechRevive',
      imageUrl:
        'https://images.unsplash.com/photo-1632661674596-df8be070a5c5?w=400',
      votes: 15,
      userVote: null,
    },
    {
      id: 'c2b8f3d1-2e3b-5f4c-8d5e-2b3c4d5e6f7a',
      title: 'Samsung Galaxy S22',
      description: 'Very good condition, 128GB, unlocked',
      price: 449,
      merchant: 'PhoneHub',
      imageUrl:
        'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400',
      votes: 23,
      userVote: null,
    },
    {
      id: 'e4d0h5f3-4g5d-7h6e-0f7a-4d5e6f7a8b9c',
      title: 'MacBook Air M1',
      description: 'Excellent condition, 8GB RAM, 256GB SSD',
      price: 849,
      merchant: 'LaptopWorld',
      imageUrl:
        'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400',
      votes: 31,
      userVote: null,
    },
  ];

  beforeEach(async () => {
    const mockOfferService = {
      getOffers: jasmine.createSpy('getOffers').and.returnValue(of(mockOffers)),
    };

    await TestBed.configureTestingModule({
      imports: [OfferListComponent],
      providers: [
        { provide: OfferService, useValue: mockOfferService },
        provideRouter([]),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(OfferListComponent);
    component = fixture.componentInstance;
    offerService = TestBed.inject(OfferService); // This is now your mock
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display all offers', (done) => {
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const compiled = fixture.nativeElement;
      const titles = Array.from(
        compiled.querySelectorAll('mat-card-title')
      ).map((el: any) => el.textContent?.trim());
      expect(titles).toContain('iPhone 13 Pro');
      expect(titles).toContain('Samsung Galaxy S22');
      expect(titles).toContain('MacBook Air M1');
      expect(titles.length).toBe(3);
      done();
    });
  });

  it('should display votes for each offer', (done) => {
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const compiled = fixture.nativeElement;
      const votes = Array.from(compiled.querySelectorAll('.vote-count')).map(
        (el: any) => el.textContent
      );
      expect(votes).toContain('15');
      expect(votes).toContain('23');
      expect(votes).toContain('31');
      done();
    });
  });

  it('should show empty state if no offers', (done) => {
    (offerService.getOffers as jasmine.Spy).and.returnValue(of([]));

    component.offers$ = offerService.getOffers();

    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const compiled = fixture.nativeElement;
      expect(compiled.textContent).toContain('No offers available');
      done();
    });
  });
});
