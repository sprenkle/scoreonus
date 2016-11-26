import {GameType} from '../models/game-type';
import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { GameRepoService } from '../services/game-repo.service';
import {Setting} from '../models/setting';
import {PlayerHolder} from '../models/player-holder';

@Component({
  moduleId: module.id,
  selector: 'my-grid-layout.component.ts',
  templateUrl: 'grid-layout.component.html',
  styleUrls: ['grid-layout.component.css']
})
export class GridLayoutComponent implements OnInit {
  currentGameType:GameType;
  settings: Setting[];
  players: PlayerHolder[];
  teams: string[];

  constructor(
    private router: Router,
    private gameRepoService: GameRepoService) { }

  ngOnInit(): void {
    this.getCurrentGameType();
    this.getSettings();
    this.getPlayers();
    this.getTeams();
  }

  getCurrentGameType(): void {
      this.currentGameType = this.gameRepoService.getCurrentGameType();
      console.log("getting Current game Type");
      console.log(this.currentGameType);
  }

  getSettings(): void {
    this.gameRepoService.getDefualtSettings().subscribe((data:Setting[]) => this.settings = data,
      error => console.log(error),
      () => console.log(this.settings));
  }

  getPlayers(): void {
    this.players = this.gameRepoService.getPlayers();
  }

  getTeams(): void {
    this.teams = this.gameRepoService.getTeams();
  }


}
