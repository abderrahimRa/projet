import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

export interface Health {
  id: number;
  state_id: number;
  code: string;
  state: string;
  publicHospitals: number;
  privateHospitals: number;
  numDoctors: number;
  numNurses: number;
  numBeds: number;
  populationPerDoctor: number;
}

@Injectable({
  providedIn: 'root',
})
export class HealthService {
  private endpoint = 'health';

  constructor(private apiService: ApiService) {}

  getAll(): Observable<Health[]> {
    return this.apiService.getAll<Health>(this.endpoint);
  }

  getById(id: number): Observable<Health> {
    return this.apiService.getById<Health>(this.endpoint, id);
  }

  getByStateId(stateId: number): Observable<Health[]> {
    return this.apiService.query<Health>(this.endpoint, { state_id: stateId });
  }

  create(data: Omit<Health, 'id'>): Observable<Health> {
    return this.apiService.create<Health>(this.endpoint, data as Health);
  }

  update(id: number, data: Partial<Health>): Observable<Health> {
    return this.apiService.update<Health>(this.endpoint, id, data as Health);
  }

  delete(id: number): Observable<void> {
    return this.apiService.delete(this.endpoint, id);
  }
}
