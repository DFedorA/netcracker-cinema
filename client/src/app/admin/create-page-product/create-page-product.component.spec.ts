import {TestBed} from '@angular/core/testing';
import {CreatePageProductComponent} from './create-page-product.component';
import {ProductsService} from '../shared/services/products.service';
import {PersonsService} from '../shared/services/persons.service';
import {HttpClient, HttpHandler} from '@angular/common/http';

describe('CreatePageProduct', () => {
  let app: CreatePageProductComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CreatePageProductComponent, ProductsService , PersonsService, HttpClient, HttpHandler]
    });
    app = TestBed.inject(CreatePageProductComponent);
  });

  it('should create', () => {
    expect(app).toBeDefined();
  });

});
