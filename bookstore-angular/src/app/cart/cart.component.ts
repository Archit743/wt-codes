import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { Book } from '../models/book.model';
import { BookService } from '../services/book.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: Book[] = [];
  total: number = 0;

  constructor(
    private bookService: BookService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.cartItems = this.bookService.getCart();
    this.calculateTotal();
  }

  removeFromCart(id: number): void {
    this.bookService.removeFromCart(id);
    this.cartItems = this.bookService.getCart();
    this.calculateTotal();
  }

  calculateTotal(): void {
    this.total = this.bookService.getTotal();
  }

  checkout(): void {
    this.router.navigate(['/checkout']);
  }
}