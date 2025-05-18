import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
  
})
export class SessionService {
  constructor(private router: Router) {}

  checkSession(): boolean {
    const expiration = localStorage.getItem('sessionExpires');
    if (!expiration || parseInt(expiration) < Date.now()) {
      this.clearSession();
      return false;
    }
    return true;
  }

  clearSession(): void {
    localStorage.removeItem('userRole');
    localStorage.removeItem('sessionExpires');
    this.router.navigate(['/login']);
  }

  getUserRole(): string | null {
    return localStorage.getItem('userRole');
  }
}