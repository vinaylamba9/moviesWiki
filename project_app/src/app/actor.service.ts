import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Actor } from './actor.model';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ActorService {

  private castList: string[] = [];
  private actors: Actor[] = [];
  private actorsUpdated = new Subject<{ actors: Actor[]}>();
  public castSubject = new Subject<string>();

  constructor(private http: HttpClient, private router: Router) { }

  addActor(name: string, gender: string, dob: string,bio: string ) {
    const actorData = {"name": name,
    "gender": gender,
    "dob": dob,
    "bio": bio
  };
    this.http
      .post<{ message: string; actor: Actor }>(
        "http://localhost:3000",
        actorData
      )
      .subscribe(responseData => {
        this.castSubject.next(name);
      });
  }

  updateActor(id: string, name: string, gender: string, dob: string, bio: string) {
    const actorData = {
    "name": name,
    "gender": gender,
    "dob": dob,
    "bio": bio
  };
    this.http
      .put("http://localhost:3000/edit/" + id, actorData)
      .subscribe(response => {
        this.router.navigate(["/"]);
      });
  }

  getActors() {
    this.http
      .get<{ message: string; actors: any;}>(
        "http://localhost:3000/actors"
      )
      .pipe(
        map(actorData => {
          return {
            actors: actorData.actors.map(actor => {
              this.castList.push(actor.name);
              return {
                name: actor.name,
                gender: actor.gender,
                id: actor._id,
                dob: actor.dob,
                bio: actor.bio
              };
            }),
          };
        })
      )
      .subscribe(transformedActorData => {
        this.actors = transformedActorData.actors;
        this.actorsUpdated.next({
          actors: [...this.actors]
        });
      });
  }
  getActorUpdateListener() {
    return this.actorsUpdated.asObservable();
  }

  getActor(id: string) {
    return this.http.get<{
      _id: string;
      name: string;
      gender: string;
      dob: string;
      bio: string;
    }>("http://localhost:3000/edit/" + id);
  }

  deleteActor(id: string){
    return this.http.delete("http://localhost:3000/edit/" + id);
  }

}
