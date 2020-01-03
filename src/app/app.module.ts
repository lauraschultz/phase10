import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ViewTotalsComponent } from './viewTotals/viewTotals.component';
import { EnterScoresComponent } from './enterScores/enterScores.component';
import { EnterPlayersComponent } from './enterPlayers/enterPlayers.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './root/app.component';

@NgModule({
  declarations: [
    AppComponent,
    EnterPlayersComponent,
    EnterScoresComponent,
    ViewTotalsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FontAwesomeModule
  ],
  providers: [FormBuilder],
  bootstrap: [AppComponent]
})
export class AppModule { }
