import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

export interface User {
  id: number;
  username: string;
  password: string;
  role: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private endpoint = 'users';
  private currentUser: User | null = null;

  constructor(private apiService: ApiService) {}
  login(username: string, password: string): Observable<User[]> {
    // Query the json-server for matching username and password
    return this.apiService.query<User>(this.endpoint, { username, password });
  }

  logout(): void {
    this.currentUser = null;
    localStorage.removeItem('userRole');
    localStorage.removeItem('sessionExpires');
  }

  setCurrentUser(user: User): void {
    this.currentUser = user;
    localStorage.setItem('userRole', user.role);

    // Set session expiration (24 hours)
    const expirationTime = Date.now() + 24 * 60 * 60 * 1000;
    localStorage.setItem('sessionExpires', expirationTime.toString());
  }

  getCurrentUser(): User | null {
    return this.currentUser;
  }

  isLoggedIn(): boolean {
    const expiresAt = localStorage.getItem('sessionExpires');
    return expiresAt !== null && parseInt(expiresAt, 10) > Date.now();
  }

  isAdmin(): boolean {
    return localStorage.getItem('userRole') === 'admin';
  }
}
