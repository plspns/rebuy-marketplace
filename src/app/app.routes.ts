import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/offers/components/offer-list/offer-list.component').then((m) => m.OfferListComponent),
  },
  {
    path: 'offers/:id',
    loadComponent: () =>
      import('./features/offers/components/offer-detail/offer-detail.component').then((m) => m.OfferDetailComponent),
  },
  { path: '**', redirectTo: '' },
];
