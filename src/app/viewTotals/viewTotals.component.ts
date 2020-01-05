import { FormGroup, FormControl } from '@angular/forms';
import { GameService } from './../shared/game.service';
import { Component } from '@angular/core';

@Component({
  selector: 'view-totals',
  templateUrl: './viewTotals.component.html',
})
export class ViewTotalsComponent{
  data = [];
  sortedData;

  view=0;

  setView(v:number){
    this.view = v;
    console.log('view is', this.view);
  }

  constructor(public gameService: GameService){
    let scoreArray = this.gameService.calculateTotalPoints();
    let phaseArray = this.gameService.calculatePhase(this.gameService.rounds.length);
    this.gameService.players.controls.forEach((pl, index) => {
      this.data.push({
        'player': pl.value,
        'score': scoreArray[index],
        'phase': phaseArray[index]-1
      })
    });
    console.log('data is', this.data);

    this.sortedData = this.data.concat().sort(function(a, b){
      if(a['phase'] == b['phase']){
        return a['score'] - b['score'];
      }
      return b['phase']-a['phase'];
    });

    console.log('sorteddata is', this.sortedData);
    
  }
}
