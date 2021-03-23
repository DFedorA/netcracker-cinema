import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {switchMap} from 'rxjs/operators';
import {Person, Product} from '../shared/Interfaces';
import {PersonsService} from '../admin/shared/services/persons.service';
import {ProductService} from '../shared/services/product.service';
import {Observable, Subscription} from 'rxjs';

@Component({
  selector: 'app-person-description',
  templateUrl: './person-description.component.html',
  styleUrls: ['./person-description.component.less']
})
export class PersonDescriptionComponent implements OnInit {

  person: Person;
  products: Array<Product>;
  pSub: Subscription;

  constructor(private route: ActivatedRoute, private personService: PersonsService,
              private productService: ProductService, private router: Router) {
    this.products = new Array<Product>();
  }

  ngOnInit(): void {
    this.route.params.pipe(
      switchMap((params: Params) => {
        return this.personService.getById(params.id);
      })
    ).subscribe((person: Person) => {
      this.person = person;
      if (this.person.products) {
        if (this.person.products.length === 1){
          this.person.products = JSON.parse(this.person.products);
        }
      }
      for (const product of this.person.products) {
        this.pSub = this.productService.getById(product).subscribe(currentProduct => {
          this.products.push(currentProduct);
        });
      }
    });
  }


  OnChoose(product){
    this.router.navigate(['/film', product._id]);
  }
}
