import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ConfigurationComponent} from './components/configuration.component';
import { ChooseGameComponent }   from './components/choose-game.component';
import { ChooseTeamsComponent }   from './components/choose-teams.component';
import { GridLayoutComponent }   from './components/grid-layout.component';
import { SpadesTeamComponent } from './components/cards/spades/spades-team.component';

const routes: Routes = [
  { path: '', redirectTo: '/choose-game', pathMatch: 'full' },
  { path: 'choose-game',  component: ChooseGameComponent },
  { path: 'configuration',  component: ConfigurationComponent },
  { path: 'choose-teams',  component: ChooseTeamsComponent },
  { path: 'grid-layout',  component: GridLayoutComponent },
  { path: 'spades-team',  component: SpadesTeamComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
