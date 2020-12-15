import { GameService } from "./../shared/game.service";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  template: `
    <ngbd-modal-content title="Confirm game reset">
      <p>This cannot be undone.</p>
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
        (click)="reset()"
      >
        Reset game
      </button>
    </ngbd-modal-content>
  `,
})
export class GameResetModal {
  constructor(
    public activeModal: NgbActiveModal,
    public gameService: GameService,
    private router: Router
  ) {}

  reset() {
    this.gameService.reset();
    this.activeModal.close();
    this.router.navigate(["editPlayers"]);
  }
}

@Component({
  selector: "enter-scores",
  templateUrl: "./enterScores.component.html",
})
export class EnterScoresComponent implements OnInit {
  constructor(
    public gameService: GameService,
    private router: Router,
    private modalService: NgbModal
  ) {
    if (!this.gameService.gameStarted()) {
      this.gameService.addRound();
    }
  }

  handleReset() {
    console.log("handle reset.");
    // this.modalVisible = true;
    this.open();
    // this.gameService.reset();
    // this.router.navigate(['editPlayers'])
  }

  ngOnInit(): void {
    if (!this.gameService.players.valid) {
      this.router.navigate(["editPlayers"]);
    }
  }

  open() {
    this.modalService.open(GameResetModal);
  }
}
