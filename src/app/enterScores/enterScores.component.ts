import { GameService } from './../shared/game.service';
import { Component } from '@angular/core';

@Component({
  selector: 'enter-scores',
  templateUrl: './enterScores.component.html',
})
export class EnterScoresComponent{
  constructor(private gameService:GameService){
    console.log(this.gameService.players.length);
    if(!this.gameService.gameStarted()){
      this.gameService.addRound();
    }
  }
  
}
