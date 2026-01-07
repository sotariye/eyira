
export interface Product {
  id: string;
  name: string;
  size: string;
  price: string;
  imageUrl: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  content: string;
}
