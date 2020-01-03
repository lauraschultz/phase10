import { GameService } from './../shared/game.service';
import { Component, OnInit } from '@angular/core';
import { faPencilAlt, faUsers, faMedal } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  title = 'phase10';

  faPencilAlt = faPencilAlt;
  faUsers = faUsers;
  faMedal = faMedal;

  constructor(private gameService: GameService){}
}