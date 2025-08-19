import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseConfirmDialogComponent } from './purchase-confirm-dialog.component';

describe('PurchaseConfirmDialogComponent', () => {
  let component: PurchaseConfirmDialogComponent;
  let fixture: ComponentFixture<PurchaseConfirmDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PurchaseConfirmDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PurchaseConfirmDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
