import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from '../services/session.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.css',
  standalone: false,
})
export class MainComponent implements OnInit {
  userRole: string | null = null;
  constructor(private router: Router , private sessionService: SessionService) {}

  ngOnInit() {
    if (!this.sessionService.checkSession()) {
      return;
    }
    this.userRole = this.sessionService.getUserRole();
  }
  onLogout() {
    if (confirm('Are you sure you want to log out?')) {
      localStorage.removeItem('userRole');
      this.router.navigate(['/login'], { replaceUrl: true });
      
      // Clear all remaining history
      setTimeout(() => {
        window.history.pushState(null, '', window.location.href);
        window.addEventListener('popstate', () => {
        window.history.pushState(null, '', window.location.href);
        });
      }, 100);
    }
  }
}

