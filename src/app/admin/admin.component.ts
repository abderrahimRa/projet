import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from '../services/session.service';
import { LoginComponent } from '../login/login.component';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../services/api.service';
import { AuthService, User } from '../services/auth.service';
import { UserService } from '../services/user.service';

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
    id: 0,
    username: '',
    password: '',
    role: '',
  };
  selectedUserToRemove: string = '';

  // Dataset handling properties
  selectedDataset: string = '';
  datasetItems: any[] = [];
  displayedColumns: string[] = [];
  states: any[] = [];
  constructor(
    private router: Router,
    private http: HttpClient,
    private sessionService: SessionService,
    private apiService: ApiService,
    private authService: AuthService,
    private userService: UserService
  ) {}

  ngOnInit() {
    if (
      !this.sessionService.checkSession() ||
      this.sessionService.getUserRole() !== 'admin'
    ) {
      this.router.navigate(['/login']);
      return;
    }

    this.refreshStats();
    this.loadAllUsers();
    this.loadStates();
  }
  refreshStats() {
    // Use the UserService to get active users
    this.activeUsers = this.userService.getActiveUsers();
    this.activeUserCount = this.userService.getActiveUserCount();
  }
  loadAllUsers() {
    // Get all users from the JSON database
    this.apiService.getAll<User>('users').subscribe(
      (users) => {
        this.allUsers = users;
      },
      (error) => {
        console.error('Failed to load users:', error);
        alert('Failed to load users. Please try again.');
      }
    );
  }
  addUser() {
    if (
      !this.newUser.username ||
      !this.newUser.password ||
      !this.newUser.role
    ) {
      alert('Please fill all fields');
      return;
    }

    // Validate username doesn't exist
    if (this.allUsers.some((u) => u.username === this.newUser.username)) {
      alert('Username already exists');
      return;
    }

    // Set an ID for the new user (normally this would be handled by the server)
    // Find the highest current ID and increment by 1
    const maxId = Math.max(...this.allUsers.map((user) => user.id), 0);
    const userToAdd = { ...this.newUser, id: maxId + 1 };

    // Add user to the JSON database
    this.apiService.create<User>('users', userToAdd).subscribe(
      (createdUser) => {
        this.allUsers.push(createdUser);
        alert(`User ${createdUser.username} added successfully!`);
        this.newUser = { id: 0, username: '', password: '', role: '' };
      },
      (error) => {
        console.error('Failed to add user:', error);
        alert('Failed to add user. Please try again.');
      }
    );
  }
  removeUser() {
    if (!this.selectedUserToRemove) {
      return;
    }

    if (this.selectedUserToRemove === 'admin') {
      alert('Cannot remove admin user');
      return;
    }

    if (
      !confirm(
        `Are you sure you want to remove user ${this.selectedUserToRemove}?`
      )
    ) {
      return;
    }

    // Find the user by username
    const userToRemove = this.allUsers.find(
      (user) => user.username === this.selectedUserToRemove
    );

    if (!userToRemove) {
      alert('User not found');
      return;
    } // Delete user from the JSON database
    this.apiService.delete('users', userToRemove.id).subscribe(
      () => {
        this.allUsers = this.allUsers.filter(
          (user) => user.username !== this.selectedUserToRemove
        );
        // Use the UserService to remove active users
        this.userService.removeActiveUser(this.selectedUserToRemove);
        alert(`User ${this.selectedUserToRemove} removed successfully!`);
        this.selectedUserToRemove = '';
        this.refreshStats();
      },
      (error) => {
        console.error('Failed to remove user:', error);
        alert('Failed to remove user. Please try again.');
      }
    );
  }
  onLogout() {
    if (confirm('Are you sure you want to log out?')) {
      const currentUser = localStorage.getItem('currentUser');
      if (currentUser) {
        this.userService.removeActiveUser(currentUser);
      }
      this.authService.logout();
      this.sessionService.clearSession();
      this.router.navigate(['/login']);
    }
  }

  // Load all states for reference
  loadStates() {
    this.apiService.getAll('states').subscribe(
      (states) => {
        this.states = states;
      },
      (error) => {
        console.error('Failed to load states:', error);
      }
    );
  }

  // Load the selected dataset
  loadSelectedDataset() {
    if (!this.selectedDataset) {
      this.datasetItems = [];
      this.displayedColumns = [];
      return;
    }

    this.apiService.getAll(this.selectedDataset).subscribe(
      (items) => {
        this.datasetItems = items; // Extract column names from the first item
        if (items.length > 0) {
          this.displayedColumns = Object.keys(items[0] as Record<string, any>);
        }
      },
      (error) => {
        console.error(`Failed to load ${this.selectedDataset}:`, error);
        alert(`Failed to load ${this.selectedDataset}. Please try again.`);
      }
    );
  }

  // Edit an item
  editItem(item: any) {
    console.log('Edit item:', item);
    // This would typically open a dialog or form to edit the item
    alert('Edit functionality will be implemented here.');
  }

  // Delete an item
  deleteItem(item: any) {
    if (
      !confirm(
        `Are you sure you want to delete this ${this.selectedDataset} record?`
      )
    ) {
      return;
    }

    this.apiService.delete(this.selectedDataset, item.id).subscribe(
      () => {
        this.datasetItems = this.datasetItems.filter((i) => i.id !== item.id);
        alert('Record deleted successfully!');
      },
      (error) => {
        console.error(
          `Failed to delete ${this.selectedDataset} record:`,
          error
        );
        alert(`Failed to delete record. Please try again.`);
      }
    );
  }

  // Add a new item
  addNewItem() {
    console.log('Add new item to:', this.selectedDataset);
    // This would typically open a dialog or form to add a new item
    alert('Add new record functionality will be implemented here.');
  }
}
