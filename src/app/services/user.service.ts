import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  getActiveUsers(): string[] {
    try {
      return JSON.parse(localStorage.getItem('activeUsers') || '[]');
    } catch {
      return [];
    }
  }

  getActiveUserCount(): number {
    return this.getActiveUsers().length;
  }

  removeActiveUser(username: string): void {
    const activeUsers = this.getActiveUsers().filter(
      (user) => user !== username
    );
    localStorage.setItem('activeUsers', JSON.stringify(activeUsers));
  }

  addActiveUser(username: string): void {
    const activeUsers = this.getActiveUsers();
    if (!activeUsers.includes(username)) {
      activeUsers.push(username);
      localStorage.setItem('activeUsers', JSON.stringify(activeUsers));
    }
  }
}
