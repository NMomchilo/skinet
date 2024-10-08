import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BasketService } from '../../../basket/basket.service';
import { IBasketItem } from '../../models/basket';
import { IOrderItem } from '../../models/order';

@Component({
  selector: 'app-basket-summary',
  templateUrl: './basket-summary.component.html',
  styleUrl: './basket-summary.component.scss'
})
export class BasketSummaryComponent {
  @Output() increment = new EventEmitter<IBasketItem>();
  @Output() remove = new EventEmitter<IBasketItem>();
  @Output() decrement = new EventEmitter<IBasketItem>();
  @Input() isBasket = true;
  @Input() items: any[] = [];
  @Input() isOrder = false;
  
  constructor() {}
  incrementItemQuantity(item: IBasketItem) {
    this.increment.emit(item);
  }

  removeBasketItem(item: IBasketItem) {
    this.remove.emit(item);
  }

  decrementItemQuantity(item: IBasketItem){
    this.decrement.emit(item);
  }
}
