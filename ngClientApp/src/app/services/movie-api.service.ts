import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Movie } from '../models/movie';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MovieApiService {
  private moviesUrl = 'http://localhost:3000/api/movies';
  private cheapestMovieUrl = `${this.moviesUrl}/cheapest`;

  constructor(private http: HttpClient) { }

  getMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(this.moviesUrl)
    .pipe(
      catchError(this.handleError<Movie[]>('getMovies', []))
    );    
  }
  
  getMovie(universalID: string): Observable<Movie> {
    const url = `${this.cheapestMovieUrl}/${universalID}`;    
    return this.http.get<Movie>(url)
    .pipe(      
      catchError(this.handleError<Movie>(`getMovie id=${universalID}`))
    );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
         
      console.error(error);    
      console.error(`${operation} failed: ${error.message}`);
   
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}