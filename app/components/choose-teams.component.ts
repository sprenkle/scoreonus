import { Component, OnInit, Input} from '@angular/core';
import { Router } from '@angular/router';
import { GameRepoService }     from '../services/game-repo.service';
import { PlayerHolder }     from '../models/player-holder';
import {GameType} from '../models/game-type';

@Component({
  moduleId: module.id,
  selector: 'my-choose-teams',
  templateUrl: 'choose-teams.component.html'
})
export class ChooseTeamsComponent implements OnInit {
  configuration: null;
  currentGameType:GameType;
  @Input()
  players: PlayerHolder[];
  teams: string[];

  constructor(
    private router: Router,
    private gameRepoService: GameRepoService) { }

  ngOnInit(): void {
    this.currentGameType = this.gameRepoService.getCurrentGameType();
    this.configuration = JSON.parse(this.currentGameType.configuration);
    this.players = [];
    this.players.push(new PlayerHolder());
    this.players.push(new PlayerHolder());
    this.players.push(new PlayerHolder());
    this.players.push(new PlayerHolder());
    this.players[0].name = 'Player 1';
    this.players[1].name = 'Player 2';
    this.players[2].name = 'Player 3';
    this.players[3].name = 'Player 4';
    this.players[0].team = 'Us';
    this.players[1].team = 'Them';
    this.players[2].team = 'Us';
    this.players[3].team = 'Them';
    this.teams = [];
    this.teams.push('Us');
    this.teams.push('Them')
  }

  gotoLayout(){
    this.gameRepoService.setPlayers(this.players);
    console.log('--------- Players ----------------');
    console.log(this.players);
    this.gameRepoService.setTeams(this.teams);
    this.router.navigate(['/' + this.currentGameType.layout]);
  }
}
