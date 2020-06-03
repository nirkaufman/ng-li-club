import { Component, OnInit } from '@angular/core';
import {AuthService, User} from '../../core/services/auth.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'nk-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent implements OnInit {
  private _authService: AuthService;

  currentUser$: Observable<User>;

  constructor(authService: AuthService) {
    this._authService = authService;
  }

  ngOnInit(): void {
    this.currentUser$ = this._authService.currentUser$;
  }

  signInWithGoogle() {
    this._authService.signInWithGoogle();
  }

  signOut() {
    this._authService.signOut();
  }

}
