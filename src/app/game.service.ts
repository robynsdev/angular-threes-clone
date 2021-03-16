import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class GameService {
  messageEmitter = new BehaviorSubject<string>('');

  setKey(message: string) {
    this.messageEmitter.next(message);
  }

  getKey(): Observable<string> {
    return this.messageEmitter.asObservable();
  }
}
