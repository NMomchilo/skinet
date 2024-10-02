import { Component, OnInit } from '@angular/core';
import { IOrder } from '../../shared/models/order';
import { OrdersService } from '../orders.service';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbService } from 'xng-breadcrumb';

@Component({
  selector: 'app-order-detailed',
  templateUrl: './order-detailed.component.html',
  styleUrl: './order-detailed.component.scss'
})
export class OrderDetailedComponent implements OnInit {
  order?: IOrder;

  constructor(private ordersService: OrdersService, private route: ActivatedRoute,
    private bcService: BreadcrumbService){
      this.bcService.set('@OrderDetailed', ' ');
    }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    id && this.ordersService.getOrderDetailed(+id).subscribe({
      next: order => {
        this.order = order;
        this.bcService.set('@OrderDetailed', `Order# ${order.id} - ${order.status}`);
      }
    });
  }
}
