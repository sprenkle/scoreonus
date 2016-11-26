import { Component, Input} from '@angular/core';
import {Setting} from '../models/setting';

@Component({
  moduleId: module.id,
  selector: 'my-setting',
  templateUrl: 'setting.component.html',
  styleUrls: ['setting.component.css']
})
export class SettingComponent {
  @Input()
  setting:Setting;
}
