import { GameService } from './../shared/game.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'enter-scores',
  templateUrl: './enterScores.component.html',
})
export class EnterScoresComponent implements OnInit {
  constructor(public gameService:GameService, private router: Router, private route: ActivatedRoute){
    if(!this.gameService.gameStarted()){
      this.gameService.addRound();
    }
  }

  ngOnInit(): void {
    if(!this.gameService.players.valid){
      this.router.navigate(['editPlayers']);
    }
  }
  
}
