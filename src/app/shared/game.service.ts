import { FormArray, FormControl, FormBuilder, AbstractControl, FormGroup } from '@angular/forms';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GameService {
    game:FormGroup;
    twoPlayersError=false;
    appView;

  constructor(private formBuilder: FormBuilder) {
      this.reset();
  }

  reset(){
      this.game = this.formBuilder.group({
        players: this.formBuilder.array([]),
        rounds: this.formBuilder.array([])
      })
      
      this.addPlayer();
      this.addPlayer();

      this.addRound();

      this.appView = 0;
  }

    get players() {
      return this.game.get('players') as FormArray;
  }

  get rounds(){
    return this.game.get('rounds') as FormArray;
  }

  addRound(){
      let ar = this.formBuilder.array([]);
      for(let i=0; i<this.players.length; i++){
        ar.push(this.createRound());
      }
      this.rounds.push(ar);
  }

  createRound(): FormGroup{
      return this.formBuilder.group({
            phase: new FormControl(false),
            points: new FormControl()
        });
  }

addPlayer(){
        this.players.push(this.formBuilder.control(''))
      }

  removePlayer(i:number){
      if(this.players.length > 2){
        this.players.removeAt(i);
      } else {
        this.twoPlayersError = true;
      }
      
  }




}