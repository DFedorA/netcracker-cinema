import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, Subject, throwError} from 'rxjs';
import {User, Token} from '../../../shared/Interfaces';
import {catchError, tap} from 'rxjs/operators';


@Injectable({providedIn: 'root'})
export class AuthService {
  public error$: Subject<string> = new Subject<string>();
  private token = null;

  constructor(private http: HttpClient) {
  }

  login(user: User): Observable<{ token: Token }> {
    return this.http.post<{ token: string }>('/api/auth/login', user)
      .pipe(
        tap(
          ({token}) => {
            localStorage.setItem('auth-token', token);
            this.setToken(token);
          }
        ),
        catchError(this.handleError.bind(this))
      );
  }

  handleError(error: HttpErrorResponse) {
    const {message} = error.error;
    this.error$.next(message);
    return throwError(error);
  }

  setToken(token: string) {
    this.token = token;
  }

  getToken(): string {

    return this.token;
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }

  logout() {
    this.setToken(null);
    localStorage.clear();
  }
}
