import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Message} from "../Interfaces";

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  constructor(private http: HttpClient) {
  }

  fetch(): Observable<any> {
    return this.http.get('/api/feedback');
  }

  getById(id: string): Observable<any> {
    return this.http.get(`/api/feedback/${id}`);
  }

  create(feedback): Observable<any> {
    return this.http.post('/api/feedback', feedback);
  }

  delete(id: string): Observable<Message> {
    return this.http.delete<Message>(`/api/feedback/${id}`);
  }
}
