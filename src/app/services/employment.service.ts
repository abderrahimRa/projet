import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

export interface Employment {
  id: number;
  state_id: number;
  code: string;
  state: string;
  employmentRate: number;
  unemploymentRate: number;
  youthUnemployment: number;
  workingPopulation: number;
}

@Injectable({
  providedIn: 'root',
})
export class EmploymentService {
  private endpoint = 'employment';

  constructor(private apiService: ApiService) {}

  getAll(): Observable<Employment[]> {
    return this.apiService.getAll<Employment>(this.endpoint);
  }

  getById(id: number): Observable<Employment> {
    return this.apiService.getById<Employment>(this.endpoint, id);
  }

  getByStateId(stateId: number): Observable<Employment[]> {
    return this.apiService.query<Employment>(this.endpoint, {
      state_id: stateId,
    });
  }

  create(data: Omit<Employment, 'id'>): Observable<Employment> {
    return this.apiService.create<Employment>(
      this.endpoint,
      data as Employment
    );
  }

  update(id: number, data: Partial<Employment>): Observable<Employment> {
    return this.apiService.update<Employment>(
      this.endpoint,
      id,
      data as Employment
    );
  }

  delete(id: number): Observable<void> {
    return this.apiService.delete(this.endpoint, id);
  }
}
