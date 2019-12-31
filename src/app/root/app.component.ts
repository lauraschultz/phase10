import { GameService } from './../shared/game.service';
import { Component, OnInit } from '@angular/core';
import {FormGroup, FormArray, FormBuilder, FormControl} from '@angular/forms';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  title = 'phase10';

  constructor(private gameService: GameService){}
}