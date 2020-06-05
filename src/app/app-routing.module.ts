import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EnterPlayersComponent } from './enterPlayers/enterPlayers.component';
import { EnterScoresComponent } from './enterScores/enterScores.component';
import { ViewTotalsComponent } from './viewTotals/viewTotals.component';


const routes: Routes = [
  { path: 'editPlayers', component: EnterPlayersComponent },
  { path: 'score', component: EnterScoresComponent },
  { path: 'viewTotals', component: ViewTotalsComponent },
  { path: '', redirectTo: 'editPlayers', pathMatch:'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
