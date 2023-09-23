import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AudioMediaPlayerRoutingModule } from './audio-media-player-routing.module';
import { SharedModule } from '../shared/shared.module';
import { AudioPlayerComponent } from './audio-player/audio-player.component';


@NgModule({
  declarations: [
    AudioPlayerComponent
  ],
  imports: [
    CommonModule,
    AudioMediaPlayerRoutingModule,
    SharedModule
  ]
})
export class AudioMediaPlayerModule { }
