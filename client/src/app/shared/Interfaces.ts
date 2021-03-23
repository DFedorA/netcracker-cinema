export interface User {
  email: string;
  password: string;
}

export interface Feedback {
  _id?;
  sender: string;
  message: string;
}

export interface Person {
  _id?;
  nameRu: string;
  nameOriginal: string;
  specialty: string;
  dob: string;
  products: any;
  imageSrc: any;
}

export interface Message {
  message: string;
}

export interface Token {
  token: string;
}

export interface Product {
  _id?;
  name: string;
  type: string;
  country: string;
  year: Date;
  rating: number;
  description: string;
  trailerSrc: string;
  imageSrc: any;
  nameOriginal: string;
  genre: any;
  person: any;
  director: any;
}

export interface Genre {
  name: string;
}
