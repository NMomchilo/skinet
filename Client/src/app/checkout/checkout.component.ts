import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../account/account.service';
import { Observable } from 'rxjs';
import { IBasketTotals } from '../shared/models/basket';
import { BasketService } from '../basket/basket.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent implements OnInit {
  basketTotal$?: Observable<IBasketTotals | null>;
  checkoutForm = this.fb.group({
    addressForm: this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      street: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zipcode: ['', Validators.required],
    }),
    deliveryForm: this.fb.group({
      deliveryMethod: ['', Validators.required]
    }),
    paymentForm: this.fb.group({
      nameOnCard: ['', Validators.required]
    })
  })

  constructor(private fb: FormBuilder, private accountService: AccountService, private basketService: BasketService){}

  ngOnInit(): void {
    this.basketTotal$ = this.basketService.basketTotal$;
    this.getAddressFormValues();
  }

  getAddressFormValues(){
    this.accountService.getUserAddress().subscribe({
      next: address => {
        if (address)
          this.checkoutForm.get('addressForm')?.patchValue(address);
      }
    });
  }
}
