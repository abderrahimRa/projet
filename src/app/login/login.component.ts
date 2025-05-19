import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, User } from '../services/auth.service';
import { UserService } from '../services/user.service';

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
  constructor(
    private router: Router,
    private authService: AuthService,
    private userService: UserService
  ) {
    const currentYear = new Date().getFullYear();
    this.years = Array.from({ length: 6 }, (_, i) => currentYear - i);
  }
  onSubmit() {
    this.loginError = null;

    if (!this.username || !this.password) {
      this.loginError = 'Please enter both username and password';
      return;
    }

    this.isSubmitting = true;

    this.authService.login(this.username, this.password).subscribe(
      (users) => {
        if (users && users.length > 0) {
          const user = users[0];
          this.authService.setCurrentUser(user);

          // Store the user's role and track active user
          this.startSession(user.role);
          this.trackActiveUser();

          // Store selected year in localStorage
          localStorage.setItem('selectedYear', this.selectedYear.toString());

          // Navigate based on role
          user.role === 'admin'
            ? this.router.navigate(['/admin'], { replaceUrl: true })
            : this.router.navigate(['/main'], { replaceUrl: true });
        } else {
          this.loginError = 'Invalid username or password';
        }
        this.isSubmitting = false;
      },
      (error) => {
        console.error('Login error:', error);
        this.loginError = 'An error occurred during login. Please try again.';
        this.isSubmitting = false;
      }
    );
  }

  private startSession(role: string): void {
    const expirationTime = Date.now() + 60 * 60 * 1000;
    localStorage.setItem('userRole', role);
    localStorage.setItem('currentUser', this.username);
    localStorage.setItem('sessionExpires', expirationTime.toString());
  }
  private trackActiveUser(): void {
    if (this.username === 'admin') return;
    this.userService.addActiveUser(this.username);
  }

  // Static methods kept for backward compatibility
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
    const activeUsers = this.getActiveUsers().filter(
      (user) => user !== username
    );
    localStorage.setItem('activeUsers', JSON.stringify(activeUsers));
  }
}
