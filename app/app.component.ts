import { Component } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'my-app',
    template: `
    <a routerLink="/choose-game" routerLinkActive="active">Home<span class="glyphicon glyphicon-home"></span></a>
    <router-outlet></router-outlet>
  `,
})
export class AppComponent { }
