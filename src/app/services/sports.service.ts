import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

export interface Sports {
  id: number;
  state_id: number;
  code: string;
  state: string;
  sportsFacilities: number;
  sportsClubs: number;
  registeredAthletes: number;
}

@Injectable({
  providedIn: 'root',
})
export class SportsService {
  private endpoint = 'sports';

  constructor(private apiService: ApiService) {}

  getAll(): Observable<Sports[]> {
    return this.apiService.getAll<Sports>(this.endpoint);
  }

  getById(id: number): Observable<Sports> {
    return this.apiService.getById<Sports>(this.endpoint, id);
  }

  getByStateId(stateId: number): Observable<Sports[]> {
    return this.apiService.query<Sports>(this.endpoint, { state_id: stateId });
  }

  create(data: Omit<Sports, 'id'>): Observable<Sports> {
    return this.apiService.create<Sports>(this.endpoint, data as Sports);
  }

  update(id: number, data: Partial<Sports>): Observable<Sports> {
    return this.apiService.update<Sports>(this.endpoint, id, data as Sports);
  }

  delete(id: number): Observable<void> {
    return this.apiService.delete(this.endpoint, id);
  }
}
