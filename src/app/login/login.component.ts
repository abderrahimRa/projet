import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: false,
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  selectedYear: number = new Date().getFullYear();
  isSubmitting: boolean = false;
  loginError: string | null = null;
  years: number[] = [];

  constructor(private router: Router) {
    const currentYear = new Date().getFullYear();
    this.years = Array.from({length: 6}, (_, i) => currentYear - i);
  }

  onSubmit() {
    this.loginError = null;
    
    if (!this.username || !this.password) {
      this.loginError = 'Please enter both username and password';
      return;
    }

    this.isSubmitting = true;

    setTimeout(() => {
      try {
        if (this.validateCredentials()) {
          const role = this.username === 'admin' ? 'admin' : 'user';
          this.startSession(role);
          this.trackActiveUser();
          
          // Store selected year in localStorage
          localStorage.setItem('selectedYear', this.selectedYear.toString());
          
          role === 'admin' 
            ? this.router.navigate(['/admin'], { replaceUrl: true })
            : this.router.navigate(['/main'], { replaceUrl: true });
        } else {
          this.loginError = 'Invalid username or password';
        }
      } finally {
        this.isSubmitting = false;
      }
    }, 800);
  }

  private validateCredentials(): boolean {
    const creds = environment.credentials;
    return (
      (this.username === creds.admin.username && 
       this.password === creds.admin.password) ||
      (this.username === creds.user.username && 
       this.password === creds.user.password)
    );
  }

  private startSession(role: string): void {
    const expirationTime = Date.now() + (60 * 60 * 1000);
    localStorage.setItem('userRole', role);
    localStorage.setItem('currentUser', this.username);
    localStorage.setItem('sessionExpires', expirationTime.toString());
  }

  private trackActiveUser(): void {
    if (this.username === 'admin') return;
    
    const activeUsers = LoginComponent.getActiveUsers();
    if (!activeUsers.includes(this.username)) {
      activeUsers.push(this.username);
      localStorage.setItem('activeUsers', JSON.stringify(activeUsers));
    }
  }

  public static getActiveUsers(): string[] {
    try {
      return JSON.parse(localStorage.getItem('activeUsers') || '[]');
    } catch {
      return [];
    }
  }

  public static getActiveUserCount(): number {
    return this.getActiveUsers().length;
  }

  public static removeActiveUser(username: string): void {
    const activeUsers = this.getActiveUsers().filter(user => user !== username);
    localStorage.setItem('activeUsers', JSON.stringify(activeUsers));
  }
}