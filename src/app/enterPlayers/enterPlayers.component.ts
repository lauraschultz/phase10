import { FormArray } from "@angular/forms";
import { GameService } from "./../shared/game.service";
import { Component, Input } from "@angular/core";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  template: `
    <ngbd-modal-content title="Do you want to remove {{ playerName }}?">
      <p>
        The game has already started. Are you sure you want to remove
        {{ playerName }} from the game?
      </p>
      <button
        type="button"
        class="btn btn-outline-dark"
        (click)="activeModal.close()"
      >
        Cancel
      </button>
      <button
        type="button"
        class="btn btn-danger float-right"
        (click)="remove()"
      >
        Remove player
      </button>
    </ngbd-modal-content>
  `,
})
export class RemovePlayerModal {
  @Input() playerName: string;
  @Input() playerNumber: number;

  constructor(
    public activeModal: NgbActiveModal,
    public gameService: GameService
  ) {}

  remove() {
    this.gameService.removePlayer(this.playerNumber);
    this.activeModal.close();
  }
}

@Component({
  selector: "enter-players",
  templateUrl: "./enterPlayers.component.html",
})
export class EnterPlayersComponent {
  constructor(
    public gameService: GameService,
    private modalService: NgbModal
  ) {}

  removePlayer(i: number) {
    if (this.gameService.gameStarted()) {
      const modalRef = this.modalService.open(RemovePlayerModal);
      modalRef.componentInstance.playerName = this.gameService.players.controls[
        i
      ].value;
      modalRef.componentInstance.playerNumber = i;
    } else {
      this.gameService.removePlayer(i);
    }
  }
}
