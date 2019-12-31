import { FormArray } from '@angular/forms';
import { GameService } from './../shared/game.service';
import { Component } from '@angular/core';

@Component({
  selector: 'enter-players',
  templateUrl: './enterPlayers.component.html',
})
export class EnterPlayersComponent{
  constructor(private gameService: GameService){
    console.log('game:',this.gameService.game)
  }
}
