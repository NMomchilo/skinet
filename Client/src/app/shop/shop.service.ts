import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pagination } from '../shared/models/pagination';
import { Product } from '../shared/models/product';
import { map, Observable } from 'rxjs';
import { Brand } from '../shared/models/brand';
import { ProductType } from '../shared/models/productType';
import { ShopParams } from '../shared/models/shopParams';

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  constructor(private http: HttpClient) { }
  baseUrl = 'https://localhost:5001/api/';

  getProducts(shopParams: ShopParams) : Observable<Pagination<Product[]>>{
    let params = new HttpParams();
    if (shopParams.brandId !== 0)  
      params = params.append('brandId', shopParams.brandId.toString());

    if (shopParams.typeId !== 0)
      params = params.append('typeId', shopParams.typeId.toString());

    if (shopParams.search)
      params = params.append('search', shopParams.search);

    params = params.append('sort', shopParams.sort);
    params = params.append('pageIndex', shopParams.pageNumber.toString());
    params = params.append('pageSize', shopParams.pageSize.toString());

    return this.http.get<Pagination<Product[]>>(this.baseUrl + 'products', {observe: 'response', params})
                  .pipe(map(response => {return <Pagination<Product[]>>response.body;}));
  }

  getBrands() : Observable<Brand[]>{
    return this.http.get<Brand[]>(this.baseUrl + 'products/brands');
  }

  getTypes() : Observable<ProductType[]>{
    return this.http.get<ProductType[]>(this.baseUrl + 'products/types');
  }
}
