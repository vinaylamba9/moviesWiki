import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Movie } from './movie.model';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private movies: Movie[] = [];
  private moviesUpdated = new Subject<{ movies: Movie[]}>();

  constructor(public http: HttpClient, public route: Router) { }

  addMovie(name: string, year: string, story: string,cast: [], poster: string ) {
    const movieData = {"name": name,
    "year": year,
    "story": story,
    "cast": cast,
    "poster": poster
  };
    this.http
      .post<{ message: string; movie: Movie }>(
        "http://localhost:3000/movie",
        movieData
      )
      .subscribe(responseData => {
        this.route.navigate(["/"]);
      });
  }

  getMovieUpdateListener() {
    return this.moviesUpdated.asObservable();
  }

  getMovies() {
    this.http
      .get<{ message: string; movies: any;}>(
        "http://localhost:3000/movies"
      )
      .pipe(
        map(movieData => {
          return {
            movies: movieData.movies.map(movie => {
              const imageBlob = this.dataURItoBlob(movie.poster);
              //const date = new Date().getTime().toString();
              //const imageFile = new File([imageBlob], date, { type: 'image/jpeg' });
              const dataURL = URL.createObjectURL(imageBlob);
              return {
                name: movie.name,
                year: movie.year,
                id: movie._id,
                cast: movie.cast,
                story: movie.story,
                poster: dataURL
              };
            }),
          };
        })
      )
      .subscribe(transformedMovieData => {
        this.movies = transformedMovieData.movies;
        this.moviesUpdated.next({
          movies: [...this.movies]
        });
      });
  }

  dataURItoBlob(dataURI) {
    const byteString = window.atob(dataURI);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([int8Array], { type: 'image/jpeg' });
    return blob;
 }

 updateMovie(id: string,name: string, year: string, story: string,cast: [], poster: string) {
  const movieData = {
    "name": name,
    "year": year,
    "story": story,
    "cast": cast,
    "poster": poster
};
  this.http
    .put("http://localhost:3000/editMovie/" + id, movieData)
    .subscribe(response => {
      this.route.navigate(["/"]);
    });
}


 getMovie(id: string) {
  return this.http.get<{
    _id: string;
    name: string;
    year: string;
    story: string;
    cast: [];
    poster: string;
  }>("http://localhost:3000/editMovie/" + id);
}

 deleteMovie(id: string){
  return this.http.delete("http://localhost:3000/movie/edit/" + id);
}


}
