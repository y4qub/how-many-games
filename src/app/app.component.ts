import {Component} from '@angular/core';

type tab = 'contact' | 'legal' | 'donate';

interface Server {
  name: string;
  key: string;
}

const functionsUrl = 'https://us-central1-how-many-games.cloudfunctions.net/getGameNumber';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  username: string;
  championKey: string;
  previousValue: number | string;
  value: number | string = '❓';
  activeTab: tab;

  timeout: any;
  timeoutInterval = 1500;
  servers: Server[] = [
    {name: 'EUW', key: 'euw1'},
    {name: 'EUNE', key: 'eun1'},
    {name: 'NA', key: 'na1'},
    {name: 'OC', key: 'oc1'},
    {name: 'KR', key: 'kr'},
    {name: 'TR', key: 'tr1'},
    {name: 'BR', key: 'br1'},
    {name: 'JP', key: 'jp1'},
    {name: 'LA1', key: 'la1'},
    {name: 'LA2', key: 'la2'},
    {name: 'RU', key: 'ru'}
    ];

  selectedServer = 'euw1';

  usernameChange() {
    this.change();
  }

  championChange(championKey: string) {
    this.championKey = championKey;
    this.change();
  }

  change() {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      this.request();
    }, this.timeoutInterval);

  }

  request() {

    if (!this.username || !this.championKey) return;

    this.value = '⌛';

    fetch(`${functionsUrl}?summonerName=${this.username}&championId=${this.championKey}&server=${this.selectedServer}`)
      .then(resp => resp.json())
      .then(body => {

        if (typeof body !== 'number') {

          if(body.status && body.status.message == 'Bad Request - Exception decrypting undefined') {
            this.value = 'Summoner not found 🤔';
            return;
          }

          if(body.status && body.status.message == 'Not found') {
            this.value = 'No games 😢';
            return;
          }

          console.error('Error: Unexpected API response', body);
          this.value = 'Error 😵';
          return;

        }

        this.value = body;

      })
    .catch(err => console.error('Error: Unexpected API response', err));

  }

  openContact() {
    this.activeTab = 'contact';
  }

  openDonate() {
    this.activeTab = 'donate';
  }

  openLegal() {
    this.activeTab = 'legal';
  }

  hide() {
    this.activeTab = null;
  }

  listChange(open: boolean) {
    if(open) {
      this.previousValue = this.value;
      this.value = null;
    } else {
      this.value = this.previousValue;
    }

  }
}
