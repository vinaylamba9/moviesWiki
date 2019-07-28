import { Component, OnInit, OnDestroy, OnChanges } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { MatDialog } from '@angular/material';
import { AddActorComponent } from '../add-actor/add-actor.component';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MovieService } from '../movie.service';
import { Movie } from '../movie.model';
import { ActorService } from '../actor.service';
import { Subscription } from 'rxjs';
import { Actor } from '../actor.model';

@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.css']
})
export class AddMovieComponent implements OnInit, OnDestroy {

  movie: Movie;
  form: FormGroup;
  mode = "create";
  MovieState = "Add New Movie";
  movieId: string;
  actorSub: Subscription;
  cast= [];
  public castList: string[] = [];

  base64textString: string;

  constructor(private dialog: MatDialog, public movieService: MovieService, public route: ActivatedRoute, private actorService: ActorService) { }


  ngOnInit() {
    this.actorService.getActors();
    this.actorSub = this.actorService
      .getActorUpdateListener().subscribe((actorsData: { actors: Actor[] }) =>{
        actorsData.actors.map( actor =>{
          this.castList.push(actor.name);
        });
    this.actorService.castSubject.subscribe(newActor =>{
        this.castList.push(newActor);
    })
    });

    this.form = new FormGroup({
      name: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(1)]
      }),
      year: new FormControl(null, {validators: [Validators.required]}),
      cast: new FormControl (null, {validators: [Validators.required] }),
      story: new FormControl(null, {validators: [Validators.required, Validators.minLength(5)]}),
      poster: new FormControl(null, {})
    });
    this.route.paramMap.subscribe((paramMap: ParamMap) =>{
      if(paramMap.has("id")){
        this.mode = "edit";
        this.MovieState = "Edit Movie";
        this.movieId = paramMap.get("id");
        this.movieService.getMovie(this.movieId).subscribe(movieData =>{
          this.movie = {
            id: movieData._id,
            name: movieData.name,
            year: movieData.year,
            story: movieData.story,
            cast: movieData.cast,
            poster: movieData.poster
          };
          this.form.setValue({
            name: this.movie.name,
            year: this.movie.year,
            story: this.movie.story,
            cast: this.movie.cast,
            poster: this.movie.poster
          });
        });
      }else{
        this.mode = "create";
        this.movieId = null;
      }
    });
  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({ image: file });
    this.form.get("poster").updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      reader.onload = this._handleReaderLoaded.bind(this);
      reader.readAsBinaryString(file);
    };
    reader.readAsDataURL(file);
  }

  _handleReaderLoaded(readerEvt) {
    var binaryString = readerEvt.target.result;
           this.base64textString= btoa(binaryString);
           console.log(btoa(binaryString));
   }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddActorComponent, {
      width: '600px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  onSaveMovie(){
    if (this.form.invalid) {
      return;
    }
    if (this.mode === "create") {
      this.movieService.addMovie(
        this.form.value.name,
        this.form.value.year,
        this.form.value.story,
        this.form.value.cast,
        this.base64textString
      );
    } else {
      this.movieService.updateMovie(
        this.movieId,
        this.form.value.name,
        this.form.value.year,
        this.form.value.story,
        this.form.value.cast,
        this.base64textString
      );
    }
    this.form.reset();
  }

  ngOnDestroy(){
    this.actorSub.unsubscribe();
  }

}
