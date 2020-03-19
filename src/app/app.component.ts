import { Component, OnInit } from '@angular/core';
import { BsDropdownConfig } from 'ngx-bootstrap/dropdown';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [
    {
      provide: BsDropdownConfig,
      useValue: { isAnimated: true, autoClose: true }
    }
  ]
})
export class AppComponent implements OnInit {
  loggedInUser: string;
  isLoggedIn: boolean;
  isCollapsed = true;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.getAuth().subscribe(auth => {
      if (auth) {
        this.isLoggedIn = true;
        this.loggedInUser = auth.email;
      }
    });
  }

  onLogoutClick() {
    this.authService.logout();
    this.isLoggedIn = false;
    this.loggedInUser = null;
  }
}
