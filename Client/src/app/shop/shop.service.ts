import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPagination } from '../shared/models/pagination';
import { Product } from '../shared/models/product';
import { map, Observable, of } from 'rxjs';
import { Brand } from '../shared/models/brand';
import { ProductType } from '../shared/models/productType';
import { ShopParams } from '../shared/models/shopParams';
import { PagerComponent } from 'ngx-bootstrap/pagination';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  baseUrl = 'https://localhost:5001/api/';
  products: Product[] = [];
  brands: Brand[] = [];
  types: ProductType[] = [];
  pagination!: IPagination<Product[]>;
  shopParams = new ShopParams();
  productCache = new Map<string, IPagination<Product[]>>();

  constructor(private http: HttpClient) { }

  getProducts(useCache: boolean) : Observable<IPagination<Product[]>>{
    if (!useCache)
      this.products = [];

    if (this.products.length > 0 && useCache){
      const pagesReceived = Math.ceil(this.products.length / this.shopParams.pageSize);
      if (this.shopParams.pageNumber <= pagesReceived){
        this.pagination.data = this.products.slice((this.shopParams.pageNumber - 1) * this.shopParams.pageSize, this.shopParams.pageNumber * this.shopParams.pageSize);
        return of (this.pagination);
      }
    }
      
    let params = new HttpParams();
    if (this.shopParams.brandId !== 0)  
      params = params.append('brandId', this.shopParams.brandId.toString());

    if (this.shopParams.typeId !== 0)
      params = params.append('typeId', this.shopParams.typeId.toString());

    if (this.shopParams.search)
      params = params.append('search', this.shopParams.search);

    params = params.append('sort', this.shopParams.sort);
    params = params.append('pageIndex', this.shopParams.pageNumber.toString());
    params = params.append('pageSize', this.shopParams.pageSize.toString());

    return this.http.get<IPagination<Product[]>>(this.baseUrl + 'products', {observe: 'response', params})
                  .pipe
                  (map(response => {
                    this.products = [...this.products, ...response.body?.data as Product[]];
                    this.pagination = response.body as IPagination<Product[]>;
                    return this.pagination; //<IPagination<Product[]>>response.body;
                  }));
  }

  setShopParams(params: ShopParams) {
    this.shopParams = params;
  }

  getShopParams() {
    return this.shopParams;
  }

  getProduct(id: number) : Observable<Product>{
    const product = this.products.find(i => i.id === id)
    if (product)
      return of(product);

    return this.http.get<Product>(this.baseUrl + 'products/' + id);
  }

  getBrands() : Observable<Brand[]>{
    if (this.brands.length > 0)
      return of(this.brands);

    return this.http.get<Brand[]>(this.baseUrl + 'products/brands')
                .pipe(map(response =>{
                  this.brands = response;
                  return response;
                }));;
  }

  getTypes() : Observable<ProductType[]>{
    if (this.types.length > 0)
      return of(this.types);

    return this.http.get<ProductType[]>(this.baseUrl + 'products/types')
                .pipe(map(response =>{
                  this.types = response;
                  return response;
                }));
  }
}
