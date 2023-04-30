import { Injectable } from '@angular/core';
import { Item } from './item';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  private itemsUrl = 'http://localhost:3057';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  
  constructor(private http: HttpClient) { }

  getItem(_id: String): Observable<Item> {
    const url = `${this.itemsUrl}/item/${_id}`;
    return this.http.get<Item>(url).pipe(
      tap((response: Item) => {
        return response;
      })
      ,catchError(this.handleError<Item>(null))
    );
  }
  
  getItems(): Observable<Item[]> {
    return this.http.get<Item[]>(`${this.itemsUrl}/items`)
    .pipe(
      catchError(this.handleError<Item[]>('getItems', []))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
