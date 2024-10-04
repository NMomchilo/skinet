import { Component, Input, OnInit } from '@angular/core';
import { BasketService } from '../../basket/basket.service';
import { Observable } from 'rxjs';
import { IBasket } from '../../shared/models/basket';
import { ToastrService } from 'ngx-toastr';
import { CdkStepper } from '@angular/cdk/stepper';

@Component({
  selector: 'app-checkout-review',
  templateUrl: './checkout-review.component.html',
  styleUrl: './checkout-review.component.scss'
})
export class CheckoutReviewComponent implements OnInit {
  @Input() appStepper?: CdkStepper;
  basket$?: Observable<IBasket>

  constructor(private basketService: BasketService, private toastr: ToastrService){}

  ngOnInit(): void {
    this.basket$ = this.basketService.basket$ as Observable<IBasket>;
  }

  createPaymentIntent(){
    return this.basketService.createPaymentItent().subscribe({
      next: res => {
        //this.toastr.success('Payment Itent Created');
        this.appStepper?.next();
      }
      //error: error => this.toastr.error(error.message)
    });
  }
}
