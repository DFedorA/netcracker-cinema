import {Pipe, PipeTransform} from '@angular/core';
import {Person, Product} from '../../shared/Interfaces';

@Pipe({
  name: 'searchPersons'
})
export class SearchPipe implements PipeTransform {
  transform(persons: Person[], search = ''): Person[] {
    if (!search.trim()) {
      return persons;
    }

    return persons.filter(person => {
      return person.nameRu.toLowerCase().includes(search.toLowerCase());
    });
  }
}

@Pipe({
  name: 'searchProducts'
})
export class SearchPipeProduct implements PipeTransform {
  transform(products: Product[], search = ''): Product[] {
    if (!search.trim()) {
      return products;
    }

    return products.filter(product => {
      return product.name.toLowerCase().includes(search.toLowerCase());
    });
  }
}
