import { GameService } from './../shared/game.service';
import { Component } from '@angular/core';

@Component({
  selector: 'enter-scores',
  templateUrl: './enterScores.component.html',
})
export class EnterScoresComponent{
  constructor(public gameService:GameService){
    if(!this.gameService.gameStarted()){
      this.gameService.addRound();
    }
  }
  
}
