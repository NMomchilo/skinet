import { Component, OnInit } from '@angular/core';
import { BasketService } from '../../basket/basket.service';
import { Observable } from 'rxjs';
import { IBasket } from '../../shared/models/basket';

@Component({
  selector: 'app-checkout-review',
  templateUrl: './checkout-review.component.html',
  styleUrl: './checkout-review.component.scss'
})
export class CheckoutReviewComponent implements OnInit {
  basket$?: Observable<IBasket>

  constructor(private basketService: BasketService){}

  ngOnInit(): void {
    this.basket$ = this.basketService.basket$ as Observable<IBasket>;
  }

}
