export interface Offer {
  id: string;
  title: string;
  description: string;
  price: number;
  votes: number;
  userVote?: 'up' | 'down' | null;
  imageUrl: string;
  merchant: string;
}

export interface Vote {
  offerId: string;
  type: 'up' | 'down';
}
