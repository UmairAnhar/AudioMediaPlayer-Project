import { Component, inject } from '@angular/core';

import * as moment from 'moment';
import { MusicModel } from '../models/music.model';
import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AudioService } from '../services/audio.service';

@Component({
  selector: 'app-audio-player',
  templateUrl: './audio-player.component.html',
  styleUrls: ['./audio-player.component.css']
})
export class AudioPlayerComponent {
  title = 'angular-music-player';
  audio = new Audio();
  musicLength: string = '0:00';
  duration: number = 1;
  currentTime: string = '0:00';

  audioService = inject(AudioService)

  constructor() {
    this.audio.ondurationchange = () => {
      const totalSeconds = Math.floor(this.audio.duration),
            duration = moment.duration(totalSeconds, 'seconds');
      this.musicLength = duration.seconds() < 10 ? 
                         `${Math.floor(duration.asMinutes())}:
                          0${duration.seconds()}` : 
                         `${Math.floor(duration.asMinutes())}:
                          ${duration.seconds()}`;
      this.duration = totalSeconds;
    }

    this.audio.ontimeupdate = () => {
      const duration = moment.duration(
        Math.floor(this.audio.currentTime), 'seconds');
      this.currentTime = duration.seconds() < 10 ? 
                         `${Math.floor(duration.asMinutes())}:
                          0${duration.seconds()}` : 
                         `${Math.floor(duration.asMinutes())}:
                          ${duration.seconds()}`;
    }

    this.getAllMusic().subscribe((musicList: MusicModel[]) => {
      this.musicList = musicList;
    });
  }

  musicList: MusicModel[] = [];
  
  displayedColumns: string[] = ['title', 'artist', 'album'];
  trackPointer: number = 0;
  currentMusic: MusicModel = {
    album: "",
    title: "",
    artist: "",
    url: ""
  }

  play(index?: number): void {
    if (index === undefined) {
      if (this.audio.paused) {
        if (this.audio.readyState === 0) {
          this.trackPointer = 0;
          this.currentMusic = this.musicList[0];
          this.audio.src = this.currentMusic.url;
        }
        this.audio.play();
      } else {
        this.audio.pause();
      }
    } else {
      this.trackPointer = index;
      this.currentMusic = this.musicList[index];
      this.audio.src = this.currentMusic.url;
      this.audio.play();
    } 
  }

  prev(): void {
    this.trackPointer--;
    this.currentMusic = this.musicList[this.trackPointer];
    this.audio.src = this.currentMusic.url;
    this.audio.play();
  }

  next(): void {
    this.trackPointer++;
    this.currentMusic = this.musicList[this.trackPointer];
    this.audio.src = this.currentMusic.url;
    this.audio.play();
  }

  volumeSlider(event: any) {
    this.audio.volume = event.target.value / 16;
  }

  durationSlider(event: any) {
    this.audio.currentTime = event.target.value;
  }

  getAllMusic(): Observable<MusicModel[]> {
    return this.audioService.getMusics();
    // return this.store
    //   .collection('music', 
    //   ref => ref.orderBy('title'))
    //   .valueChanges({ idField: 'id' }).pipe() as Observable<MusicModel[]>;
  }

  // uploadMusic(event: any): void {
  //   for (var index = 0; index < event.target.files.length; index++) {
  //     const file = event.target.files[index];
  //     const filePath = `music/${file.name}`;
  //     const fileRef = this.storage.ref(filePath);
  //     this.storage.upload(filePath, file).then((uploadTaskSnapshot) => {
  //       fileRef.getDownloadURL().subscribe((url: any) => {
  //         jsmediatags.read(file, {
  //           onSuccess: (tagType: TagType) => {
  //             let music: Music = {
  //               album: tagType.tags.album === undefined ? 
  //                 '' : tagType.tags.album,
  //               artist: tagType.tags.artist === undefined ? 
  //                 '' : tagType.tags.artist,
  //               title: tagType.tags.title === undefined ? 
  //                 '' : tagType.tags.title,
  //               url: url
  //             };
  //             this.store.collection('music').add(music);
  //           }
  //         })
  //       })
  //     })
  //   }
  // }
  
}
