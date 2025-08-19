# Rebuy Marketplace

Rebuy Marketplace is a minimal viable product (MVP) web application for browsing, voting, and purchasing refurbished tech offers.

## Features

- Browse a list of offers
- View offer details
- Vote on offers
- Confirm purchase with a custom dialog
- Responsive, Material Design UI

## Tech Stack

- [Angular 19](https://angular.dev/)
- [Angular Material](https://material.angular.io/)
- RxJS for reactive state management

## Technical Decisions
- **No Backend/API Integration**: For this MVP, all data is managed locally without backend or HTTP integration. This keeps the application lightweight and focused on demonstrating core functionality. The service is structured so it can be easily swapped for real HTTP/API calls.
- **State management:**  This project uses `BehaviorSubject` for state management instead of NgRx. Since this is a simple MVP with straightforward state requirements, `BehaviorSubject` provides a lightweight solution without the added complexity of NgRx. If the application grows in complexity, adopting a state management library like NgRx should be considered in the future.
- **Domain-oriented Folder Structure:**  
  The project organizes code by main feature area, with a top-level folder (such as `offers`) containing subfolders for components, services, models, and data. This keeps all related files together, making the codebase easier to navigate and scale as new features are added.
- **Purchase Flow:**  
  Since the app uses mock data and does not integrate with the real rebuy product catalog, the purchase action simply redirects to rebuy.de as a demonstration. This approach is aligned with the MVP requirements, which specify using the existing rebuy platform for purchases. In a production environment, this would link to the actual product page on the rebuy platform and let the user complete the purchase.

## Requirements Coverage

- [x] List all offers, ordered by votes
- [x] View details for a specific offer
- [x] Upvote/downvote offers
- [x] Purchase an offer (redirect to rebuy.de)
- [x] Responsive design and client-side routing

### Development Server
Start the local server:

```bash
ng serve
```
Visit [http://localhost:4200/](http://localhost:4200/) in your browser.

### Building for Production

```bash
ng build --configuration production
```
The build artifacts will be stored in the `dist/` directory.

### Running Tests

Unit tests:
```bash
ng test
```

## Project Structure

- `src/app/features/offers/` — Feature modules, components, services, and models for offers
- `src/app/features/offers/components/purchase-confirm-dialog/` — Custom purchase confirmation dialog
- `src/app/features/offers/services/offer.service.ts` — Business logic and state management

## Future Improvements


If this MVP were to be developed further, possible next steps could include:

- Integrate with a real backend API for offers and purchases
- Add authentication and user profiles
- Implement pagination or infinite scroll for large offer lists
- Use NgRx for advanced state management
- Improve accessibility (a11y) and add more ARIA labels
- Add more comprehensive unit tests
- Enhance error handling and user feedback
- Add internationalization (i18n) support
- Add sorting/filtering options for offers
