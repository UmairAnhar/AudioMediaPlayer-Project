import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MusicModel } from '../models/music.model';

@Injectable({
  providedIn: 'root'
})
export class AudioService {

  constructor(private http: HttpClient) { }

  getMusics() {
    return this.http.get<MusicModel[]>('../../../assets/music.json');
  }
}
