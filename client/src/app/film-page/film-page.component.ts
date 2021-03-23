import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {switchMap} from 'rxjs/operators';
import {ProductService} from '../shared/services/product.service';
import {Person, Product} from '../shared/Interfaces';
import {PersonsService} from '../admin/shared/services/persons.service';
import {Observable, Subscription} from 'rxjs';

@Component({
  selector: 'app-film-page',
  templateUrl: './film-page.component.html',
  styleUrls: ['./film-page.component.less']
})

export class FilmPageComponent implements OnInit {

  product: Product;
  persons: Array<Person>;
  director: Person;
  pSub: Subscription;

  constructor(private route: ActivatedRoute, private productService: ProductService,
              private personsService: PersonsService, private router: Router) {
    this.persons = new Array<Person>();
  }

  ngOnInit(): void {
    this.route.params.pipe(
      switchMap((params: Params) => {
        return this.productService.getById(params.id);
      })
    ).subscribe((product: Product) => {
      this.product = product;
      this.persons = [];
      if (this.product.person) {
        if (this.product.person.length === 1){
          this.product.person = JSON.parse(this.product.person);
        }
      }
      for (const person of this.product.person) {
        this.pSub = this.personsService.getById(person).subscribe(currentPerson => {
          this.persons.push(currentPerson);
        });
      }

      this.pSub = this.personsService.getById(this.product.director).subscribe(person => {
        this.director = person;
      });
    });
  }

  OnChoose(person){
    this.router.navigate(['/actor', person._id]);
  }
}
