import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {Product} from '../Interfaces';


@Injectable({providedIn: 'root'})
export class ProductService {

  constructor(private  http: HttpClient) {
  }

  getAll(): Observable<any> {
    return this.http.get('/api/film');
  }

  getById(id: string): Observable<any> {
    return this.http.get(`/api/film/${id}`);
  }

  search(line: string): Observable<Product[]> {
    if (!line.trim()) {
      return of([]);
    } else {
      return this.http.get<Product[]>(`/api/product/${line}`);
    }
  }
}
