import { Component, HostListener, OnInit, EventEmitter } from '@angular/core';
import { GameService } from 'src/app/game.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit {
  keyPress: string;
  cards: number[] = [
    3,
    6,
    12,
    24,
    48,
    96,
    192,
    384,
    768,
    1536,
    3072,
    6144,
    12288,
    24576,
    49152,
    98304,
  ];
  finalScore: number;

  constructor(private gameService: GameService) {}

  ngOnInit(): void {}

  @HostListener('window:keyup', ['$event'])
  handleKeyUp(event: KeyboardEvent) {
    if (
      event.key === 'ArrowLeft' ||
      event.key === 'ArrowRight' ||
      event.key === 'ArrowUp' ||
      event.key === 'ArrowDown'
    ) {
      this.keyPress = event.key; //not needed just push to dom
      this.gameService.setKey(event.key);
      this.turn();
      this.gameOver();
    }
  }

  newGame() {
    // this.cards = Array(16).fill(null);
    this.cards = [0, 1, 2, 3, 4, 5, null, 7, 8, 9, 10, 11, 12, 13, 14, 15];
  }

  turn() {
    // keypress
    // move numbers in array
    // switch statement
    // up = all index except 0-3 has to -4
    // down = all index except 12-15 has to +4
    // left = all index except 0,4,8,12 has to -1
    // right = all index except 3,7,11,15 has to +1
    this.merge();
  }

  merge() {
    // if same number or 1, 2 add
  }

  gameOver() {
    // no possible moves
  }
}
