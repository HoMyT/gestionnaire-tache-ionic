import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthUserService {
  url: string = 'http://localhost:3000/' ;

  inscriptionUser(email: string, password: string, name: string, last_name: string): Observable<any>{
    return this.http.post(this.url, {email, password, name, last_name})
    .pipe(
      catchError(this.handleError)
    )
  }

  connexionUser(email: string, password: string): Observable<any>{
    return this.http.post(`${this.url}connexion`, {email, password})
    .pipe(
      catchError(this.handleError)
    )
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
        // A client-side or network error occurred. Handle it accordingly.
        console.error('An error occurred:', error.error.message);
    } else {
        // The backend returned an unsuccessful response code.
        // The response body may contain clues as to what went wrong.
        console.error(
        `Backend returned code ${error.status}, body was: `, error.error.message);
    }
    // Return an observable with a user-facing error message.
        return throwError(() => new Error(error.error.message));
    }


  constructor(private http: HttpClient) { }

}
