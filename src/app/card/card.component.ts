import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { GameService } from 'src/app/game.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  @Input() value: number;
  keyPress: string;
  private getKey: Subscription;

  constructor(private gameService: GameService) {}

  ngOnInit(): void {
    this.getKey = this.gameService.getKey().subscribe((key) => {
      this.keyPress = key;
    });
  }

  ngOnDestroy() {
    this.getKey.unsubscribe();
  }
}
