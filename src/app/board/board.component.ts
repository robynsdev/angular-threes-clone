import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit {
  keyPress: string;
  randomCard: number[];

  // lose condition
  moved: boolean = false;
  boardEdge: number[] = [0, 1, 2, 3, 4, 7, 8, 11, 12, 13, 14, 15];
  score: number;

  // board setup
  boardSide: any = {
    up: [0, 1, 2, 3],
    down: [12, 13, 14, 15],
    left: [0, 4, 8, 12],
    right: [3, 7, 11, 15],
  };
  gameCards: number[] = [
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
  cards: number[] = this.gameCards;

  constructor() {}

  ngOnInit(): void {}

  @HostListener('window:keyup', ['$event'])
  handleKeyUp(event: KeyboardEvent) {
    if (
      event.key === 'ArrowUp' ||
      event.key === 'ArrowDown' ||
      event.key === 'ArrowLeft' ||
      event.key === 'ArrowRight'
    ) {
      this.turn(event.key);
      this.isGameOver();
    }
  }

  newGame() {
    // this.cards = Array(16).fill(null);
    // this.cards = [20, 0, 2, 3, 4, 5, 0, 7, 8, 9, 0, 11, 12, 13, 0, 15];
    this.cards = [1, 2, 2, 12, 24, 0, 0, 0, 6, 0, 0, 0, 0, 1, 0, 2];
  }

  turn(keyPress: string) {
    // up = all index except 0-3 has to -4
    // down = all index except 12-15 has to +4
    // left = all index except 0,4,8,12 has to -1
    // right = all index except 3,7,11,15 has to +1
    switch (keyPress) {
      case 'ArrowUp':
        this.boardcalc(this.boardSide.up, 4);
        this.addRandomCard(this.boardSide.down);
        break;

      case 'ArrowDown':
        this.boardcalc(this.boardSide.down, -4);
        this.addRandomCard(this.boardSide.up);
        break;

      case 'ArrowLeft':
        this.boardcalc(this.boardSide.left, 1);
        this.addRandomCard(this.boardSide.right);
        break;

      case 'ArrowRight':
        this.boardcalc(this.boardSide.right, -1);
        this.addRandomCard(this.boardSide.left);
        break;

      default:
        break;
    }
  }

  boardcalc(boardSide: number[], direction: number) {
    let rowMoved: boolean = false;
    // iterate through first 3 cards of each row
    // if can merge, merge
    // merge == 1. same card greater than 2, 2. null origin, 3. if add to 3
    // if rowMoved is true, move rest of row, break

    for (let i of boardSide) {
      for (let j = 0; j < 3; j++) {
        let index = i + direction * j;
        if (rowMoved === false) {
          if (
            (this.cards[index] === this.cards[index + direction] &&
              this.cards[index] > 2) ||
            this.cards[index] === 0 ||
            this.cards[index] + this.cards[index + direction] === 3
          ) {
            this.cards[index] += this.cards[index + direction];
            rowMoved = true;
            this.moved = true;
          }
        } else if (rowMoved === true) {
          this.cards[index] = this.cards[index + direction];
        }
      }
      if (rowMoved === true) {
        this.cards[i + direction * 3] = 0;
      }
      rowMoved = false;
    }
  }

  createRandomCard() {}

  addRandomCard(edge: number[]) {
    let zeroEdge: number[] = [];
    for (let x of edge) {
      if (this.cards[x] === 0) {
        zeroEdge.push(x);
      }
    }
    let fillidx: number = zeroEdge[Math.floor(Math.random() * zeroEdge.length)];

    this.cards[fillidx] = 3;
  }

  // game over when no possible moves = no merge and no null cards
  isGameOver() {
    let noNull: number = 0;
    for (let x of this.boardEdge) {
      if (this.cards[x] !== 0) {
        noNull++;
      }
    }
    if (this.moved === false || noNull === 0) {
      this.score = this.cards.reduce((total, amt) => total + amt);
    }
    this.moved = false;
  }
}
