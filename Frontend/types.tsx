export interface Movie {
  id: string | number;
  title: string;
  year: string;
  rating: number;
  runtime?: string;
  genre: string;
  imageUrl: string;
  plot?: string;
}

