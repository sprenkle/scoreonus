import {GameType} from '../models/game-type';
import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { GameRepoService } from '../services/game-repo.service';
import {Setting} from '../models/setting';

@Component({
  moduleId: module.id,
  selector: 'my-configuration',
  templateUrl: 'configuration.component.html'
})
export class ConfigurationComponent implements OnInit {
  currentGameType:GameType;
  settings: Setting[];

  constructor(
    private router: Router,
    private gameRepoService: GameRepoService) { }

  ngOnInit(): void {
    this.getCurrentGameType();
    this.getSettings();
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

  logConfiguration(): void {
    console.log(this.settings)
  }

  continue(): void {
    var config = {};
    for(var i = 0; i < this.settings.length; i++){
      var setting = this.settings[i];
      switch(setting.type){
        case 'boolean' :
          config[setting.name] = setting.value === 'true';
        break;
        case 'number' :
          config[setting.name] = Number(setting.value);
        default:
          config[setting.name] = setting.value;
        break;
      }
      for(var j=0; j < setting.children.length; j++){
        var child = setting.children[j];
        switch(child.type){
          case 'boolean' :
            config[setting.name + "-" + child.name] = child.value === 'true';
          break;
          case 'number' :
            config[setting.name + "-" + child.name] = Number(child.value);
          break;
          default:
            config[setting.name + "-" + child.name] = child.value;
          break;
        }
      }
    }
    console.log('-------------------ggggg-----------------');
    console.log(config);
  //  console.log(config.nil);
    this.gameRepoService.setConfiguration(config);
    this.router.navigate(['/choose-teams']);
  }
}
