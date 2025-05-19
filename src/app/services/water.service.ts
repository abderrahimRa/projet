import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

export interface Water {
  id: number;
  state_id: number;
  code: string;
  state: string;
  waterProduction: number;
  waterConsumption: number;
  treatmentPlants: number;
  connectionRate: number;
}

@Injectable({
  providedIn: 'root',
})
export class WaterService {
  private endpoint = 'water';

  constructor(private apiService: ApiService) {}

  getAll(): Observable<Water[]> {
    return this.apiService.getAll<Water>(this.endpoint);
  }

  getById(id: number): Observable<Water> {
    return this.apiService.getById<Water>(this.endpoint, id);
  }

  getByStateId(stateId: number): Observable<Water[]> {
    return this.apiService.query<Water>(this.endpoint, { state_id: stateId });
  }

  create(data: Omit<Water, 'id'>): Observable<Water> {
    return this.apiService.create<Water>(this.endpoint, data as Water);
  }

  update(id: number, data: Partial<Water>): Observable<Water> {
    return this.apiService.update<Water>(this.endpoint, id, data as Water);
  }

  delete(id: number): Observable<void> {
    return this.apiService.delete(this.endpoint, id);
  }
}
