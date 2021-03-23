import {Component, OnDestroy, OnInit} from '@angular/core';
import {OwlOptions} from 'ngx-owl-carousel-o';
import {ProductService} from '../shared/services/product.service';
import {Product} from "../shared/Interfaces";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.less']
})
export class HomePageComponent  implements OnInit, OnDestroy {
  productList: Product[];
  s1: Subscription;

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    nav: true,
    navText: ['<img src=\'../../uploads/row-left.svg\'>', '<img  src=\'../../uploads/row-right.svg\'>'],
    responsive: {
      0: {
        items: 1
      },
      992: {
        items: 1
      }
    }

  };
  constructor(private productService: ProductService, private router: Router) {
  }

  ngOnInit() {
    this.s1 = this.productService.getAll().subscribe(productList => {
      this.productList = productList;
    });
  }
  ngOnDestroy() {
    if (this.s1) this.s1.unsubscribe();
  }
  OnChoose(product){
    this.router.navigate(['/film', product._id]);
  }
}
