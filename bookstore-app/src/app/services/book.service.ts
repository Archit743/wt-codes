import { Injectable } from '@angular/core';
import { Book } from '../models/book.model';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private books: Book[] = [
    {
      id: 1,
      title: 'The Maze Runner',
      author: 'James Dashner',
      price: 8.99,
      description: 'A thrilling dystopian novel about a group of teens trapped in a maze.'
    },
    {
      id: 2,
      title: 'White nights',
      author: 'Fyodor Dostoevsky',
      price: 12.99,
      description: 'A exploration of the human psyche and the nature of love.'
    },
    {
      id: 3,
      title: 'Diary of a wimpy kid',
      author: 'Jeff Kinney',
      price: 10.99,
      description: 'A humorous take on the life of a middle schooler, filled with illustrations.'
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