import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from '../services/session.service';
import { LoginComponent } from '../login/login.component';
import { HttpClient } from '@angular/common/http';

interface User {
  username: string;
  password: string;
  role: string;
}

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  standalone: false,
})
export class AdminComponent implements OnInit {
  activeUserCount: number = 0;
  activeUsers: string[] = [];
  allUsers: User[] = [];
  newUser: User = {
    username: '',
    password: '',
    role: ''
  };
  selectedUserToRemove: string = '';

  constructor(
    private router: Router,
    private http: HttpClient,
    private sessionService: SessionService
  ) {}

  ngOnInit() {
    if (!this.sessionService.checkSession() || this.sessionService.getUserRole() !== 'admin') {
      this.router.navigate(['/login']);
      return;
    }
    
    this.refreshStats();
    this.loadAllUsers();
  }

  refreshStats() {
    this.activeUsers = LoginComponent.getActiveUsers();
    this.activeUserCount = LoginComponent.getActiveUserCount();
  }

  loadAllUsers() {
    // In a real app, this would call your backend API
    // Mocking the response for demonstration
    const mockUsers = [
      { username: 'admin', password: 'encrypted', role: 'admin' },
      { username: 'user', password: 'encrypted', role: 'user' },
      ...environment.credentials.admin ? 
        [{ username: environment.credentials.admin.username, password: 'encrypted', role: 'admin' }] : 
        [],
      ...environment.credentials.user ? 
        [{ username: environment.credentials.user.username, password: 'encrypted', role: 'user' }] : 
        []
    ];
    
    this.allUsers = [...new Set(mockUsers)];
  }

  addUser() {
    if (!this.newUser.username || !this.newUser.password || !this.newUser.role) {
      alert('Please fill all fields');
      return;
    }

    // Validate username doesn't exist
    if (this.allUsers.some(u => u.username === this.newUser.username)) {
      alert('Username already exists');
      return;
    }

    // In a real app, this would call your backend API
    this.allUsers.push({...this.newUser});
    alert(`User ${this.newUser.username} added successfully!`);
    this.newUser = { username: '', password: '', role: '' };
  }

  removeUser() {
    if (!this.selectedUserToRemove) {
      return;
    }

    if (this.selectedUserToRemove === 'admin' || 
        this.selectedUserToRemove === environment.credentials.admin.username) {
      alert('Cannot remove admin user');
      return;
    }

    if (!confirm(`Are you sure you want to remove user ${this.selectedUserToRemove}?`)) {
      return;
    }

    // In a real app, this would call your backend API
    this.allUsers = this.allUsers.filter(user => user.username !== this.selectedUserToRemove);
    LoginComponent.removeActiveUser(this.selectedUserToRemove);
    alert(`User ${this.selectedUserToRemove} removed successfully!`);
    this.selectedUserToRemove = '';
    this.refreshStats();
  }

  onLogout() {
    if (confirm('Are you sure you want to log out?')) {
      const currentUser = localStorage.getItem('currentUser');
      if (currentUser) {
        LoginComponent.removeActiveUser(currentUser);
      }
      this.sessionService.clearSession();
    }
  }
}

const environment = {
  credentials: {
    admin: { username: 'admin', password: 'admin123' },
    user: { username: 'user', password: 'user123' }
  }
};