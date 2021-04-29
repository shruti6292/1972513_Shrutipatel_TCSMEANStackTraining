
import { Component, VERSION } from '@angular/core';
import { CartService } from './cart.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  
  constructor(private cartService: CartService) { }

  items$ = this.cartService.items$;
  
  productsList = [
    { id: 1, name: 'Product 1' },
    { id: 2, name: 'Product 2' },
    { id: 3, name: 'Product 3' },
    { id: 4, name: 'Product 4' },
    { id: 5, name: 'Product 5' },
  ];

  addToCart(product) {
    this.cartService.addToCart(product);
  }

}

