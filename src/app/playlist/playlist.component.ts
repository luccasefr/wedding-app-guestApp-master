import { Component, OnInit } from '@angular/core';
import { PlaylistService } from '../playlist.service';
import { faThumbsUp } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css']
})
export class PlaylistComponent implements OnInit {

    data=<any>{};
    songs;
    faThumbsUp=faThumbsUp;
    public loading = false;

  constructor(private playlistService:PlaylistService) {
      this.getAll();
  }

  ngOnInit() {
    this.loading = true;
  }

  async onSubmit(){
      this.loading = true;
      await this.playlistService.save(this.data);
      this.data={};
      this.getAll();
  }

  async getAll(){
      this.songs = await this.playlistService.getAll();
      this.loading = false;
      console.log(this.songs);
  }

  async like(song){
      song.guests_likes = await this.playlistService.like(song.id);
  }

}
