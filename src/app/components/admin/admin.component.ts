import { Component, OnInit } from '@angular/core';
import * as firebaseui from 'firebaseui';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  ui: firebaseui.auth.AuthUI;

  constructor(private afAuth: AngularFireAuth) { }

  ngOnInit(): void {
    const uiConfig = {
      signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID
      ],

      callbacks: {
        signInSuccessWithAuthResult: this.onLoginSuccess.bind(this)
      }
    };

    this.ui = new firebaseui.auth.AuthUI(this.afAuth.auth);
    this.ui.start('#fb-auth-container', uiConfig);
  }

  onLoginSuccess(result) {
    console.log('Firebase UI result', result);
  }
}
