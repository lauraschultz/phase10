import { FormGroup, FormControl } from '@angular/forms';
import { GameService } from './../shared/game.service';
import { Component } from '@angular/core';
import {  faMedal, faCircle } from '@fortawesome/free-solid-svg-icons';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'view-totals',
  templateUrl: './viewTotals.component.html',
})
export class ViewTotalsComponent{
  data = [];
  sortedData;

  view=0;

  faMedal = faMedal;
  faCircle = faCircle;

  setView(v:number){
    this.view = v;
  }

  getMedalRibbonColor(i:number): string {
    if (i>2){
      return 'white'
    }
    return 'var(--secondary)'
  }

  getMedalColor(i:number): string{
    if(i>2) {
      return 'white'
    } else if (i==2){
      return '#cd7f32'
    } else if (i==1){
      return '#c0c0c0'
    } 
    return '#ffd700'
  }

  getTextColor(i:number):string {
    if(i>2){
      return 'black'
    }
    return 'white'
 }

  constructor(public gameService: GameService, private router: Router, private route: ActivatedRoute){
    let scoreArray = this.gameService.calculateTotalPoints();
    let phaseArray = this.gameService.calculatePhase(this.gameService.rounds.length);
    this.gameService.players.controls.forEach((pl, index) => {
      this.data.push({
        'player': pl.value,
        'score': scoreArray[index],
        'phase': phaseArray[index]-1
      })
    });

    this.sortedData = this.data.concat().sort(function(a, b){
      if(a['phase'] == b['phase']){
        return a['score'] - b['score'];
      }
      return b['phase']-a['phase'];
    });
    
  }

  ngOnInit(): void {
    if(!this.gameService.players.valid){
      this.router.navigate(['editPlayers']);
    }
  }
}
