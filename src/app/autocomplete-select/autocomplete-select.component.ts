import {Component, EventEmitter, Output} from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';
import {Champion} from '../champion.interface';

@Component({
  selector: 'app-autocomplete-select',
  templateUrl: './autocomplete-select.component.html',
  styleUrls: ['./autocomplete-select.component.scss']
})
export class AutocompleteSelectComponent {

  @Output() champion = new EventEmitter<string>();
  @Output() listOpened = new EventEmitter<boolean>();
  championObj: Champion;
  championsArray: Array<Champion>;
  filteredChampions: Array<Champion>;
  showList: boolean;
  mouseInList: boolean;

  constructor(private db: AngularFireDatabase) {

    this.db.list('/champions/data').valueChanges(['child_added']).subscribe((data: Array<Champion>) => {

      this.championsArray = data;
      this.filteredChampions = this.championsArray;

      this.select(this.championsArray[0]);

      });

  }

  change(event) {

    this.filteredChampions = this.championsArray.filter(champion => champion.name.toLowerCase().startsWith(event.toLowerCase()));
    this.champion.emit(this.championObj.key);

  }

  select(champ: Champion) {

    this.showList = false;
    this.championObj = champ;
    this.change(champ.name);
    this.filteredChampions = this.championsArray;
    this.championObj = champ;
    this.mouseInList = false;
  }

  openList() {
    this.showList = true;
    this.listOpened.emit(true);
  }

  hideList() {
    if (!this.mouseInList) {
      this.showList = false;
      this.listOpened.emit(false);
    }
  }

}
