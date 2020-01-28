import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { BehaviorSubject, throwError } from 'rxjs';
import { AuthToken } from './auth-token.model';

export interface AuthResponseData {
  access_token: string;
  token_type: string;
  refresh_token: string;
  expires_in: number;
  scope: string;
  jti: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  token = new BehaviorSubject<AuthToken>(null);

  constructor(private http: HttpClient) {}

  login(username: string, password: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + btoa('fooClientIdPassword:secret')
    });

    const body = new HttpParams()
      .set('grant_type', 'password')
      .set('username', username)
      .set('password', password);

    return this.http.post<AuthResponseData>(
      'http://localhost:8080/oauth/token', body, { headers: headers}
    ).pipe(
      catchError(this.handleError),
      tap(resData => this.getToken(resData))
    );
  }

  register(username: string, password: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const body = {
      'username': username,
      'password': password
    }
    return this.http.post(
      'http://localhost:8080/api/users', body, {headers: headers}
    );
  }

  private getToken(authRes: AuthResponseData) {
    const token = new AuthToken(
      authRes.access_token, authRes.token_type,
      authRes.refresh_token, authRes.expires_in,
      authRes.scope, authRes.jti);
      console.log(token); //logolok
    this.token.next(token);
  }

  private handleError(errorResponse: HttpErrorResponse) {
    let errorMessage = 'An error occured';
    console.log(errorResponse);
    return throwError(errorMessage);
  }
}