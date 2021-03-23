import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Message} from '../../../shared/Interfaces';

@Injectable({providedIn: 'root'})
export class PersonsService {
  constructor(private http: HttpClient) {}

  fetch(): Observable<any>{
    return this.http.get('/api/person');
  }
  getById(id: string): Observable<any>{
    return this.http.get(`/api/person/${id}`);
  }
  create(person): Observable<any> {
    return this.http.post('/api/person', person);
  }
  update(id: string, person): Observable<any> {
    return this.http.patch(`/api/person/${id}`, person);
  }

  delete(id: string): Observable<Message> {
    return this.http.delete<Message>(`/api/person/${id}`);
  }
}
