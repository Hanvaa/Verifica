import { Component } from '@angular/core';

@Component({
  selector: 'app-sito',
  templateUrl: './sito.component.html',
  styleUrls: ['./sito.component.css']
})
export class SitoComponent {

  async logMovies() {
    const response = await fetch("http://localhost:6969/api/getData");
    const players = await response.json();
    console.log(players);
  }

  async findTeam(){
    let team = (<HTMLInputElement>document.getElementById('txtSquadra')).value;
    const response = await fetch("http://localhost:6969/api/getPlayerTeam");
  }
  
}
