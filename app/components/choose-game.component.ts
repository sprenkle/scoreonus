import {GameType} from '../models/game-type';
import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { GameRepoService } from '../services/game-repo.service';

@Component({
  moduleId: module.id,
  selector: 'my-choose-game',
  templateUrl: 'choose-game.component.html'
})
export class ChooseGameComponent implements OnInit {

  gameTypes: GameType[];

  constructor(
    private router: Router,
    private gameRepoService: GameRepoService) { }

  getGameTypes(): void {
    this.gameRepoService.getGameTypes().subscribe((data: GameType[]) => this.gameTypes = data,
      error => console.log(error),
      () => console.log('Get all Items complete'));
  }

  ngOnInit(): void {
    this.getGameTypes();
  }

  gotoConfiguration(gameType:GameType) {
    this.gameRepoService.setCurrentGameType(gameType);
    this.router.navigate(['/configuration']);
  }
}
