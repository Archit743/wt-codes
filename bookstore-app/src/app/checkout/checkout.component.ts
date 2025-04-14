import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Book } from '../models/book.model';
import { BookService } from '../services/book.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  cartItems: Book[] = [];
  total: number = 0;
  
  customerName: string = '';
  email: string = '';
  address: string = '';

  constructor(
    private bookService: BookService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.cartItems = this.bookService.getCart();
    this.total = this.bookService.getTotal();
    
    if (this.cartItems.length === 0) {
      this.router.navigate(['/']);
    }
  }

  placeOrder(): void {
    if (this.customerName && this.email && this.address) {
      alert('Order placed successfully!');
      this.bookService.clearCart();
      this.router.navigate(['/']);
    } else {
      alert('Please fill in all required fields.');
    }
  }
}