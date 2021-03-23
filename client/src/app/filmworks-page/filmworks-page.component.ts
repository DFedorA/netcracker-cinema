import { Component, OnInit, OnDestroy } from '@angular/core';
import {ProductService} from '../shared/services/product.service';
import {Subscription} from 'rxjs';
import {Product} from '../shared/Interfaces';
import {Router} from '@angular/router';

@Component({
  selector: 'app-filmworks-page',
  templateUrl: './filmworks-page.component.html',
  styleUrls: ['./filmworks-page.component.less']
})
export class FilmworksPageComponent implements OnInit, OnDestroy {
  type: string = "all";
  sort: string = "none";
  productList: Product[];
  filteredList: Product[];
  s: Subscription;

  constructor(private productService: ProductService, private router: Router) { }

  ngOnInit() {
    this.s = this.productService.getAll().subscribe(productList => {
      this.productList = this.filteredList = productList;
    });
  }

  OnChoose(product){
    this.router.navigate(['/film', product._id]);
  }

  ngOnDestroy() {
    if (this.s) this.s.unsubscribe();
  }
}
