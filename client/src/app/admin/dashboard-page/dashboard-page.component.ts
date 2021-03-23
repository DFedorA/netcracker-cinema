import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {PersonsService} from '../shared/services/persons.service';
import {Subscription} from 'rxjs';
import {Person, Product} from '../../shared/Interfaces';
import {Router} from '@angular/router';
import {ProductsService} from "../shared/services/products.service";

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.less']
})
export class DashboardPageComponent implements OnInit, OnDestroy {
  @ViewChild('test') div: ElementRef;

  persons: Person[];
  products: Product[];
  personsSubscription: Subscription;
  productSub: Subscription;
  decisionSubscription: Subscription;
  searchStr = '';
  searchStrProduct = '';
  isVisible: boolean = false;

  constructor(private personsService: PersonsService,
              private productsService: ProductsService,
              private route: Router) {
  }

  ngOnInit(): void {
    this.personsSubscription = this.personsService.fetch().subscribe(persons => {
      this.persons = persons;
    });

    this.productSub = this.productsService.fetch().subscribe(products => {
      this.products = products;
    });
  }

  removePerson(id) {
    const decision = window.confirm('Вы уверены, что хотите удалить этот пост?');
    if (decision) {
      this.decisionSubscription = this.personsService.delete(id)
        .subscribe(
          res => {
            console.log(res.message);
          },
          error => {
            console.log(error.error.message);
          },
          () => {
            this.persons = this.persons.filter(person => person._id !== id);
          }
        );
    }
  }

  removeProduct(id) {
    const decision = window.confirm('Вы уверены, что хотите удалить это произведение?');
    if (decision) {
      this.decisionSubscription = this.productsService.delete(id)
        .subscribe(
          res => {
            console.log(res.message);
          },
          error => {
            console.log(error.error.message);
          },
          () => {
            this.products = this.products.filter(product => product._id !== id);
          }
        );
    }
  }

  getTableProduct() {
    this.isVisible = !this.isVisible;
    console.log(this.isVisible);
  }

  ngOnDestroy() {
    if (this.personsSubscription) {
      this.personsSubscription.unsubscribe();
    }
    if (this.decisionSubscription) {
      this.decisionSubscription.unsubscribe();
    }
  }

  trackByFn(index, item) {
    return item.id;
  }

}
