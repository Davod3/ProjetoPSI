import { Injectable } from '@angular/core';
import { Item } from './item';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, switchMap, tap } from 'rxjs/operators';

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
    console.log("HERE1");
    const url = `${this.itemsUrl}/item/${_id}`;
    console.log(url);
    return this.http.get<Item>(url).pipe(
      tap((response: Item) => {
        console.log(response);
        return response;
      })
      ,catchError(this.handleError<Item>(null))
    );
  }
  
  getItems(): Observable<Item[]> {
    console.log("HERE2");
    return this.http.get<Item[]>(`${this.itemsUrl}/items`)
    .pipe(
      catchError(this.handleError<Item[]>('getItems', []))
    );
  }

  getItemIDByName(name: string): Observable<string> {
    return this.getItems().pipe(
      map(items => {
        const item = items.find(item => item.name === name);
        return item ? item._id.toString() : '';
      }),
      catchError(this.handleError<string>('getItemByName'))
    );
  }

  searchItems(term: string): Observable<Item[]> {
    if (!term.trim()) {
      // if not search term, return empty item array.
      return of([]);
    }
  
    return this.getItemIDByName(term).pipe(
      switchMap((id: string) => {
        const url = `${this.itemsUrl}/item/${id}`;
        return this.http.get<Item[]>(url).pipe(
          tap(x => x.length ?
            console.log(`found items matching "${term}"`) :
            console.log(`no items matching "${term}"`)
          ),
          catchError(this.handleError<Item[]>('searchItems', []))
        );
      })
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
