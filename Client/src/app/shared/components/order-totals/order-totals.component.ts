import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-order-totals',
  templateUrl: './order-totals.component.html',
  styleUrl: './order-totals.component.scss'
})
export class OrderTotalsComponent{
  @Input() shippingPrice?: number;
  @Input() subtotal?: number;
  @Input() total?: number;
}
