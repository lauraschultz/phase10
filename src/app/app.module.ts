import { FormBuilder, ReactiveFormsModule } from "@angular/forms";
import { ViewTotalsComponent } from "./viewTotals/viewTotals.component";
import {
  EnterScoresComponent,
  GameResetModal,
} from "./enterScores/enterScores.component";
import {
  EnterPlayersComponent,
  RemovePlayerModal,
} from "./enterPlayers/enterPlayers.component";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./root/app.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { NgbdModalContent } from "./shared/modal/modal.component";
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    EnterPlayersComponent,
    EnterScoresComponent,
    ViewTotalsComponent,
    NgbdModalContent,
    GameResetModal,
    RemovePlayerModal,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    NgbModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
  ],
  providers: [FormBuilder],
  bootstrap: [AppComponent],
})
export class AppModule {}
