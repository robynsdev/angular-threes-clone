import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit {
  keyPress: any;
  cards: number[] = [3, 6, 12];
  finalScore: number;

  @HostListener('window:keyup', ['$event'])
  handleKeyUp(event: any) {
    if (
      event.key === 'ArrowLeft' ||
      event.key === 'ArrowRight' ||
      event.key === 'ArrowUp' ||
      event.key === 'ArrowDown'
    ) {
      this.keyPress = event.key;
    }
  }
  newGame() {
    this.cards = Array(16).fill(null);
  }

  constructor() {}

  ngOnInit(): void {}
}
