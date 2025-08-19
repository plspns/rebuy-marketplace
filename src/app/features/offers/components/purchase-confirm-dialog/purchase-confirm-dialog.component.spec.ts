import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseConfirmDialogComponent } from './purchase-confirm-dialog.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

describe('PurchaseConfirmDialogComponent', () => {
  let component: PurchaseConfirmDialogComponent;
  let fixture: ComponentFixture<PurchaseConfirmDialogComponent>;
  let dialogRefSpy: jasmine.SpyObj<
    MatDialogRef<PurchaseConfirmDialogComponent>
  >;
  const mockOffer = {
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
    dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);
    await TestBed.configureTestingModule({
      imports: [PurchaseConfirmDialogComponent],
      providers: [
        { provide: MatDialogRef, useValue: dialogRefSpy },
        { provide: MAT_DIALOG_DATA, useValue: { offer: mockOffer } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PurchaseConfirmDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
