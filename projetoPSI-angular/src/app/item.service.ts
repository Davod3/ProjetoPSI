import { Injectable } from '@angular/core';
import { Item } from './item';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, switchMap, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  private itemsUrl = 'http://localhost:3057';

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

  getItemByName(name: string): Observable<Item> {
    const url = `${this.itemsUrl}/item?name=${encodeURIComponent(name)}`;
    console.log(url);
    return this.http.get<Item>(url).pipe(
      tap((response: Item) => {
        console.log(response);
        return response;
      }),
      catchError(this.handleError<Item>(null))
    );
  }

  searchItems(searchTerm: string): Observable<Item[]> {
    const url = `${this.itemsUrl}/items`;
    console.log(url);
    return this.http.get<Item[]>(url).pipe(
      map(items => {
        // filter items whose name partially matches the search term
        return items.filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()));
      }),
      tap(filteredItems => {
        if (filteredItems.length === 0) {
          console.log(`No results found for "${searchTerm}"`);
        } else {
          console.log(`${filteredItems.length} results found for "${searchTerm}"`);
        }
      }),
      catchError(this.handleError<Item[]>('searchItems', []))
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
