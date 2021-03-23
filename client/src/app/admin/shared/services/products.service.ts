import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Message} from "../../../shared/Interfaces";

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }

  fetch(): Observable<any>{
    return this.http.get('/api/film');
  }

  getById(id: string): Observable<any>{
    return this.http.get(`/api/film/${id}`);
  }

  update(id: string, product): Observable<any> {
    return this.http.patch(`/api/film/${id}`, product);
  }

  create(product): Observable<any> {
    return this.http.post('/api/film', product);
  }

  delete(id: string): Observable<Message> {
    return this.http.delete<Message>(`/api/film/${id}`);
  }
}

