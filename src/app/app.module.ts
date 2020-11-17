import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AutocompleteSelectComponent } from './autocomplete-select/autocomplete-select.component';
import {AngularFireModule} from '@angular/fire';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {ClickOutsideModule} from 'ng-click-outside';

const firebaseConfig = {
  apiKey: 'AIzaSyBueaLNqkd3V3cwdcaDoK5yg0aBUR4x3Lg',
  authDomain: 'how-many-games.firebaseapp.com',
  databaseURL: 'https://how-many-games.firebaseio.com',
  projectId: 'how-many-games',
  storageBucket: 'how-many-games.appspot.com',
  messagingSenderId: '327509980024',
  appId: '1:327509980024:web:6e2bcfb962c4a4f0'
};

@NgModule({
  declarations: [
    AppComponent,
    AutocompleteSelectComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    ClickOutsideModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
