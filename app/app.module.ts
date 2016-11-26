import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent }  from './app.component';
import { ChooseGameComponent }     from './components/choose-game.component';
import { ConfigurationComponent }     from './components/configuration.component';
import { SettingComponent } from './components/setting.component';
import { ChooseTeamsComponent } from './components/choose-teams.component';
import { SetupPlayerComponent } from './components/setup-player.component';
import { GridLayoutComponent } from './components/grid-layout.component';
import { SpadesTeamComponent } from './components/cards/spades/spades-team.component';
import { SpadesInputComponent } from './components/cards/spades/spades-input.component';
import { GameRepoService }     from './services/game-repo.service';
import { DataService }     from './services/data.service';
import { AppRoutingModule }     from './app-routing.module';
import { HttpModule, JsonpModule } from '@angular/http';
import { Configuration } from './app.constants';
import { FormsModule }   from '@angular/forms';

@NgModule({
  imports: [BrowserModule, AppRoutingModule, HttpModule, JsonpModule,FormsModule],
  declarations: [AppComponent,
    ChooseGameComponent,
    ChooseTeamsComponent,
    ConfigurationComponent,
    SettingComponent,
    SetupPlayerComponent,
    GridLayoutComponent,
    SpadesTeamComponent,
    SpadesInputComponent
  ],
  providers: [GameRepoService,DataService,Configuration],
  bootstrap: [AppComponent]
})
export class AppModule { }
