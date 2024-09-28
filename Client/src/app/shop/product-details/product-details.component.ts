import { Component, OnInit } from '@angular/core';
import { Product } from '../../shared/models/product';
import { ShopService } from '../shop.service';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbService } from 'xng-breadcrumb';
import { empty } from 'rxjs';
import { BasketService } from '../../basket/basket.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent implements OnInit {
  product!: Product;
  quantity: number = 1;

  constructor(private shopService: ShopService, private activateRoute: ActivatedRoute, private breadcrumbService: BreadcrumbService, private basketService: BasketService){ 
    this.breadcrumbService.set('@productDetails', ' ');
  }

  ngOnInit(): void {
    this.loadProduct();
  }

  addItemToBasket(){
    this.basketService.addItemToBasket(this.product, this.quantity);
  }

  incrementQuantity(){
    this.quantity++;
  }

  decrementQuantity(){
    if (this.quantity > 1) 
      this.quantity--;
  }

  loadProduct(){
    this.shopService.getProduct(Number(this.activateRoute.snapshot.paramMap.get('id'))).subscribe({
      next: (response) => {this.product = response; this.breadcrumbService.set('@productDetails', this.product.name)},
      error: (error) => console.log(error)
    });
  }
}
