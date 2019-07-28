import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SectionComponent } from './section/section.component';
import { Routes, RouterModule } from '@angular/router';
import { AddMovieComponent } from './add-movie/add-movie.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActorsDataComponent } from './actors-data/actors-data.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { MatDialogModule } from '@angular/material';
import { AddActorComponent } from './add-actor/add-actor.component';
import { MaterialModule } from './material.module';
import { HttpClientModule } from '@angular/common/http';
import { WatchlistComponent } from './watchlist/watchlist.component';

const appRoutes : Routes = [
  { path : '' , component : SectionComponent},
  { path : 'addMovie' , component : AddMovieComponent},
  { path : 'movies' , component: SectionComponent},
  { path : 'actors', component: ActorsDataComponent },
  { path: 'edit/:id', component: AddActorComponent},
  { path: 'editMovie/:id', component: AddMovieComponent },
  { path: 'watchlist', component: WatchlistComponent },
  { path:"**" , redirectTo: 'movies'}
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SectionComponent,
    AddMovieComponent,
    ActorsDataComponent,
    AddActorComponent,
    WatchlistComponent
  ],
  imports: [
    NgMultiSelectDropDownModule.forRoot(),
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  entryComponents: [
    AddActorComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
