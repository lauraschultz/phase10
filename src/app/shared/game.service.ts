import {
  FormArray,
  FormControl,
  FormBuilder,
  AbstractControl,
  FormGroup,
  Validators,
  RequiredValidator,
} from "@angular/forms";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class GameService {
  game: FormGroup;
  twoPlayersError = false;

  constructor(private formBuilder: FormBuilder) {
    console.log(`game service constructor`);
    this.initializeGame();
  }

  initializeGame() {
    const lS = localStorage.getItem("gameValue");
    console.log(`localStorage: ${lS}`);
    if (lS) {
      const game = JSON.parse(lS);
      this.game = this.formBuilder.group({
        players: this.formBuilder.array(game.players),
        rounds: this.formBuilder.array([]),
      });
      game.rounds.forEach((round) => this.addRound(round));
    } else {
      this.reset();
    }
  }

  reset() {
    localStorage.removeItem("gameValue");
    this.game = this.formBuilder.group({
      players: this.formBuilder.array([]),
      rounds: this.formBuilder.array([]),
    });
    this.addPlayer();
    this.addPlayer();
    this.game.valueChanges.subscribe((val) => {
      console.log("value change");
      localStorage.setItem("gameValue", JSON.stringify(val));
    });
  }

  get players() {
    return this.game.get("players") as FormArray;
  }

  get rounds() {
    return this.game.get("rounds") as FormArray;
  }

  addRound(data?: { phase: boolean; points: number }[]) {
    let ar = this.formBuilder.array([]);
    (data || new Array(this.players.length).fill(null)).forEach((val) => {
      ar.push(this.createRound(val));
    });
    this.rounds.push(ar);
    // let ar = this.formBuilder.array([]);
    // for (let i = 0; i < this.players.length; i++) {
    //   ar.push(this.createRound(data[i]));
    // }
    // this.rounds.push(ar);
  }

  calculateTotalPoints(): Array<number> {
    let totals = new Array<number>(this.players.length).fill(0);
    this.rounds.controls.forEach((rd) => {
      (<FormArray>rd).controls.forEach((p, index) => {
        totals[index] += p.get("points").value;
      });
    });
    return totals;
  }

  calculatePhase(round: number): Array<number> {
    // return array with the number of highest phase achieved
    // for each player as of the round indicated
    let totals = new Array<number>(this.players.length).fill(1);
    // each round:
    for (let i = 0; i < round; i++) {
      // each player:
      (<FormArray>this.rounds.controls[i]).controls.forEach((p, index) => {
        totals[index] += p.get("phase").value ? 1 : 0;
      });
    }
    return totals;
  }

  createRound(data?: { phase: boolean; points: number }): FormGroup {
    return this.formBuilder.group({
      phase: new FormControl(data?.phase || false),
      points: new FormControl(data?.points || "", Validators.required),
    });
  }

  handleAddPlayerBtn() {
    if (this.gameStarted()) {
      // TODO: modal message
    }
    this.addPlayer();
  }

  handleRemovePlayerBtn(i: number) {
    if (this.gameStarted()) {
      // TODO: modal message
      this.rounds.controls.forEach((ar) => {
        (<FormArray>ar).removeAt(i);
      });
    }
    this.removePlayer(i);
  }

  addPlayer() {
    this.players.push(this.formBuilder.control("", Validators.required));
    this.twoPlayersError = false;
  }

  removePlayer(i: number) {
    if (this.players.length > 2) {
      this.players.removeAt(i);
    } else {
      this.twoPlayersError = true;
    }
  }

  handlePhaseClick(round: number, player: number) {
    let control = (<FormGroup>(
      (<FormArray>this.rounds.controls[round]).controls[player]
    )).controls.phase;
    control.setValue(!control.value);
  }

  getPhaseValue(round: number, player: number) {
    return (<FormArray>this.rounds.controls[round]).controls[player].value
      .phase;
  }

  convertToNumeral(n: number): string {
    const dict = {
      1: "I",
      2: "II",
      3: "III",
      4: "IV",
      5: "V",
      6: "VI",
      7: "VII",
      8: "VIII",
      9: "IX",
      10: "X",
    };
    return dict[n];
  }

  gameStarted(): boolean {
    return this.rounds.length > 0;
  }
}
