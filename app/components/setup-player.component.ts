import { Component, Input} from '@angular/core';
import {PlayerHolder} from '../models/player-holder';

@Component({
  moduleId: module.id,
  selector: 'my-setup-player',
  templateUrl: 'setup-player.component.html',
  styleUrls: ['setup-player.component.css']
})
export class SetupPlayerComponent {
  @Input()
  player:string;
  @Input()
  team:string
}
