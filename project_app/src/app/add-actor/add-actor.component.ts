import { Component, OnInit } from '@angular/core';
import { Actor } from '../actor.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActorService } from '../actor.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { MatDialog, MatRadioButton } from '@angular/material';

@Component({
  selector: 'app-add-actor',
  templateUrl: './add-actor.component.html',
  styleUrls: ['./add-actor.component.css']
})
export class AddActorComponent implements OnInit {

  ActorState = "Add Actor";
  actor: Actor;
  form: FormGroup;
  private mode = "create";
  public gender: string;
  private dob: string;
  private actorId : string;
  genderArray = ["Male", "Female", "Others"];
  constructor(private actorService: ActorService, private route: ActivatedRoute, private dialog: MatDialog) { }


  dobChangeHandler(event: any){
    const date = new Date(event.target.value);
    const formattedDate = date.toLocaleDateString('en-GB', {
      day: 'numeric', month: 'short', year: 'numeric'
    }).replace(/ /g, '-');
    this.dob = formattedDate;
  }

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(1)]
      }),
      gender: new FormControl(null, {validators: [Validators.required]}),
      dob: new FormControl(null, {validators: [Validators.required] }),
      bio: new FormControl(null, {validators: [Validators.required, Validators.minLength(5)]})
    })
    this.route.paramMap.subscribe((paramMap: ParamMap) =>{
      if(paramMap.has("id")){
        this.mode = "edit";
        this.ActorState = "Edit Actor";
        this.actorId = paramMap.get("id");
        this.actorService.getActor(this.actorId).subscribe(actorData =>{
          this.actor = {
            id: actorData._id,
            name: actorData.name,
            gender: actorData.gender,
            dob: this.dateReverse(actorData.dob),
            bio: actorData.bio
          };
          console.log(this.dateReverse(actorData.dob));
          this.form.setValue({
            name: this.actor.name,
            gender: this.actor.gender,
            dob: this.actor.dob,
            bio: this.actor.bio
          });
        });
      }else{
        this.mode = "create";
        this.actorId = null;
      }
    });
  }

  dateReverse(date: string){
  var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return ([year, month, day].join('-')).toString();
  }

  onSaveActor(){
    if (this.form.invalid) {
      return;
    }
    if (this.mode === "create") {
      console.log(this.form.value.name +  this.gender +  this.dob + this.form.value.bio);
      this.actorService.addActor(
        this.form.value.name,
        this.gender,
        this.dob,
        this.form.value.bio
      );
    } else {
      this.actorService.updateActor(
        this.actorId,
        this.form.value.name,
        this.gender,
        this.dob,
        this.form.value.bio
      );
    }
    this.form.reset();
    this.dialog.closeAll();
  }

}
