import { Component, OnInit, OnDestroy } from '@angular/core';
import { Actor } from '../actor.model';
import { Subscription } from 'rxjs';
import { ActorService } from '../actor.service';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-actors-data',
  templateUrl: './actors-data.component.html',
  styleUrls: ['./actors-data.component.css']
})
export class ActorsDataComponent implements OnInit,OnDestroy {

  actor: Actor[] = [];
  actorSub: Subscription;
  constructor(private actorService: ActorService, public route: ActivatedRoute) { }

  ngOnInit() {
    this.actorService.getActors();
    this.actorSub = this.actorService
      .getActorUpdateListener().subscribe((actorsData: { actors: Actor[] }) =>{
        this.actor = actorsData.actors;
        console.log(actorsData.actors);
      });
  }

  onDelete(actorId: string){
    this.actorService.deleteActor(actorId).subscribe(() => {
      this.actorService.getActors();
    });
  }

  ngOnDestroy(){
    this.actorSub.unsubscribe();
  }

}
