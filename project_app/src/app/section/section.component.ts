import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AddActorComponent } from '../add-actor/add-actor.component';
import { MatDialog } from '@angular/material';
import { MovieService } from '../movie.service';
import { Subscription } from 'rxjs';
import { Movie } from '../movie.model';
import { DomSanitizer, SafeResourceUrl, SafeUrl} from '@angular/platform-browser';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html'
})
export class SectionComponent implements OnInit, OnDestroy {

  movies: Movie[] = [];
  moviesSub: Subscription;
  constructor(private route: Router, public dialog: MatDialog, private moviesService: MovieService, public sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.moviesService.getMovies();
    this.moviesSub = this.moviesService.getMovieUpdateListener().subscribe((moviesData: { movies: Movie[] }) =>{
      this.movies = moviesData.movies;
    })
  }

 onDelete(movieId: string){
    this.moviesService.deleteMovie(movieId).subscribe(() => {
      this.moviesService.getMovies();
    });
  }

  navigateMovie(){
    this.route.navigate(['/addMovie']);
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(AddActorComponent, {
      width: '600px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  ngOnDestroy(){
    this.moviesSub.unsubscribe();
  }
}
