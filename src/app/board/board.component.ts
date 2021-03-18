import { Component, HostListener, OnInit } from '@angular/core';
import { GameService } from 'src/app/game.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit {
  keyPress: string;
  boardside: any = {
    up: [0, 1, 2, 3],
    down: [12, 13, 14, 15],
    left: [0, 4, 8, 12],
    right: [3, 7, 11, 15],
  };
  // up: number[] = [0, 1, 2, 3];
  // down: number[] = [12, 13, 14, 15];
  // left: number[] = [0, 4, 8, 12];
  // right: number[] = [3, 7, 11, 15];

  moved: boolean = false; //condition for gameover. true whenever card combined or position overwritten.
  finalScore: number; // sum of cards on board
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
  changedCards: number[];

  constructor(private gameService: GameService) {}

  ngOnInit(): void {}

  @HostListener('window:keyup', ['$event'])
  handleKeyUp(event: KeyboardEvent) {
    if (
      event.key === 'ArrowUp' ||
      event.key === 'ArrowDown' ||
      event.key === 'ArrowLeft' ||
      event.key === 'ArrowRight'
    ) {
      // this.keyPress = event.key; //not needed just push to dom
      // this.gameService.setKey(event.key);
      this.turn(event.key);
      this.isGameOver();
    }
  }

  newGame() {
    // this.cards = Array(16).fill(null);
    this.cards = [20, null, 2, 3, 4, 5, null, 7, 8, 9, 10, 11, 12, 13, 14, 15];
    this.changedCards = Array(16).fill(0);
  }

  turn(keyPress: string) {
    switch (keyPress) {
      case 'ArrowUp':
        for (let i = 0; i < this.cards.length; i++) {
          // when cards equal
          if (this.cards[i] === this.cards[i + 4] && i < 12) {
            this.cards[i] += this.cards[i + 4];
            this.changedCards[i + 4] = 1;
            // when space is null
          } else if (this.cards[i] === null && i < 12) {
            this.cards[i] = this.cards[i + 4];
            this.changedCards[i + 4] = 1;
            // when end row has been moved
          } else if (this.changedCards[i] === 1) {
            this.cards[i] = null;
          }
        }
        this.changedCards = Array(16).fill(0);
        console.log(this.cards);
        console.log(this.changedCards);
        break;
      case 'ArrowDown':
        break;
      case 'ArrowLeft':
        break;
      case 'ArrowRight':
        break;
      default:
    }
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
    // if no merge && cards no null gameOver()
  }

  isGameOver() {
    // no possible moves = no merge and no null cards
  }
}
