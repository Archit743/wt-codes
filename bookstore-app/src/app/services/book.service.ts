import { Injectable } from '@angular/core';
import { Book } from '../models/book.model';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private books: Book[] = [
    {
      id: 1,
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      price: 9.99,
      description: 'A story of wealth, love and tragedy in the Jazz Age.'
    },
    {
      id: 2,
      title: 'To Kill a Mockingbird',
      author: 'Harper Lee',
      price: 12.99,
      description: 'A classic of modern American literature about racial inequality.'
    },
    {
      id: 3,
      title: '1984',
      author: 'George Orwell',
      price: 10.99,
      description: 'A dystopian social science fiction novel.'
    }
  ];

  private cart: Book[] = [];

  getBooks(): Book[] {
    return this.books;
  }

  getCart(): Book[] {
    return this.cart;
  }

  addToCart(book: Book): void {
    this.cart.push(book);
  }

  removeFromCart(id: number): void {
    const index = this.cart.findIndex(book => book.id === id);
    if (index !== -1) {
      this.cart.splice(index, 1);
    }
  }

  clearCart(): void {
    this.cart = [];
  }

  getTotal(): number {
    return this.cart.reduce((total, book) => total + book.price, 0);
  }
}