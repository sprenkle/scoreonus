import {GameType} from '../models/game-type';
import {GAMETYPES} from '../mock-game-type'
import { Injectable } from '@angular/core';
import { DataService } from '../services/data.service';
import { Observable } from 'rxjs/Observable';
import {Setting} from '../models/setting';
import {PlayerHolder} from '../models/player-holder'
import {Cell} from '../models/cell'

@Injectable()
export class GameRepoService {
  currentGameType: GameType;
  currentSettings: Setting[];
  players: PlayerHolder[];
  teams: string[];
  cells: Cell[][];
  configuration: Object;

  constructor(private _dataService: DataService) { }

  getConfiguration(){
    return this.configuration;
  }

  setConfiguration(configuration:Object){
    console.log(configuration['nil']);
    this.configuration = configuration;
  }

  getGameTypes(): Observable<GameType[]> {
    return this._dataService.GetAllGameTypes();
  }

  setCurrentGameType(gameType: GameType) {
    this.currentGameType = gameType;
  }

  getCurrentGameType() {
    return this.currentGameType;
  }

  getDefualtSettings(): Observable<Setting[]> {
    return this._dataService.GetSettings('4');
  }

  setPlayers(playerHolders: PlayerHolder[]) {
    this.players = playerHolders;
  }

  getPlayers(): PlayerHolder[] {
    return this.players;
  }

  setTeams(teams: string[]) {
    this.teams = teams;
  }

  getTeams(): string[] {
    return this.teams;
  }

  getCells(): Cell[][] {
    this.cells = [];

    for (var i: number = 0; i < 1; i++) {
      this.cells[i] = [];
      for (var j: number = 0; j < 10; j++) {
        this.cells[i][j] = new Cell();
        //this.cells[i][j].value = "0";
      }
    }
    return this.cells;
  }
  // getHero(id: number): Promise<Hero> {
  //   return this.getHeroes()
  //              .then(heroes => heroes.find(hero => hero.id === id));
  // }
}
