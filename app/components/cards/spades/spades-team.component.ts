import {GameType} from '../../../models/game-type';
import { Component, OnInit, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { GameRepoService } from '../../../services/game-repo.service';
import {Setting} from '../../../models/setting';
import {PlayerHolder} from '../../../models/player-holder';
import {Cell} from '../../../models/cell';
import {SpadesInputComponent} from './spades-input.component';
import {SpadesLogic} from './spades-team.logic';

@Component({
  moduleId: module.id,
  selector: 'my-spades-team.component.ts',
  templateUrl: 'spades-team.component.html',
  styleUrls: ['spades-team.component.css'],
  //  directives: [SpadesInputComponent]  // Note ErrorMessage is a directive
})
export class SpadesTeamComponent implements OnInit {
  currentGameType: GameType;
  players: PlayerHolder[];
  teams: string[];
  cells: Cell[][];
  selectedCol: number;
  selectedRow: number;
  spadesLogic: SpadesLogic;
  score: Cell[];
  @ViewChild(SpadesInputComponent) inputDialog: SpadesInputComponent;  // ErrorMessage is a ViewChild

  constructor(
    private router: Router,
    private gameRepoService: GameRepoService) {
  }


  ngOnInit(): void {
    this.getPlayers();
    this.getTeams();
    console.log("teams " + this.teams);
    this.getCurrentGameType();
    this.getSettings();

    this.score = [];
    this.score[0] = new Cell();
    this.score[1] = new Cell();
    this.score[0].value = 0;
    this.score[1].value = 0;
  }

  getCurrentGameType(): void {
    this.currentGameType = this.gameRepoService.getCurrentGameType();
    console.log("getting Current game Type");
    console.log(this.currentGameType);
  }

  getSettings(): void {
    this.spadesLogic = new SpadesLogic(this.gameRepoService.getConfiguration());
    this.cells = [];
    this.cells[0] = this.spadesLogic.getNewRow();
  }

  getPlayers(): void {
    this.players = this.gameRepoService.getPlayers();
  }

  getTeams(): void {
    this.teams = this.gameRepoService.getTeams();
  }

  selected(row: number, col: number) {
    if (!this.cells[row][col].editable) return;
    if (!this.spadesLogic.isCellEditable(this.cells, row, col)) return;

    this.selectedRow = row;
    this.selectedCol = col;
    this.inputDialog.showDialog();
  }

  haveInput(value: string) {
    this.cells[this.selectedRow][this.selectedCol].value = value;
    this.cells[this.selectedRow][this.selectedCol].status = "";
    this.spadesLogic.update(this.cells, this.score);
  }
}
