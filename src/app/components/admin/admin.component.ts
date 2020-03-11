import { Component, OnInit } from '@angular/core';
/* import * as firebase from "firebase/app";
import { AngularFireAuth } from "@angular/fire/auth"; */
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  adminForm: FormGroup;
  ngOnInit() {}

  login() {}
}
